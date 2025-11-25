# Parallel Tool Execution

Maximize efficiency by executing independent tool calls simultaneously.

## Core Rule

When multiple tool calls have NO dependencies between them, execute them ALL in a single message.

## Decision Matrix

| Scenario | Parallel? | Reason |
|----------|-----------|--------|
| Read 3 independent files | ✅ Yes | No dependencies |
| Search + Read result | ❌ No | Read depends on search |
| Git status + Git diff | ✅ Yes | Independent operations |
| Create file + Run lint | ❌ No | Lint needs file to exist |
| Search in 3 directories | ✅ Yes | Independent searches |

## Examples

### Parallel (Good)
```
Goal: Understand authentication system

Execute together:
- Read `src/auth/login.ts`
- Read `src/auth/middleware.ts`
- Read `src/auth/types.ts`
- Search for "JWT" in codebase
```

### Sequential (Required)
```
Goal: Find and fix a bug

Step 1: Search for error message
Step 2: Read the file found in step 1
Step 3: Edit the specific line
Step 4: Run tests to verify
```

## Planning for Parallelism

Before executing tools, plan which calls can be batched:
1. List all information needed
2. Identify dependencies
3. Group independent calls
4. Execute groups in parallel
5. Use sequential calls only when output is required for next step

## Anti-Patterns

- ❌ Making 5 sequential file reads that could be parallel
- ❌ Waiting for search results before reading known files
- ❌ Running independent git commands one at a time
