import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
    }
    
    fetchIssues();
  }, []);

  const fetchIssues = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await axios.get('/api/issues');
      setIssues(res.data);
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, issues, loading, login, logout, fetchIssues, setIssues }}>
      {children}
    </AppContext.Provider>
  );
};
