# Deployment Guide

## Overview

This guide explains how to deploy the Micro Frontend Platform applications. Each micro frontend can be deployed independently, allowing teams to work autonomously.

## Prerequisites

1. Node.js 18+ installed
2. pnpm package manager installed
3. Access to deployment targets (servers, CDNs, cloud platforms)

## Building Applications

### Build Process

Each application can be built independently using the following command:

```bash
cd apps/<app-name>
npm run build
```

For example, to build the host application:

```bash
cd apps/host
npm run build
```

### Build Output

The build process generates optimized production-ready code in the `.next` directory. The output includes:

- Static assets (HTML, CSS, JS)
- Server-side rendered pages
- API routes
- Module Federation remote entry files

## Deployment Strategy

### Individual Application Deployment

Each micro frontend can be deployed to a separate domain or subdomain:

```
- host → host.domain.com
- auth → auth.domain.com
- dashboard → dashboard.domain.com
- analytics → analytics.domain.com
- billing → billing.domain.com
- admin → admin.domain.com
- notifications → notifications.domain.com
```

### Module Federation Configuration

Each remote application exposes components via a remote entry file located at:
`/_next/static/chunks/remoteEntry.js`

The host application dynamically loads these remote components at runtime.

## Deployment Steps

### 1. Build All Applications

```bash
# Build each application
cd apps/host
npm run build
cd ../auth
npm run build
cd ../dashboard
npm run build
cd ../analytics
npm run build
cd ../billing
npm run build
cd ../admin
npm run build
cd ../notifications
npm run build
```

### 2. Deploy Applications

Deploy each application to its respective target:

1. Upload the `.next` directory contents to the server
2. Configure the server to serve the static assets
3. Set up reverse proxy if needed
4. Configure domain/subdomain routing

### 3. Update Remote Registry

Maintain a remote registry that maps application names to their remote entry URLs:

```json
{
  "auth": "https://auth.domain.com/_next/static/chunks/remoteEntry.js",
  "dashboard": "https://dashboard.domain.com/_next/static/chunks/remoteEntry.js",
  "analytics": "https://analytics.domain.com/_next/static/chunks/remoteEntry.js",
  "billing": "https://billing.domain.com/_next/static/chunks/remoteEntry.js",
  "admin": "https://admin.domain.com/_next/static/chunks/remoteEntry.js",
  "notifications": "https://notifications.domain.com/_next/static/chunks/remoteEntry.js"
}
```

## CI/CD Pipeline

### GitHub Actions Workflow

Set up automated deployment with GitHub Actions:

```yaml
name: Deploy Micro Frontends

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        app: [host, auth, dashboard, analytics, billing, admin, notifications]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd apps/${{ matrix.app }}
        npm ci
        
    - name: Run tests
      run: |
        cd apps/${{ matrix.app }}
        npm test
        
    - name: Build application
      run: |
        cd apps/${{ matrix.app }}
        npm run build
        
    - name: Deploy to CDN
      run: |
        # Deployment commands for your CDN/provider
        echo "Deploying ${{ matrix.app }} to CDN"
```

## Environment Configuration

### Environment Variables

Each application can use environment variables for configuration:

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production

# API endpoints
API_BASE_URL=https://api.domain.com
```

Set environment variables in your deployment environment or use a secrets management system.

## Monitoring and Observability

### Logging

Each application should send logs to a centralized logging system:

- Application logs
- Error logs
- Performance metrics
- User activity tracking

### Error Boundaries

Implement error boundaries in each micro frontend to prevent cascading failures:

```javascript
// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Micro Frontend Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## Security Considerations

### Content Security Policy (CSP)

Configure CSP headers to allow loading of remote modules:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-eval' https://*.domain.com;
  connect-src 'self' https://api.domain.com;
```

### Authentication

Implement secure authentication with:

- JWT tokens
- HttpOnly cookies
- CSRF protection
- Session management

## Scaling Considerations

### Horizontal Scaling

Each micro frontend can be scaled independently based on demand:

- Add more instances of high-traffic applications
- Scale compute resources per application
- Implement caching strategies per application

### Version Management

Use semantic versioning for each micro frontend:

- Major versions for breaking changes
- Minor versions for new features
- Patch versions for bug fixes

Maintain backward compatibility when possible.

## Troubleshooting

### Common Issues

1. **Module Federation Loading Failures**
   - Check remote entry URLs are accessible
   - Verify CORS configuration
   - Ensure shared dependencies match

2. **Build Errors**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check TypeScript configuration

3. **Runtime Errors**
   - Check browser console for errors
   - Verify network requests are successful
   - Check authentication tokens are valid

### Debugging Tips

1. Use browser developer tools to inspect network requests
2. Check server logs for error messages
3. Verify environment variables are set correctly
4. Test each micro frontend independently

## Rollback Procedures

### Rolling Back Deployments

1. Identify the problematic deployment
2. Revert to the previous stable version
3. Update DNS/load balancer configuration
4. Monitor for issues after rollback

### Blue-Green Deployment

Implement blue-green deployment for zero-downtime releases:

1. Deploy new version to inactive environment
2. Test thoroughly
3. Switch traffic to new environment
4. Decommission old environment

## Conclusion

This deployment guide provides a comprehensive approach to deploying the Micro Frontend Platform. Each micro frontend can be deployed independently, allowing teams to work autonomously while maintaining a cohesive user experience through the host application.