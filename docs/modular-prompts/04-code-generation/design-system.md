# Design System Integration

Follow established design patterns and use semantic tokens.

## Core Principle

Never use hardcoded styles when design tokens exist.

## Semantic Color Tokens

```css
/* ❌ Bad - hardcoded colors */
.button {
  background: #3b82f6;
  color: white;
}

/* ✅ Good - semantic tokens */
.button {
  background: var(--primary);
  color: var(--primary-foreground);
}
```

## Common Token Categories

### Colors
```
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring
```

### Spacing (Tailwind)
```
Use scale: p-1, p-2, p-4, p-6, p-8
NOT arbitrary: p-[13px], p-[22px]
```

### Typography
```
Use: text-sm, text-base, text-lg, text-xl
With: font-sans, font-mono
NOT: font-['Custom Font'], text-[17px]
```

## Component Variants

Create variants instead of one-off overrides:

```typescript
// ✅ Good - variant system
const buttonVariants = {
  default: "bg-primary text-primary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "border border-input bg-background",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

// ❌ Bad - inline overrides
<Button className="bg-red-500 text-white hover:bg-red-600">
```

## Dark Mode

Always consider both modes:
```css
/* Light mode */
--background: 0 0% 100%;
--foreground: 222 84% 5%;

/* Dark mode */
.dark {
  --background: 222 84% 5%;
  --foreground: 0 0% 100%;
}
```

## Rules

1. Check for existing design system before adding new styles
2. Use component library variants when available
3. Keep custom CSS minimal
4. Ensure proper contrast in all color modes
5. Use responsive utilities (`md:`, `lg:`) consistently
