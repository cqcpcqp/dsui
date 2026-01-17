# Developer Contribution Guide

## Start

First start:

```bash
yarn init
```

After that, just run the following command:

```bash
yarn start
```

Generate color:

```bash
cd packages/ds-ui
yarn color-generate
```

## Recommend

[custom-elements-best-practices](https://web.dev/articles/custom-elements-best-practices?hl=zh-cn)

## Testing

This project uses **Vitest** as the testing framework.

### Run Tests

From the project root, you can run:

```bash
# Run ds-core tests (watch mode)
yarn test:core
```

### Test Structure

Tests are located in each package's directory:

- `packages/ds-core/__tests__/` - ds-core tests (signal system)

### Writing Tests

When adding new features, please write corresponding tests:

```bash
# In ds-core
cd packages/ds-core
yarn vitest __tests__/your-feature.test.ts

```
