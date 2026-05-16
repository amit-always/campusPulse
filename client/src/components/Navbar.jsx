import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, LogOut, Shield } from 'lucide-react';
import { AppContext } from '../context/AppContext';

import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AppContext);

  return (
    <nav className="bottom-nav glass">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
        <span>Home</span>
      </Link>
      
      {user?.role === 'admin' && (
        <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
          <Shield size={22} strokeWidth={location.pathname === '/admin' ? 2.5 : 2} />
          <span>Admin</span>
        </Link>
      )}
      
      <Link to="/report" className={`nav-item report-btn`}>
        <div className="report-icon-wrapper" style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
        }}>
          <PlusCircle size={32} color="white" strokeWidth={2.5} />
        </div>
      </Link>
      
      <button onClick={logout} className="nav-item borderless-btn">
        <LogOut size={22} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
