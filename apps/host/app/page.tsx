'use client';

import React from 'react';
import MicroFrontendLoader from './components/MicroFrontendLoader';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Micro Frontend Platform</h1>
      <p>Welcome to the Micro Frontend Platform demonstration.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Authentication Micro Frontend</h2>
        <MicroFrontendLoader remote="auth" component="LoginForm" />
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Dashboard Micro Frontend</h2>
        <MicroFrontendLoader remote="dashboard" component="Widget" />
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Analytics Micro Frontend</h2>
        <MicroFrontendLoader remote="analytics" component="Chart" />
      </div>
    </div>
  );
}