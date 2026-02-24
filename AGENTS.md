# AGENTS.md - Development Guide for this Project

## Project Overview

This is a personal blog built with modern web technologies. The codebase follows TypeScript best practices with React/Next.js conventions.

## Build Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run type checking
npm run typecheck

# Run tests
npm test

# Run a single test file
npm test -- path/to/testfile.test.ts
npm test -- --testPathPattern="component-name"
npm test -- -t "test name pattern"

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Code Style Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Avoid magic numbers - use constants instead

### TypeScript

- Always define return types for functions
- Use explicit types rather than `any`
- Prefer interfaces over types for object shapes
- Use strict null checks

```typescript
// Good
function getPostById(id: string): Post | null {
  return posts.find(p => p.id === id) ?? null;
}

// Avoid
function getPostById(id) {
  return posts.find(p => p.id === id);
}
```

### Imports

- Use absolute imports with `@/` alias for project paths
- Order imports: external libraries → internal modules → relative paths
- Use named exports for components and utilities

```typescript
// Order: React → external → internal (@/) → relative
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { usePosts } from '@/hooks/usePosts';
import { PostCard } from '@/components/PostCard';
import styles from './styles.module.css';
```

### Naming Conventions

- **Components**: PascalCase (`PostCard`, `Header`)
- **Hooks**: camelCase with `use` prefix (`usePosts`, `useAuth`)
- **Utilities/functions**: camelCase (`formatDate`, `getPostBySlug`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_POSTS_PER_PAGE`)
- **Files**: kebab-case for utilities (`date-utils.ts`), PascalCase for components
- **Types/Interfaces**: PascalCase (`Post`, `UserConfig`)

### React/Next.js Patterns

- Use functional components with hooks
- Destructure props for clarity
- Keep component files under 300 lines
- Extract complex logic into custom hooks
- Use proper key props in lists

```typescript
interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={featured ? 'featured' : ''}>
      <h2>{post.title}</h2>
    </article>
  );
}
```

### Error Handling

- Always handle async errors with try/catch
- Use error boundaries for component trees
- Display user-friendly error messages
- Log errors appropriately for debugging

```typescript
// Good
async function fetchPosts() {
  try {
    const posts = await api.getPosts();
    return posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw new UserFriendlyError('Unable to load posts. Please try again.');
  }
}
```

### CSS/Styling

- Use CSS Modules or styled-components
- Avoid global CSS except for reset/base styles
- Use consistent spacing (4px base unit)
- Follow mobile-first responsive design

### File Organization

```
src/
├── app/              # Next.js App Router pages
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
├── styles/           # Global styles and variables
└── content/          # Blog content (MDX, markdown)
```

### Testing

- Write tests for utility functions and hooks
- Test component rendering and user interactions
- Use `@testing-library/react` for component tests
- Aim for meaningful test assertions

```typescript
describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });
});
```

### Git Conventions

- Use meaningful commit messages
- Keep commits atomic and focused
- Create feature branches for new features
- Use pre-commit hooks for linting

### Documentation

- Document complex utility functions with JSDoc
- Keep README.md updated with setup instructions
- Comment on non-obvious code decisions

### Performance

- Optimize images with Next.js Image component
- Lazy load heavy components
- Memoize expensive computations
- Use proper dependency arrays in useEffect/useMemo
