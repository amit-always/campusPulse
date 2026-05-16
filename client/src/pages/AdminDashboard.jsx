import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Clock, AlertCircle, MapPin } from 'lucide-react';

const AdminDashboard = () => {
  const { issues, fetchIssues } = useContext(AppContext);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchIssues(false);
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(`/api/issues/${id}/status`, { status: newStatus });
      await fetchIssues(false);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    'Reported': 'var(--warning)',
    'In Progress': 'var(--primary)',
    'Resolved': 'var(--success)'
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ padding: '1.5rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
          Admin Panel 🛠️
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Manage and resolve campus issues.</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {issues.length === 0 ? (
          <div className="glass text-center" style={{ padding: '4rem 2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>No issues to manage</h3>
            <p style={{ color: 'var(--text-muted)' }}>Everything is looking good!</p>
          </div>
        ) : (
          issues.map(issue => (
            <div key={issue._id} className="glass" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.25rem' }}>{issue.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    <MapPin size={14} />
                    {issue.location?.description || 'Campus'}
                  </div>
                </div>
                <span className="badge" style={{ 
                  backgroundColor: `${statusColors[issue.status]}15`, 
                  color: statusColors[issue.status] 
                }}>
                  {issue.status}
                </span>
              </div>

              <div style={{ 
                background: '#f8fafc', 
                padding: '0.875rem', 
                borderRadius: '10px', 
                border: '1px solid #f1f5f9',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: 'var(--text-main)'
              }}>
                {issue.description}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button 
                  disabled={updatingId === issue._id}
                  onClick={() => updateStatus(issue._id, 'Reported')}
                  className={`btn ${issue.status === 'Reported' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem', fontSize: '0.75rem', borderRadius: '8px' }}
                >
                  <AlertCircle size={14} style={{ marginRight: '0.25rem' }} /> Reported
                </button>
                <button 
                  disabled={updatingId === issue._id}
                  onClick={() => updateStatus(issue._id, 'In Progress')}
                  className={`btn ${issue.status === 'In Progress' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem', fontSize: '0.75rem', borderRadius: '8px' }}
                >
                  <Clock size={14} style={{ marginRight: '0.25rem' }} /> Working
                </button>
                <button 
                  disabled={updatingId === issue._id}
                  onClick={() => updateStatus(issue._id, 'Resolved')}
                  className={`btn ${issue.status === 'Resolved' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem', fontSize: '0.75rem', borderRadius: '8px' }}
                >
                  <CheckCircle size={14} style={{ marginRight: '0.25rem' }} /> Resolved
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
