import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import IssueCard from '../components/IssueCard';

const Dashboard = () => {
  const { user, issues, fetchIssues } = useContext(AppContext);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchIssues(false);
  }, []);

  const filteredIssues = filter === 'All' 
    ? issues 
    : issues.filter(issue => issue.status === filter);

  return (
    <div className="container animate-fade-in">
      <div style={{ padding: '2rem 0 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>
          Hello, {user.name.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>
          Your contribution makes our campus better.
        </p>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { label: 'Reported', count: issues.filter(i => i.status === 'Reported').length, color: 'var(--warning)' },
          { label: 'In Progress', count: issues.filter(i => i.status === 'In Progress').length, color: 'var(--primary)' },
          { label: 'Resolved', count: issues.filter(i => i.status === 'Resolved').length, color: 'var(--success)' },
        ].map(stat => (
          <div key={stat.label} className="glass" style={{ padding: '1rem', textAlign: 'center', borderBottom: `4px solid ${stat.color}` }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: stat.color }}>{stat.count}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.625rem', 
        marginBottom: '1.5rem', 
        overflowX: 'auto', 
        paddingBottom: '0.5rem', 
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {['All', 'Reported', 'In Progress', 'Resolved'].map(tab => (
          <button
            key={tab}
            className={`btn ${filter === tab ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '0.625rem 1.25rem', 
              fontSize: '0.875rem', 
              whiteSpace: 'nowrap',
              borderRadius: '12px'
            }}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredIssues.length === 0 ? (
          <div className="glass text-center" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No issues found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try selecting a different category or report a new issue.</p>
          </div>
        ) : (
          filteredIssues.map(issue => (
            <IssueCard key={issue._id} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
