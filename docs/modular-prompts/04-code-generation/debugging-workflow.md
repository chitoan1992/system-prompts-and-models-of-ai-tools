# Debugging Workflow

Systematic approach to finding and fixing bugs.

## Debug Priority Order

1. **Use debugging tools first** - Check logs, network requests, error outputs
2. **Read error messages carefully** - They often point directly to the issue
3. **Examine relevant code** - Look at the code path indicated by errors
4. **Then make targeted fixes** - Change only what's necessary

## Diagnostic Steps

### Step 1: Gather Information
```
- What is the exact error message?
- When does it occur? (always, sometimes, specific conditions)
- What was the expected behavior?
- What is the actual behavior?
```

### Step 2: Locate the Source
```
- Read stack trace from bottom to top
- Identify the first line of YOUR code in the trace
- Check the inputs to that function
- Trace back to find where bad data originated
```

### Step 3: Understand the Bug
```
- Why is this happening?
- What assumption was wrong?
- Is this the root cause or a symptom?
```

### Step 4: Fix and Verify
```
- Make the minimal change to fix the issue
- Run tests to verify the fix
- Check for regressions in related code
```

## Debug Logging

When adding debug statements:
```typescript
console.log('[DEBUG] functionName:', { variable1, variable2 });
```

Include:
- Location identifier (function/component name)
- Relevant variable values
- Timestamp if timing-related

Remember to remove debug logs after fixing.

## Common Bug Categories

| Category | Typical Cause | First Check |
|----------|--------------|-------------|
| TypeError | Undefined/null access | Data flow, optional chaining |
| Logic error | Wrong condition | Conditional statements |
| Race condition | Async timing | Promise/await handling |
| State bug | Stale state | State update flow |
| Import error | Wrong path/export | File paths, export statements |

## Never Do

- ❌ Change code randomly hoping to fix it
- ❌ Modify tests to make them pass
- ❌ Suppress errors without fixing cause
- ❌ Loop more than 3 times on same error without reassessing
