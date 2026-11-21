# Contributing

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm test
npm run build
```

## Fee rules

Never change fee rates without verifying against the official US seller-fee
documentation. Record the source URL and verification date in the adapter and
in `data/feeSources.ts`, and add unit tests for thresholds.