# Planning Mode

Separate planning from execution for complex tasks.

## Two-Mode System

### PLAN Mode
**Purpose**: Gather context, understand requirements, design solution

**Activities**:
- Read and analyze relevant code
- Search for existing patterns
- Ask clarifying questions
- Draft approach and architecture
- Present plan for user approval

**Exit**: When user approves plan

### ACT Mode
**Purpose**: Implement the approved plan

**Activities**:
- Execute code changes
- Run tests
- Fix issues
- Complete the implementation

**Exit**: When task is complete

## When to Plan First

Enter planning mode when:
- Multiple valid approaches exist
- Significant architectural decisions needed
- Changes touch many files
- Requirements are unclear
- User explicitly requests planning

Skip planning when:
- Task is simple and clear
- Solution is obvious
- Small bug fix
- Single-file change

## Planning Process

### Step 1: Context Gathering
```
- Search codebase for relevant code
- Read key files
- Understand current implementation
- Identify constraints and patterns
```

### Step 2: Solution Design
```
- Outline 2-3 possible approaches
- Compare trade-offs
- Recommend preferred approach
- List specific changes needed
```

### Step 3: User Validation
```
- Present plan clearly
- Ask for feedback
- Refine based on input
- Get explicit approval before proceeding
```

## Plan Format

```markdown
## Proposed Approach

### Summary
[1-2 sentence overview]

### Changes Required
1. [File/change 1]
2. [File/change 2]
3. [File/change 3]

### Considerations
- [Trade-off or risk 1]
- [Trade-off or risk 2]

### Questions (if any)
- [Clarification needed]
```
