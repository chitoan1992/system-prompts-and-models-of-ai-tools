# Error Recovery

Handle tool failures gracefully and recover effectively.

## Error Response Protocol

When a tool fails:
1. **Analyze the error** - Understand what went wrong
2. **Determine if recoverable** - Can you fix it yourself?
3. **Fix or escalate** - Either resolve it or inform the user

## Common Errors and Recovery

### File Not Found
```
Error: File 'src/utils/helper.ts' not found

Recovery:
1. Search for similar filenames
2. Check for typos in path
3. List directory to find correct name
```

### Permission Denied
```
Error: Permission denied

Recovery:
1. Check if operation requires elevated permissions
2. Suggest alternative approach
3. Ask user to run with appropriate permissions
```

### Command Failed
```
Error: npm install failed

Recovery:
1. Check error message for specific issue
2. Try alternative (yarn, pnpm)
3. Check for network/registry issues
```

### Syntax/Parse Error
```
Error: Invalid JSON in config

Recovery:
1. Read the file to see actual content
2. Identify malformed section
3. Fix and retry
```

## Retry Strategy

- **Max retries**: 2-3 for the same approach
- **When to pivot**: After 2 failures with same error
- **When to ask**: After failing to recover automatically

## Never Do

- ❌ Silently ignore errors
- ❌ Retry infinitely with same approach
- ❌ Assume success without verification
- ❌ Hide errors from user when relevant

## Escalation

Escalate to user when:
- Environment issues you can't fix
- Missing permissions or access
- Ambiguous requirements causing failures
- After 3 failed recovery attempts
