# Modular Prompt Index

Quick reference for all available prompt modules.

---

## 01-identity/ (4 modules)

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| `agent-role.md` | Define autonomous agent behavior | Persistence until completion |
| `expert-persona.md` | Establish expertise and professionalism | Domain knowledge scope |
| `capability-scope.md` | Set boundaries for what AI can/cannot do | Clear capability limits |
| `model-awareness.md` | Model self-knowledge and calibration | Honest limitations |

---

## 02-communication/ (5 modules)

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| `concise-response.md` | Minimize verbosity | Forbidden phrases list |
| `structured-output.md` | Formatting guidelines | Code citations format |
| `tone-professional.md` | Professional communication | Respectful correction |
| `code-citations.md` | Reference code locations | `file:line` pattern |
| `multilingual.md` | Multi-language support | Language matching |

---

## 03-tool-calling/ (4 modules)

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| `parallel-execution.md` | Maximize efficiency | Dependency decision matrix |
| `tool-selection.md` | Choose right tools | Tool hierarchy |
| `context-gathering.md` | Efficient information gathering | Priority order |
| `error-recovery.md` | Handle failures gracefully | Recovery strategies |

---

## 04-code-generation/ (5 modules)

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| `clean-code-style.md` | Code quality standards | Naming conventions |
| `edit-strategies.md` | Choose edit approach | Three-tier system |
| `debugging-workflow.md` | Systematic debugging | Debug priority order |
| `testing-protocol.md` | Verification requirements | Never skip tests |
| `design-system.md` | UI/style consistency | Semantic tokens |

---

## 05-task-management/ (4 modules)

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| `todo-tracking.md` | Track task progress | One in-progress rule |
| `planning-mode.md` | Separate planning from doing | Two-mode system |
| `memory-persistence.md` | Save important context | Memory categories |
| `progress-reporting.md` | Keep user informed | Report triggers |

---

## 06-safety/ (4 modules)

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| `git-safety.md` | Safe git operations | Forbidden commands |
| `data-security.md` | Protect sensitive data | Detection patterns |
| `refusal-rules.md` | Know when to decline | Direct refusals |
| `destructive-actions.md` | Confirm dangerous ops | Confirmation protocol |

---

## composites/ (6 ready-made combinations)

| Composite | Use Case | Modules Combined |
|-----------|----------|------------------|
| `coding-assistant-full.md` | Complete coding agent | All essential modules |
| `code-reviewer.md` | Code review specialist | Review-focused subset |
| `planning-agent.md` | Architecture & planning | Planning-focused subset |
| `minimal-helper.md` | Quick, simple help | Minimal modules |
| `think-first.md` | Structured reasoning | Thinking protocol |
| `agentic-loop.md` | Autonomous execution | Loop-based autonomy |

---

## Quick Recipes

### Minimal Setup
```
01-identity/agent-role.md
02-communication/concise-response.md
```

### Standard Coding Assistant
```
01-identity/agent-role.md
01-identity/expert-persona.md
02-communication/concise-response.md
02-communication/code-citations.md
04-code-generation/edit-strategies.md
06-safety/git-safety.md
```

### Full-Featured Agent
```
composites/coding-assistant-full.md
```

### Code Review Bot
```
composites/code-reviewer.md
```

### Planning Phase
```
composites/planning-agent.md
```

---

## Composition Syntax

Include modules using your template system:
```
{{include: 01-identity/agent-role.md}}
{{include: 02-communication/concise-response.md}}
```

Or concatenate directly:
```bash
cat 01-identity/agent-role.md 02-communication/concise-response.md > my-prompt.md
```
