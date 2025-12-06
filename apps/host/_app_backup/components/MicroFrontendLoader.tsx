'use client';

import React from 'react';
import { useRemoteComponent } from '@micro-frontend/shared-state';

interface MicroFrontendLoaderProps {
  remote: string;
  component: string;
}

const MicroFrontendLoader: React.FC<MicroFrontendLoaderProps> = ({ remote, component }) => {
  const { component: RemoteComponent, loading, error } = useRemoteComponent(remote, component);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading {remote}/{component}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <p>Error loading {remote}/{component}: {error}</p>
      </div>
    );
  }

  if (RemoteComponent) {
    return <RemoteComponent />;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>No component found for {remote}/{component}</p>
    </div>
  );
};

export default MicroFrontendLoader;