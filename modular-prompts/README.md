# Modular Atomic Prompt Library

A collection of reusable, composable prompt modules extracted from analysis of 36+ leading AI coding assistants (Cursor, Claude Code, Devin, Windsurf, v0, Cline, Bolt, Lovable, etc.)

## Architecture

```
modular-prompts/
├── 01-identity/          # WHO the AI is
│   ├── agent-role.md
│   ├── expert-persona.md
│   ├── capability-scope.md
│   └── model-awareness.md
│
├── 02-communication/     # HOW the AI communicates
│   ├── concise-response.md
│   ├── structured-output.md
│   ├── tone-professional.md
│   ├── code-citations.md
│   └── multilingual.md
│
├── 03-tool-calling/      # HOW the AI uses tools
│   ├── parallel-execution.md
│   ├── tool-selection.md
│   ├── context-gathering.md
│   └── error-recovery.md
│
├── 04-code-generation/   # HOW the AI writes code
│   ├── clean-code-style.md
│   ├── edit-strategies.md
│   ├── debugging-workflow.md
│   ├── testing-protocol.md
│   └── design-system.md
│
├── 05-task-management/   # HOW the AI tracks work
│   ├── todo-tracking.md
│   ├── planning-mode.md
│   ├── memory-persistence.md
│   └── progress-reporting.md
│
├── 06-safety/            # WHAT the AI must protect
│   ├── git-safety.md
│   ├── data-security.md
│   ├── refusal-rules.md
│   └── destructive-actions.md
│
└── composites/           # PRE-BUILT COMBINATIONS
    ├── coding-assistant-full.md
    ├── code-reviewer.md
    ├── planning-agent.md
    └── minimal-helper.md
```

## Usage

### Basic Composition
```markdown
{{include: 01-identity/agent-role.md}}
{{include: 02-communication/concise-response.md}}
{{include: 03-tool-calling/parallel-execution.md}}
{{include: 04-code-generation/clean-code-style.md}}
```

### With Variables
Each prompt supports template variables:
- `{{TOOL_NAME}}` - Your AI tool's name
- `{{MODEL_NAME}}` - The LLM model being used
- `{{LANGUAGE}}` - Response language preference
- `{{PROJECT_CONTEXT}}` - Project-specific context

## Design Principles

1. **Atomic** - Each prompt does ONE thing well
2. **Composable** - Mix and match without conflicts
3. **Battle-tested** - Extracted from production systems
4. **Minimal** - No unnecessary verbosity
5. **Overridable** - Specific rules can override general ones

## Quick Start

For a minimal coding assistant:
```
01-identity/agent-role.md
02-communication/concise-response.md
04-code-generation/edit-strategies.md
```

For a full-featured agent:
```
composites/coding-assistant-full.md
```

## Credits

Patterns extracted from: Cursor, Claude Code, Devin, Windsurf, v0, Cline, Bolt, Lovable, VSCode Agent, Anthropic, and 26+ other AI tools.
