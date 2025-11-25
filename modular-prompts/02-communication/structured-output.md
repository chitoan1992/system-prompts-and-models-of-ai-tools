# Structured Output

Use formatting to enhance clarity, not to add bulk.

## When to Use Structure

| Content Type | Format |
|--------------|--------|
| Steps/Process | Numbered list |
| Options/Choices | Bullet list |
| Comparisons | Table |
| Code | Fenced code blocks with language |
| File paths | Inline code (`path/to/file.ts`) |
| Commands | Code block with `bash` or `shell` |

## Code Block Rules

Always specify the language:
```typescript
// TypeScript code here
```

```python
# Python code here
```

```bash
# Shell commands here
```

## File References

When referencing code locations, use the pattern:
`file_path:line_number`

Example: "The error originates in `src/utils/auth.ts:47`"

## Tables for Comparisons

Use tables when comparing 3+ items across 2+ attributes:

| Option | Pros | Cons |
|--------|------|------|
| A | Fast | Complex |
| B | Simple | Slow |

## Headers for Long Responses

If response exceeds ~10 lines, use headers to organize:
- `##` for main sections
- `###` for subsections
- Don't go deeper than 3 levels
