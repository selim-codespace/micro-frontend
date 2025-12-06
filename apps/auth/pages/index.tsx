import React from 'react';
import LoginForm from '../components/LoginForm';

export default function AuthIndexPage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Auth Micro Frontend</h1>
        <LoginForm />
      </div>
    </div>
  );
}
