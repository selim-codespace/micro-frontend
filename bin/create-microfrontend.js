#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the micro frontend name from command line arguments
const args = process.argv.slice(2);
const microFrontendName = args[0];

if (!microFrontendName) {
  console.error('Please provide a micro frontend name');
  process.exit(1);
}

// Create the micro frontend directory
const microFrontendPath = path.join(process.cwd(), 'apps', microFrontendName);

if (fs.existsSync(microFrontendPath)) {
  console.error(`Micro frontend "${microFrontendName}" already exists`);
  process.exit(1);
}

fs.mkdirSync(microFrontendPath, { recursive: true });

// Create package.json
const packageJson = {
  name: `@micro-frontend/${microFrontendName}`,
  version: '1.0.0',
  private: true,
  description: `${microFrontendName} micro frontend for the Micro Frontend Platform`,
  scripts: {
    dev: `next dev -p ${3000 + Math.floor(Math.random() * 1000)}`,
    build: 'next build',
    start: `next start -p ${3000 + Math.floor(Math.random() * 1000)}`,
    lint: 'next lint'
  },
  dependencies: {
    '@micro-frontend/config': '1.0.0',
    '@micro-frontend/design-tokens': '1.0.0',
    '@micro-frontend/shared-state': '1.0.0',
    '@micro-frontend/shared-utils': '1.0.0',
    '@micro-frontend/ui-kit': '1.0.0',
    next: '^15.0.0',
    react: '^18.2.0',
    react_dom: '^18.2.0'
  },
  devDependencies: {
    '@types/node': '^20.0.0',
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
    typescript: '^5.0.0'
  }
};

fs.writeFileSync(
  path.join(microFrontendPath, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Create tsconfig.json
const tsconfig = {
  compilerOptions: {
    target: 'ES2020',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'node',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
    baseUrl: '.',
    paths: {
      '@ui-kit/*': ['../../packages/ui-kit/*'],
      '@shared-state/*': ['../../packages/shared-state/*'],
      '@shared-utils/*': ['../../packages/shared-utils/*'],
      '@design-tokens/*': ['../../packages/design-tokens/*'],
      '@config/*': ['../../packages/config/*']
    }
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
  exclude: ['node_modules']
};

fs.writeFileSync(
  path.join(microFrontendPath, 'tsconfig.json'),
  JSON.stringify(tsconfig, null, 2)
);

// Create next.config.js
const nextConfig = `
const { withModuleFederation } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

const federationConfig = {
  name: '${microFrontendName}',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './${microFrontendName}Page': './app/page',
  },
  remotes: {
    host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: false,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: false,
    },
  },
};

module.exports = withModuleFederation(nextConfig, federationConfig);
`;

fs.writeFileSync(path.join(microFrontendPath, 'next.config.js'), nextConfig);

// Create mf.config.js
const mfConfig = `
const { withModuleFederation } = require('@module-federation/nextjs-mf');

/** @type {import('@module-federation/nextjs-mf').FederationConfig} */
const federationConfig = {
  name: '${microFrontendName}',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './${microFrontendName}Page': './app/page',
  },
  remotes: {
    host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: false,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: false,
    },
  },
};

module.exports = withModuleFederation(federationConfig);
`;

fs.writeFileSync(path.join(microFrontendPath, 'mf.config.js'), mfConfig);

// Create app directory structure
const appPath = path.join(microFrontendPath, 'app');
fs.mkdirSync(appPath, { recursive: true });

// Create page.tsx
const pageContent = `
'use client';

export default function ${microFrontendName.charAt(0).toUpperCase() + microFrontendName.slice(1)}Page() {
  return (
    <div>
      <h1>${microFrontendName.charAt(0).toUpperCase() + microFrontendName.slice(1)} Page</h1>
      <p>This is the ${microFrontendName} micro frontend.</p>
    </div>
  );
}
`;

fs.writeFileSync(path.join(appPath, 'page.tsx'), pageContent);

// Create layout.tsx
const layoutContent = `
'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>${microFrontendName.charAt(0).toUpperCase() + microFrontendName.slice(1)} Micro Frontend</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.join(appPath, 'layout.tsx'), layoutContent);

console.log(`Micro frontend "${microFrontendName}" created successfully at ${microFrontendPath}`);