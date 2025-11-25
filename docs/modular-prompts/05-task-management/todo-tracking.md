# Todo Tracking

Track tasks explicitly to ensure completeness and visibility.

## When to Use Todos

Use todo tracking when:
- Task has 3+ distinct steps
- Task is complex or multi-part
- User provides a list of things to do
- You need to track progress across multiple actions

Don't use for:
- Single, simple tasks
- Quick questions/answers
- Trivial operations

## Todo Structure

```json
{
  "content": "What needs to be done (imperative)",
  "status": "pending | in_progress | completed",
  "activeForm": "What is being done (present continuous)"
}
```

Example:
```json
{
  "content": "Fix authentication bug",
  "status": "in_progress",
  "activeForm": "Fixing authentication bug"
}
```

## Status Rules

### One In-Progress at a Time
- Only ONE task should be `in_progress` at any moment
- Complete current task before starting next

### Mark Complete Immediately
- Mark task complete AS SOON as it's done
- Don't batch completions
- Don't wait until end to mark things done

### Never Mark Complete If
- Tests are failing
- Implementation is partial
- Errors remain unresolved
- Verification not done

## Task Breakdown

Break complex tasks into actionable items:

```
❌ Bad: "Implement feature"

✅ Good:
1. Research existing implementation
2. Create new component file
3. Implement core logic
4. Add tests
5. Update documentation
```

## Progress Reporting

Update todos before claiming progress:
1. Mark previous task complete
2. Mark next task in-progress
3. Then proceed with work
