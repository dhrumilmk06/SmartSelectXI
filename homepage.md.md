# SelectXI AI — Full Stack Project

A full-stack AI-powered cricket lineup intelligence platform.

**Stack:**
- **FrontEnd:** React 19, TypeScript, TailwindCSS v4, Vite 8
- **BackEnd:** Node.js, Express 5, CommonJS, nodemon

---

## 🤖 Antigravity IDE Prompt

> Copy everything below this line and paste it directly into Antigravity IDE.

---

**Project:** SelectXI AI — Cricket Intelligence Platform  
**Stack:** React 19, TypeScript 6, TailwindCSS v4, Vite 8 (FrontEnd) + Node.js, Express 5, CommonJS (BackEnd)  
**Package Manager:** npm (both FrontEnd and BackEnd use `package-lock.json`)

---

### Project Structure

```
├── BackEnd/
│   ├── src/
│   │   ├── controllers/     ← empty, needs implementation
│   │   ├── middleware/      ← empty, needs implementation
│   │   ├── models/          ← empty, needs implementation
│   │   ├── routes/          ← empty, needs implementation
│   │   └── server.js        ← basic Express server (port 3000)
│   ├── nodemon.json
│   └── package.json         ← CommonJS, Express 5, nodemon
│
└── FrontEnd/
    ├── src/
    │   ├── components/      ← empty, needs homepage components
    │   ├── pages/           ← empty, needs pages
    │   ├── App.tsx          ← basic placeholder screen
    │   ├── index.css        ← Tailwind v4 directives
    │   └── main.tsx         ← React 19 entry point
    ├── tailwind.config.js
    ├── vite.config.ts       ← Vite 8 + @vitejs/plugin-react + @tailwindcss/vite
    ├── tsconfig.app.json
    └── package.json         ← ESM, React 19, TailwindCSS v4
```

---

### Important Technical Notes

**TailwindCSS v4 (NOT v3):**
- No `tailwind.config.js` theme extension for custom colors — use CSS variables in `index.css` instead
- Import via `@tailwind base/components/utilities` in CSS, OR use `@import "tailwindcss"` (v4 style)
- The `@tailwindcss/vite` plugin is already configured in `vite.config.ts`
- Do NOT use `tailwind.config.js` for custom design tokens — use `@theme` block in CSS

**Vite 8 + React:**
- Uses `@vitejs/plugin-react` (Oxc-based, no Babel by default)
- Entry: `src/main.tsx` → `src/App.tsx`
- Path aliases are NOT configured yet — add them if needed via `vite.config.ts` + `tsconfig.app.json`

**BackEnd:**
- CommonJS (`"type": "commonjs"`) — use `require()`, not `import`
- Express 5 — note breaking changes from v4 (async error handling, `router.param`, etc.)
- Dev server: `npm run dev` (nodemon watching `src/`)
- Runs on `http://localhost:3000`

**FrontEnd:**
- ESM (`"type": "module"`)
- TypeScript strict mode enabled
- Dev server: `npm run dev` (Vite, default port 5173)

---

### What YOU (the developer) need to do

These require your decisions, credentials, or external accounts:

1. **Environment variables** — Create `.env` files for both FrontEnd and BackEnd (API keys, DB URLs, secrets)
2. **Database** — Choose and connect a database (MongoDB + Mongoose, PostgreSQL + Prisma, or SQLite)
3. **Authentication** — Decide on auth strategy (JWT, sessions, OAuth) and set up secrets
4. **Cricket data API** — Subscribe to a cricket data provider (CricAPI, Cricbuzz API, etc.) and store the API key
5. **CORS config** — Set allowed origins in BackEnd once FrontEnd domain is known
6. **Deployment** — Choose hosting for both (Vercel/Netlify for FrontEnd, Railway/Render/VPS for BackEnd)
7. **Real AI/ML logic** — Implement the actual lineup prediction algorithm once data sources are connected

---

### What Antigravity IDE should do

**Do NOT change:** `vite.config.ts`, `tsconfig.*.json`, `tailwind.config.js`, `package.json` scripts, `nodemon.json`

#### FrontEnd Tasks

##### 1. Global CSS design tokens (index.css)
Add custom design tokens using TailwindCSS v4's `@theme` block — do NOT use `tailwind.config.js`:

```css
@import "tailwindcss";

@theme {
  --color-pitch: #22c55e;
  --color-sky-brand: #38bdf8;
  --color-surface: #0f172a;
  --color-surface-elevated: #1e293b;
  --font-display: "Inter", sans-serif;
}
```

Then implement these utility classes using `@layer utilities`:
- `glass` — glassmorphism card (`backdrop-blur`, semi-transparent bg, border)
- `glass-strong` — stronger variant
- `gradient-pitch` — green gradient background
- `text-gradient` — green gradient text using `bg-clip-text`
- `glow-pitch` — green box-shadow glow
- `grid-bg` — subtle dot/grid background pattern
- `animate-float-slow` — slow floating keyframe animation
- `animate-pulse-glow` — pulsing glow animation

##### 2. Homepage sections (src/components/)
Build these components in TypeScript (`.tsx`). Use Tailwind classes, framer-motion for animations, and lucide-react for icons (both need to be installed first):

| Component | Description |
|---|---|
| `Nav.tsx` | Sticky top nav: logo (Zap icon + "SelectXI AI"), links (Features, Dashboard, Pricing, How It Works), Sign In + Get Started buttons |
| `Hero.tsx` | Headline "Build Winning Cricket Lineups with AI", two CTAs, 4 floating stat cards (Win Probability 73.4%, Player Form 9.2/10, Venue Advantage +12%, Fantasy Points 847 pts) |
| `Metrics.tsx` | Stats bar: 10K+ lineups, 85% accuracy, 500+ matches, 3-5 strategies |
| `Features.tsx` | 8-card grid: AI Playing XI Prediction, Fantasy Team Generator, Opponent & Venue Analysis, Real-Time Analytics, Predictive Performance, Multi-Strategy, Coach Collaboration, Role-Based Access |
| `HowItWorks.tsx` | 3 steps with connecting line: Analyze Match Data → Generate AI Recommendations → Optimize Winning Lineups |
| `Testimonials.tsx` | 3 testimonial cards with user quotes |
| `Pricing.tsx` | 3 tiers: Starter ($0), Pro ($29/mo, highlighted), Enterprise (Custom) |
| `FinalCTA.tsx` | Full-width CTA: "Start Building Smarter Cricket Teams Today" |
| `Footer.tsx` | Simple footer with nav links |

##### 3. Pages (src/pages/)
- `Home.tsx` — assembles all components in order
- `Auth.tsx` — sign in / sign up toggle, use React `useState`, standard HTML form elements styled with Tailwind

##### 4. App.tsx routing
Set up basic client-side routing. Install `react-router-dom` and configure:
- `/` → `Home`
- `/auth` → `Auth`
- `/dashboard` → placeholder protected page (redirect to `/auth` if not logged in)

##### 5. API proxy (vite.config.ts)
Add a dev proxy so FrontEnd calls to `/api/*` forward to the BackEnd:

```typescript
server: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
```

#### BackEnd Tasks

##### 1. server.js — expand the existing file
Add: `express.json()` middleware, CORS middleware (install `cors`), basic health route at `/api/health`

##### 2. src/routes/ — create route files
- `auth.routes.js` — `POST /api/auth/register`, `POST /api/auth/login`
- `lineup.routes.js` — `POST /api/lineup/generate`, `GET /api/lineup/history`

##### 3. src/controllers/ — create controller files
- `auth.controller.js` — register and login logic (placeholder returns with TODO comments)
- `lineup.controller.js` — lineup generation logic (placeholder, returns mock data)

##### 4. src/middleware/
- `auth.middleware.js` — JWT verification middleware (placeholder that checks `Authorization` header)

##### 5. src/models/
- `User.js` — user schema placeholder (fields: email, passwordHash, createdAt)
- `Lineup.js` — lineup schema placeholder (fields: userId, matchId, players, strategy, createdAt)

---

### Install These Packages

**FrontEnd** (run in `/FrontEnd`):
```bash
npm install framer-motion lucide-react react-router-dom
```

**BackEnd** (run in `/BackEnd`):
```bash
npm install cors dotenv
```

---

### Running Locally

**BackEnd:**
```bash
cd BackEnd
npm run dev    # starts nodemon on port 3000
```

**FrontEnd:**
```bash
cd FrontEnd
npm run dev    # starts Vite on port 5173
```

---

### Key Constraints

- **FrontEnd is ESM, BackEnd is CommonJS** — don't mix `import`/`export` syntax between them
- **TailwindCSS v4** — custom colors and tokens go in CSS `@theme {}`, NOT `tailwind.config.js`
- **TypeScript strict mode** — no implicit `any`, all new `.ts`/`.tsx` files must be typed
- **Express 5** — async route handlers don't need try/catch for error propagation; errors bubble up automatically
- **Do NOT change build tooling** — don't replace Vite, don't add Webpack, don't change `tsconfig`
