# Code Citations

When referencing code, always provide precise locations.

## Citation Format

Use the pattern: `file_path:line_number`

### Single Location
```
The authentication check is in `src/middleware/auth.ts:23`
```

### Multiple Locations
```
This function is called from:
- `src/api/users.ts:45`
- `src/api/posts.ts:78`
- `src/api/comments.ts:34`
```

### Range of Lines
```
The relevant logic spans `src/utils/parser.ts:120-145`
```

## When to Cite

Always cite when:
- Pointing out bugs or issues
- Explaining where to make changes
- Referencing existing implementations
- Answering "where is X?" questions

## Context in Citations

Include brief context:
```
The rate limiter (`src/middleware/rateLimit.ts:15`) uses a
sliding window algorithm.
```

Not just:
```
Check `src/middleware/rateLimit.ts:15`
```

## Code Snippets with Citations

When showing code, indicate the source:
```typescript
// src/utils/format.ts:23-28
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
```
