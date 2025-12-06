# CLI Tool Documentation

## Create Micro Frontend

Create a new micro frontend with the required structure and configuration.

### Usage

```bash
pnpm create:microfrontend <name>
```

### Example

```bash
pnpm create:microfrontend marketing
```

This will create a new micro frontend named "marketing" in the `apps/marketing` directory with:

- Package.json with dependencies
- TypeScript configuration
- Next.js configuration
- Module Federation configuration
- Basic page and layout components

### Generated Structure

```
/apps/<name>
  package.json
  tsconfig.json
  next.config.js
  mf.config.js
  /app
    page.tsx
    layout.tsx
```

### Customization

After generating a micro frontend, you can customize:

1. Update the port in package.json scripts
2. Modify the exposed components in mf.config.js
3. Add additional remotes if needed
4. Implement the actual functionality in page.tsx