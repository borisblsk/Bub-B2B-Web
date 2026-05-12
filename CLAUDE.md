# B2B Banking Sandbox — Rules for Claude

## Design source
- All designs come from Figma via the figma-dev-mode-mcp-server.
- Always use the MCP to read frames. Never guess values from screenshots.
- Match Figma 1:1: spacing, sizing, typography, colors, border radius, shadows.

## Stack
- Vite + React + TypeScript + Tailwind CSS
- Light mode only (no dark mode)
- Icons: iconsax-react for all icons. Do not use lucide or other icon libraries.

## Token rules
- All design tokens (colors, spacing, fontSize, borderRadius, fontFamily) live in tailwind.config.js.
- Never hardcode hex colors, pixel values for spacing, or font sizes in components. Always reference tokens via Tailwind classes.
- If a needed token doesn't exist in the config, ADD IT to the config first, then use it.

## Component rules
- One component per file in src/components.
- Build one component at a time. Render it in App.tsx for visual review.
- Include all states shown in Figma variants: default, hover, focus, active, disabled, loading, error.
- Use TypeScript with proper prop types.

## Icon conventions
- Components that accept icons (leftIcon, rightIcon, icon, etc.) own size and color via cloneElement.
- ALWAYS pass icons directly: `<Add />` not wrapped in `<span>`, `<div>`, or fragments.
- Component decides icon size based on its own size prop (e.g., button size 'default' → icon size 20).
- Icon color always inherits via currentColor — set text color on the parent component.
- Library: iconsax-react. Other icon libraries (lucide, phosphor) follow the same color/size prop convention so they're swappable, but verify before mixing.
- This convention applies to all components that accept icons: Button, Avatar, Chip, Input adornments, ListItem, etc.

## Image rules
- Icons: iconsax-react. For custom non-iconsax icons, export from Figma as SVG and inline as React components.
- Logos & illustrations: SVG when available, exported via Figma MCP to src/assets/.
- Photos: WebP format.

## Workflow
- Before building, read the Figma frame fully via MCP and confirm structure.
- After building, list any assumptions made and any tokens added to the config.
