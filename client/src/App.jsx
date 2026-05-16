import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportIssue from './pages/ReportIssue';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return <div className="container" style={{paddingTop: '5rem', textAlign: 'center'}}>Loading...</div>;
  }

  return (
    <Router>
      <div className="page-wrapper">
        {user && <Header />}
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/report" element={user ? <ReportIssue /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        </Routes>
        {user && <Navbar />}
      </div>
    </Router>
  );
}

export default App;
