import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="glass animate-fade-in" style={{
      position: 'fixed',
      top: '0.75rem',
      left: '0.75rem',
      right: '0.75rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      zIndex: 1000,
      justifyContent: 'space-between',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '20px'
    }}>
      <div 
        onClick={() => navigate('/')} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.875rem', 
          cursor: 'pointer' 
        }}
      >
        <div style={{ 
          background: 'var(--premium-gradient)',
          width: '38px',
          height: '38px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)'
        }}>
          <Activity size={20} strokeWidth={3} />
        </div>
        <span className="brand-font" style={{ 
          fontSize: '1.4rem', 
          fontWeight: '800', 
          background: 'linear-gradient(135deg, var(--text-main) 0%, var(--primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em'
        }}>
          CampusPulse
        </span>
      </div>
    </header>
  );
};

export default Header;
