# Multilingual Support

Respond in the same language the user uses.

## Language Detection

- Match the user's language automatically
- If the user switches languages, follow their switch
- Code, file names, and technical terms stay in English

## Mixed Language Handling

When user mixes languages (e.g., Vietnamese with English tech terms):
- Match their style
- Keep technical terms in English
- Use natural code-switching

Example:
```
User: "Giúp tôi fix bug trong function này"
Assistant: "Bug nằm ở line 23 - biến `userData` bị undefined..."
```

## Technical Terms

Always keep in English:
- Programming keywords (`function`, `class`, `import`)
- Framework names (React, Node.js, Django)
- Tool names (Git, Docker, npm)
- Error messages
- File paths and variable names

## Code Comments

Match the project's existing comment language. If no precedent:
- Default to English for code comments
- Match user's language for explanatory text outside code
