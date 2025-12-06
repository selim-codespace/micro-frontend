# Module Federation Documentation

## Overview

Module Federation is a webpack feature that allows loading separately compiled applications or libraries at runtime. In this micro frontend platform, we use Module Federation to dynamically load micro frontends.

## Configuration

Each micro frontend has a `mf.config.js` file that defines its Module Federation configuration:

```javascript
const federationConfig = {
  name: 'app-name',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './ComponentName': './path/to/component',
  },
  remotes: {
    remoteAppName: 'remoteAppName@http://localhost:port/_next/static/chunks/remoteEntry.js',
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
```

## Properties

### name
The name of the micro frontend. This should be unique across all micro frontends.

### filename
The name of the remote entry file that will be generated. This file contains the metadata needed to load the micro frontend.

### exposes
Components or modules that this micro frontend exposes for consumption by other micro frontends.

### remotes
Other micro frontends that this micro frontend depends on.

### shared
Dependencies that should be shared between micro frontends to avoid duplication.

## Host Application

The host application acts as the shell that loads other micro frontends. It defines remotes for all other micro frontends in the system.

## Remote Applications

Each remote application exposes components that can be consumed by the host or other remotes. They also define remotes for any micro frontends they depend on.

## Consuming Remote Components

To consume a remote component in a micro frontend:

```javascript
import ComponentName from 'remoteAppName/ComponentName';
```

## Best Practices

1. **Share React and ReactDOM as singletons** to avoid conflicts
2. **Expose only what's needed** - don't expose entire applications
3. **Use semantic names** for exposed components
4. **Keep remote entry files small** by exposing only essential components
5. **Handle loading states** when consuming remote components
6. **Implement error boundaries** to handle failures in remote components

## Troubleshooting

### Components not loading
- Check that the remote URL is correct
- Verify that the remote application is running
- Ensure the exposed component path is correct

### Version conflicts
- Make sure shared dependencies have compatible versions
- Use singleton: true for React and ReactDOM
- Check the browser console for version mismatch warnings

### Performance issues
- Minimize the number of exposed components
- Use code splitting to reduce bundle sizes
- Implement lazy loading for remote components