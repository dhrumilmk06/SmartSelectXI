# SelectXI AI — Login / Auth Page Redesign Brief

> **For:** Antigravity Design Team  
> **Project:** SelectXI AI — Cricket Intelligence Platform  
> **Task:** Full redesign of `/auth` route (`src/routes/auth.tsx`)  
> **Stack:** React + TanStack Router + Framer Motion + Tailwind CSS v4 + shadcn/ui  

---

## Context & Brand Identity

SelectXI AI is a **dark, sports-tech cricket intelligence platform**. The brand palette is:

| Token | Value | Usage |
|---|---|---|
| `--pitch` | `oklch(0.78 0.19 145)` | Primary green (neon cricket pitch) |
| `--pitch-glow` | `oklch(0.85 0.22 150)` | Bright glow variant |
| `--sky` | `oklch(0.7 0.18 235)` | Secondary electric blue |
| `--sky-glow` | `oklch(0.78 0.2 230)` | Bright sky variant |
| `--background` | `oklch(0.16 0.02 240)` | Near-black deep navy |
| `--surface` | `oklch(0.2 0.025 240)` | Card surface |
| `--surface-elevated` | `oklch(0.235 0.03 240)` | Elevated surface |
| `--foreground` | `oklch(0.97 0.005 240)` | Off-white text |
| `--muted-foreground` | `oklch(0.7 0.02 240)` | Muted text |
| `--border` | `oklch(0.3 0.025 240 / 0.5)` | Subtle borders |

**Fonts in use:**
- `--font-display`: `"Space Grotesk"` — headings, brand name
- `--font-sans`: `"Inter"` — body, labels
- `--font-mono`: `"JetBrains Mono"` — badge text, metadata labels

**Existing utility classes available in `styles.css`:**
- `.grid-bg` — subtle dot grid background
- `.text-gradient` — green-to-blue gradient text
- `.animate-pulse-glow` — pulsing glow animation

---

## Current Auth Page — What Exists

The current `src/routes/auth.tsx` implements:

1. **Two modes**: `login` | `signup` — toggled via pill tabs at the top
2. **Two portals**: `selector` (Coach/Selector) | `fantasy` (Fantasy Player) — toggled via icon pills
3. **Conditional form fields** based on mode × portal combination:
   - Signup / Selector: Name, Team Name, Email, Password, Role (Select dropdown)
   - Signup / Fantasy: Handle, Email, Password, Confirm Password
   - Login / Either: Email, Password, "Keep me signed in" checkbox, "Reset access key" link
4. **CTA button**: Full-width, rounded-full, pitch→sky gradient
5. **Trust footer**: "End-to-End SSL Enforced" with ShieldCheck icon
6. **Back link**: "← Return to Main Terminal"

The layout is: centered single-column, max-w-md, dark glassmorphism card with a gradient border glow behind it.

---

## What Needs to Change — The Redesign Scope

### 1. Visual Upgrade — Make It Feel Premium & Alive

The current form is functional but feels **flat and generic**. The redesign must feel like entering a **high-stakes sports intelligence terminal** — think Bloomberg Terminal meets Nike SNKRS meets a cricket war room.

**Specific visual improvements required:**

#### A. Add a Split-Screen / Two-Panel Layout (Desktop)
- **Left panel** (~40% width on `md+`): Brand identity area
  - Large SelectXI AI logo + wordmark
  - Tagline: *"Your edge starts at login."*
  - Show a **live animated stat ticker** — scrolling marquee of 4–6 mock stats (e.g. `IND vs AUS · Win Prob 73.4% ↑`, `Kohli Form Index 9.8`, `Bumrah Pitch Rating 9.9`, `Fantasy Pts Pool 12,480`)
  - Cricket-themed decorative element — use **SVG cricket wickets or a subtle field outline** as a background motif, or animated line art
  - Green glow ambient at bottom-left, blue glow at top-right
- **Right panel** (~60% width on `md+`): The actual form card
  - Remove the outer gradient border trick — replace with a clean **1px border + heavy box shadow** in pitch green at 20% opacity
  - On mobile: stacked, left panel collapses to just logo + tagline badge

#### B. Redesign the Mode Switcher
- Replace the current `grid-cols-2` pill tabs with a **segmented control** that has a crisp sliding white indicator with `drop-shadow`
- Each tab should show a **small icon** + label: `Sparkles` icon for Sign In, `UserPlus` icon for Create Profile
- Use `framer-motion` `layoutId` for the sliding animation

#### C. Redesign the Portal Switcher
- The Selector vs Fantasy toggle must feel like **switching game modes**
- Each pill should show:
  - An icon (`ClipboardList` for Selector, `Trophy` for Fantasy)
  - Bold label
  - A subtle **background texture difference** when active: selector = pitch-green tint, fantasy = sky-blue tint
- Active state: colored left border (`border-l-2`) + icon glow

#### D. Form Field Polish
- Current rounded-full inputs are fine but need:
  - A subtle **green glow ring on focus** (already partially there, strengthen it)
  - Smooth `height` transition when fields appear/disappear (`AnimatePresence` with `height` animation)
  - **Floating label animation** — labels should animate up and shrink when the field has focus or value (optional if complex, but preferred)
  - Show a **strength indicator bar** under the password field (4 segments, color shifts red → yellow → green)

#### E. CTA Button Enhancement
- Keep the gradient but add:
  - A **shimmer sweep animation** that plays once on mount and on hover (the existing shimmer class is there, make it more visible)
  - **Loading state**: When clicked, show a spinner + "Authenticating..." text using `framer-motion` variants
  - Scale micro-interaction: `whileTap={{ scale: 0.97 }}`

#### F. Background & Atmosphere
- Keep `.grid-bg` but increase opacity to ~40%
- Add **two large ambient orbs** (blurred circles):
  - One `--pitch` colored orb, top-left quadrant, `w-[600px] h-[600px]`, `opacity-[0.12]`, `blur-3xl`
  - One `--sky` colored orb, bottom-right quadrant, same size
- Add a **very subtle scanline overlay** using a CSS `repeating-linear-gradient` at 2px intervals, `opacity-[0.03]` — gives a terminal/CRT feel

---

### 2. Interaction & Animation Upgrades

**Page entry sequence** (stagger all elements, total ~600ms):
1. Left panel slides in from left (`x: -30 → 0`)
2. Right panel card slides up (`y: 20 → 0`)
3. Mode tabs fade in
4. Portal switcher fades in
5. Form header text fades in
6. Form fields stagger in one-by-one (50ms delay each)
7. CTA button scales up from `0.95 → 1`

**Form transition when switching mode or portal:**
- Current: `AnimatePresence` with `opacity + y` ✓ (keep this)
- Add: when new fields appear, they should animate with `height: 0 → auto` + `opacity: 0 → 1` using `motion.div` with layout animations
- The card itself should smoothly resize using `motion.div` with `layout` prop — no jarring height jump

**Error state:**
- Add a global error banner slot at the top of the form (hidden by default)
- On submit failure: banner slides down from top of card with shake animation (`x: [-8, 8, -5, 5, 0]`)
- Style: `bg-destructive/10 border border-destructive/30 text-destructive` with `AlertCircle` icon

**Success state:**
- On successful submit: the button turns fully `--pitch` green, shows a `Check` icon, then after 600ms navigate away
- Add a confetti/particle burst (even 5–6 small green dots that scatter) — optional but impactful

---

### 3. Accessibility & UX Requirements

- All inputs must have proper `id` + `htmlFor` label associations (current `FormField` component uses `<Label>` without `for`)
- Add `aria-label` to icon-only elements
- Password field: add **show/hide toggle** (eye icon, `Eye` / `EyeOff` from lucide-react)
- Tab order must be logical: portal → mode → fields top-to-bottom → submit
- Focus ring: use `focus-visible:ring-2 focus-visible:ring-[var(--pitch)]/60` everywhere (already mostly there)
- "Reset access key" link: should be a proper `<button>` or `<a>` with keyboard accessibility (already a `<button>`, good)

---

### 4. Mobile Responsiveness

- `< md`: Single column, left panel shows only logo + badge (no ticker, no decorative SVG)
- `md+`: Two-column split layout
- Ensure card padding scales: `p-5` on mobile, `p-8` on desktop
- Ticker/marquee on left panel: hide on mobile
- All touch targets: minimum `44×44px`

---

## File to Modify

**Primary file:** `src/routes/auth.tsx`

**Do NOT change:**
- `src/styles.css` CSS variables (read-only, use existing tokens)
- `src/components/ui/*` (use as-is)
- Any other route files

**You MAY add:**
- New sub-components inside `auth.tsx` (keep them in the same file for simplicity, or split into `src/components/site/AuthForm.tsx` if needed)
- New Framer Motion animation variants
- Inline SVG decorative elements

---

## Technical Constraints

- **Framework**: TanStack Router (`createFileRoute`) — do not change routing setup
- **Animation**: Framer Motion (already installed: `motion`, `AnimatePresence`)
- **Styling**: Tailwind CSS v4 utility classes + CSS custom properties from `styles.css`
- **UI Components**: Use existing shadcn components: `Button`, `Input`, `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`
- **Icons**: lucide-react (already imported: `Zap`, `User`, `Mail`, `Lock`, `Building2`, `Trophy`, `ClipboardList`, `ArrowRight`, `ShieldCheck`, `Sparkles` — add more as needed)
- **No new npm packages** unless absolutely necessary

---

## Deliverables

1. **`src/routes/auth.tsx`** — fully redesigned, production-ready
2. **Optional:** `src/components/site/AuthLeftPanel.tsx` — if you split the left panel out
3. **Optional:** `src/components/site/StatTicker.tsx` — the scrolling marquee component
4. A brief **comment block at the top** of the modified file explaining the layout and animation strategy

---

## Reference Aesthetic

Think of the visual language as a blend of:
- **Bloomberg Terminal** — data density, monospace accents, professional dark theme
- **Linear.app auth page** — clean, premium dark glass card with tight typography
- **FIFA Ultimate Team card UI** — sport-specific flair, glowing accents, high contrast
- **Vercel deploy page** — smooth transitions, status-driven UI states

The end result should feel like you are **logging into a real cricket analytics war room**, not a generic SaaS app.

---

## Success Criteria

- [ ] Split-screen layout on `md+`, stacked on mobile
- [ ] Animated stat ticker visible on left panel (desktop only)
- [ ] Mode tabs have smooth sliding indicator with `layoutId`
- [ ] Portal switcher has color-tinted active states
- [ ] Form fields animate in/out with height transitions
- [ ] Password field has show/hide toggle
- [ ] Password strength indicator bar
- [ ] CTA button has shimmer + loading state + success state
- [ ] Page entry uses staggered animation sequence (~600ms total)
- [ ] Card resizes smoothly when form changes height (no jump)
- [ ] Error banner with shake animation
- [ ] All accessibility requirements met
- [ ] Looks consistent with the existing SelectXI dark sports-tech brand
