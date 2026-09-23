# Knuth Programming Hub

Next.js App Router + TypeScript dashboard preview, following [Plan.md](./Plan.md). Styled with Tailwind CSS, custom design tokens, Lucide icons, and accessible Radix primitives. Geist fonts are bundled locally.

## Run locally

Use Node.js 22 or newer (developed with Node.js 24).

```sh
npm install
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard). The root URL redirects to the dashboard.

## Included

- 248 px left sidebar with grouped navigation and active-page indicators.
- Collapsible 72 px icon rail with tooltips; preference persists locally.
- Mobile navigation drawer with focus management, Escape handling, and close-on-navigation.
- User profile with initials avatar and the user's name in the sidebar and header.
- Editable preview name and avatar color, persisted in local storage.
- Responsive dashboard, sample events and announcements with detail dialogs, featured problem, resource search, and Practice/Tools filters.
- Clear coming-soon pages for planned modules, plus loading, error, empty, and not-found states.

## Preview scope

This implements the first UI phase. `Alex Morgan`, event dates, and announcements are sample data in `src/fixtures/dashboard.ts`. Profile edits affect this browser only. These screens are deliberately public previews, not authenticated member pages. Authentication, sign-out, role checks, live Firestore data, staff management, and integrations are not implemented yet.

`src/lib/firebase/client.ts`, `.env.example`, and deny-by-default Firestore rules prepare the next phase. No Firebase project is required to preview the UI, and no Firebase resources or rules have been deployed. The client module is lazy and is not called by preview pages. Before handling real member data, implement the server session and authorization boundary described in `Plan.md`; Admin SDK access bypasses Firestore rules.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Browser checks use Playwright. On macOS, the test configuration can use installed Google Chrome; elsewhere, install Playwright Chromium with `npx playwright install chromium`. An optional `PLAYWRIGHT_EXECUTABLE_PATH` overrides the browser path.

## Main files

- `src/components/layout/dashboard-shell.tsx` — sidebar, header, mobile drawer.
- `src/config/navigation.ts` — navigation groups and routes.
- `src/components/profile-provider.tsx` — preview member and avatar.
- `src/app/globals.css` — visual tokens and responsive layouts.
- `src/components/dashboard/overview.tsx` — dashboard content.

The setup follows the official [Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation), [Tailwind Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [Radix Dialog documentation](https://www.radix-ui.com/primitives/docs/components/dialog). Firebase initialization is prepared using the [Firebase web setup guide](https://firebase.google.com/docs/web/setup).
