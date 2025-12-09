# Project Guidelines

## Package Manager

This project uses **bun** as the package manager. Always use `bun` instead of `npm`, `yarn`, or `pnpm`.

```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Build for production
bun add <package>    # Add a package
```

## Branch Naming Convention

Use `<username>/<type>-<short-description>` format.

**Types:** `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`

**Example:** `aalter/fix-login-redirect`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full details.

## Documentation

When adding, removing, or reorganizing documentation in `content/docs/`, always update `README.md` to reflect the current structure. The README should accurately describe:

- Documentation sections and their purpose
- Folder structure
- Any new content areas added
