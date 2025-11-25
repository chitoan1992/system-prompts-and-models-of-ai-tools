# Clean Code Style

Write code that is readable, maintainable, and follows established best practices.

## Naming Conventions

### Variables and Functions
```typescript
// ❌ Bad - cryptic abbreviations
const n = 5;
const genYmdStr = () => {};
const usrData = {};

// ✅ Good - clear, descriptive names
const maxRetryAttempts = 5;
const generateDateString = () => {};
const userData = {};
```

### Rules
- Variables/constants: nouns (`userData`, `isLoading`, `errorMessage`)
- Functions/methods: verbs (`fetchUser`, `validateInput`, `handleSubmit`)
- Booleans: question form (`isActive`, `hasPermission`, `canEdit`)
- Use full words, not abbreviations (unless universally known: `url`, `id`, `api`)

## Code Structure

### Guard Clauses (Early Returns)
```typescript
// ❌ Bad - nested conditions
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // actual logic here
      }
    }
  }
}

// ✅ Good - guard clauses
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;

  // actual logic here
}
```

### Maximum Nesting
- Limit to 2-3 levels of nesting
- Extract nested logic into separate functions

## File Organization

### Small, Focused Files
- One component/class per file
- Extract utilities into separate modules
- Keep files under 200-300 lines when possible

### Import Organization
```typescript
// 1. External libraries
import React from 'react';
import { useState } from 'react';

// 2. Internal modules
import { formatDate } from '@/utils/format';
import { Button } from '@/components/ui';

// 3. Types
import type { User } from '@/types';

// 4. Styles/Assets
import './styles.css';
```

## Comments

### When to Comment
- Complex algorithms that aren't self-evident
- Business logic that requires domain knowledge
- Workarounds with explanation of why

### When NOT to Comment
- Obvious code (`// increment counter` before `i++`)
- Commented-out code (delete it)
- Redundant descriptions of what code does
