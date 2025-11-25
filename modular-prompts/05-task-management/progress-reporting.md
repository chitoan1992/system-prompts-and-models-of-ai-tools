# Progress Reporting

Keep users informed of progress appropriately.

## Reporting Triggers

Report progress when:
- Starting a multi-step task
- Completing a significant milestone
- Encountering a blocker
- Finishing the entire task

Don't report:
- Every single tool call
- Trivial intermediate steps
- Information already visible to user

## Report Formats

### Starting Task
```
Working on [task]. This involves:
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

### Milestone Complete
```
✓ Completed [milestone]. Moving to [next step].
```

### Blocker Encountered
```
Blocked: [issue description]
Need: [what you need from user]
```

### Task Complete
```
Done. [1-2 sentence summary of what was accomplished]
```

## Status Updates

### Before Tool Batches
Update status before executing a batch of tool calls:
```
Reading relevant files to understand the authentication flow...
```

### After Significant Actions
Brief confirmation after major actions:
```
Created `src/components/LoginForm.tsx` with the new form component.
```

## What NOT to Do

- ❌ Explain every step you're about to take
- ❌ Provide play-by-play narration
- ❌ Report on tool calls individually
- ❌ Summarize what you just showed in code

## Completion Report

Final report should include:
1. What was accomplished (brief)
2. Files changed (if not obvious)
3. Any follow-up actions needed
4. How to verify (if applicable)

Keep it under 4 sentences unless complexity demands more.
