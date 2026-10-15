# Endlesscape — Agent Rules & Design Constitution

Whenever assisting with this repository, you MUST read and follow the documents in the `memory/` directory:
- [design_system_and_rules.md](./memory/design_system_and_rules.md): Strict visual tokens, typography, and styling rules.
- [deployment_and_hosting.md](./memory/deployment_and_hosting.md): VPS infrastructure, domain, Nginx, and PM2 settings.
- [frontend_architecture.md](./memory/frontend_architecture.md): React 19 architecture and routing state machine.
- [backend_and_database.md](./memory/backend_and_database.md): Express API endpoints and database schema.

### Core Constraints:
1. **Never degrade the luxury editorial aesthetic**: Black Tomato inspired, obsidian black (`#08090b`), high-contrast Outfit & Cormorant Garamond typography.
2. **Never inject Tailwind or external CSS utility libraries**: Use Vanilla CSS and predefined design tokens.
3. **Never break responsive dual-video hero background**: Keep 1080p desktop and 9:16 mobile cuts with ambient controls.
4. **Always verify client build**: Run `npm --prefix client run build` to confirm 0 TypeScript errors before committing.
