import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, MapPin, Upload, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ReportIssue = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null, description: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { fetchIssues } = useContext(AppContext);

  const categories = ['Facilities', 'Cleanliness', 'Safety', 'Technology', 'Other'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            ...location,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.error("Error getting location", err);
          alert("Could not get location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationDescChange = (e) => {
    setLocation({ ...location, description: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && !image) {
      setError('Please provide a photo of the issue.');
      return;
    }
    if (step === 2 && !formData.category) {
      setError('Please select a category.');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('image', image);
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('location', JSON.stringify(location));

      await axios.post('/api/issues', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await fetchIssues();
      navigate('/');
    } catch (err) {
      console.error('Error submitting issue:', err);
      setError('Failed to submit issue. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '6rem' }}>
      <header style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Report Issue</h1>
        <button onClick={() => navigate('/')} className="borderless-btn" style={{ 
          padding: '0.625rem', 
          background: 'white', 
          borderRadius: '12px',
          boxShadow: 'var(--card-shadow)',
          border: '1px solid var(--border-color)'
        }}>
          <X size={20} color="var(--text-main)" />
        </button>
      </header>

      {/* Progress Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative', padding: '0 0.5rem' }}>
        <div style={{ position: 'absolute', top: '50%', left: '1.5rem', right: '1.5rem', height: '3px', background: '#e2e8f0', zIndex: 0, transform: 'translateY(-50%)' }}></div>
        {[1, 2, 3].map(num => (
          <div 
            key={num} 
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '12px', 
              background: step >= num ? 'var(--primary)' : 'white',
              color: step >= num ? 'white' : 'var(--text-muted)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.875rem',
              border: `2px solid ${step >= num ? 'var(--primary)' : '#e2e8f0'}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1,
              boxShadow: step === num ? '0 0 0 4px rgba(99, 102, 241, 0.15)' : 'none'
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {error && (
        <div className="animate-fade-in" style={{ 
          padding: '1rem', 
          borderRadius: '12px', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          color: 'var(--error)',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          {error}
        </div>
      )}

      <div className="glass animate-fade-in" style={{ padding: '1.5rem' }}>
        
        {/* Step 1: Photo & Location */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: '700' }}>Snap & Tag</h2>
            
            <div 
              style={{ 
                border: '2px dashed #e2e8f0', 
                borderRadius: '16px', 
                height: '220px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                overflow: 'hidden',
                position: 'relative',
                background: '#f8fafc',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <div style={{ 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    padding: '1rem', 
                    borderRadius: '50%', 
                    marginBottom: '0.75rem',
                    color: 'var(--primary)'
                  }}>
                    <Camera size={32} />
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>Upload or take a photo</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageChange}
            />

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--primary)" /> Location Details
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Near Library Entrance" 
                  value={location.description}
                  onChange={handleLocationDescChange}
                />
                <button 
                  type="button" 
                  className={`btn ${location.lat ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={captureLocation}
                  style={{ padding: '0 0.875rem' }}
                  title="Get exact GPS coordinates"
                >
                  <MapPin size={20} />
                </button>
              </div>
              {location.lat && <small style={{ color: 'var(--success)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}>
                <CheckCircle size={14} /> GPS Location Captured
              </small>}
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={nextStep}>
              Next Step
            </button>
          </div>
        )}

        {/* Step 2: Category */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: '700' }}>Select Category</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
              {categories.map(cat => (
                <div 
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  style={{
                    padding: '1rem',
                    borderRadius: '16px',
                    border: `2px solid ${formData.category === cat ? 'var(--primary)' : '#f1f5f9'}`,
                    background: formData.category === cat ? 'rgba(99, 102, 241, 0.05)' : '#f8fafc',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontWeight: formData.category === cat ? '700' : '500',
                    color: formData.category === cat ? 'var(--primary)' : 'var(--text-main)',
                    fontSize: '0.9375rem'
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={prevStep}>Back</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Details & Submit */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: '700' }}>Nearly Done!</h2>
            
            <div className="form-group">
              <label className="form-label">Issue Title</label>
              <input 
                type="text" 
                className="form-control" 
                name="title" 
                placeholder="Briefly name the problem"
                value={formData.title} 
                onChange={handleInputChange} 
                maxLength={50}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control" 
                name="description" 
                rows="4" 
                placeholder="Provide more context so we can fix it faster..."
                value={formData.description} 
                onChange={handleInputChange}
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={prevStep} disabled={isSubmitting}>Back</button>
              <button className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : (
                  <>
                    <Upload size={18} strokeWidth={2.5} /> Submit Report
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ReportIssue;
