import React, { useContext } from 'react';
import axios from 'axios';
import { ThumbsUp, MapPin, Clock } from 'lucide-react';
import { AppContext } from '../context/AppContext';

// Simpler relative time function without date-fns
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInMins = Math.floor(diffInMs / 60000);
  
  if (diffInMins < 60) return `${diffInMins}m ago`;
  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
};

const IssueCard = ({ issue }) => {
  const { user, fetchIssues } = useContext(AppContext);
  const hasUpvoted = issue.upvotes.includes(user.id);

  const handleUpvote = async () => {
    try {
      await axios.put(`/api/issues/${issue._id}/upvote`);
      fetchIssues(); // Refresh list to get updated upvotes
    } catch (err) {
      console.error('Error upvoting:', err);
    }
  };

  const statusColors = {
    'Reported': 'var(--warning)',
    'In Progress': 'var(--primary)',
    'Resolved': 'var(--success)'
  };

  return (
    <div className="glass animate-fade-in" style={{ overflow: 'hidden', padding: 0, marginBottom: '1rem' }}>
      {issue.imageUrl && (
        <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
          <img 
            src={issue.imageUrl} 
            alt={issue.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: statusColors[issue.status],
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {issue.status}
          </div>
        </div>
      )}
      <div style={{ padding: '1.25rem' }}>
        {!issue.imageUrl && (
          <div style={{ marginBottom: '0.75rem' }}>
             <span className="badge" style={{ 
               backgroundColor: `${statusColors[issue.status]}15`, 
               color: statusColors[issue.status] 
             }}>
               {issue.status}
             </span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: '600',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {issue.category}
          </span>
        </div>
        
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--text-main)' }}>{issue.title}</h3>
        
        <div style={{ 
          background: '#f8fafc', 
          padding: '1rem', 
          borderRadius: '12px', 
          border: '1px solid #f1f5f9',
          marginBottom: '1.25rem'
        }}>
          <p style={{ color: 'var(--text-main)', fontSize: '0.9375rem', lineHeight: '1.5' }}>
            {issue.description}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={14} strokeWidth={2.5} />
            {issue.location?.description || 'Campus'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} strokeWidth={2.5} />
            {getRelativeTime(issue.createdAt)}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '12px', 
              background: 'var(--premium-gradient)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '0.8rem', 
              fontWeight: '800',
              color: 'white',
              boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)'
            }}>
              {issue.reporter?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>{issue.reporter?.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>Campus Member</div>
            </div>
          </div>
          
          <button 
            onClick={handleUpvote}
            className="btn"
            style={{ 
              background: hasUpvoted ? 'var(--premium-gradient)' : 'white',
              color: hasUpvoted ? 'white' : 'var(--text-main)',
              padding: '0.625rem 1.25rem',
              borderRadius: '14px',
              border: hasUpvoted ? 'none' : '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: hasUpvoted ? '0 8px 16px -4px rgba(99, 102, 241, 0.4)' : 'none'
            }}
          >
            <ThumbsUp size={16} fill={hasUpvoted ? 'white' : 'none'} strokeWidth={2.5} />
            <span style={{ fontWeight: '800' }}>{issue.upvotes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
