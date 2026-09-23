# Knuth Programming Hub — Project Plan

Date: 23 September 2026  
Status: Phase 1 project and navigation preview implemented. Firebase authentication and live data remain in Phase 2.

## 1. Goal and scope

Build a clean, professional platform for Knuth Programming Hub (KPH), using **Next.js**, **Firebase Authentication**, and **Cloud Firestore**. Start with **`/dashboard` and a persistent left navigation**.

The dashboard should help a member answer three questions quickly: What should I practice today? What is happening in the hub? Where can I find useful resources?

The supplied screenshot is a visual and content reference. It shows Home, Events, Coordinators, Announcements, Connect, Feedback, POD, Leaderboard, Profile, practice websites, and programming tools. The new design should retain this useful structure while improving hierarchy, navigation, spacing, and mobile usability.

### Confirmed requirements

- Next.js frontend and application server.
- Firebase for authentication and database.
- Dashboard at `/dashboard` with navigation on the left.
- Clean, professional UI/UX.
- Original planning deliverable: this document. The first UI implementation is now available in the project.

### Proposed defaults

- Primary audience: students and members of the programming hub.
- Light theme first, with an emerald accent and neutral surfaces.
- Google sign-in for the initial release; other providers can follow.
- Dashboard access requires authentication.
- “POD” is assumed to mean “Problem of the Day.”
- Coordinators curate content; admins manage access.
- Practice happens on external platforms initially; KPH is not an online judge.

These defaults can be revised without blocking the first dashboard design.

## 2. Delivery boundaries

| Milestone | Included | Completion condition |
| --- | --- | --- |
| First design build | Responsive shell, sidebar, header, dashboard sections, realistic local fixtures, loading/empty/error variants | Desktop and mobile dashboard can be reviewed locally without Firebase credentials |
| Functional MVP | Sign-in, session protection, live dashboard data, resource directory, POD details, event and announcement details, own profile | Main dashboard journeys work with persisted data and enforced permissions |
| Community expansion | Coordinator directory, Connect links, feedback, content management screens | Members can use the community features and staff can maintain content |
| Later releases | Leaderboard, verified activity, automated integrations, dark theme | Each feature has an agreed data source and acceptance criteria |

The navigation below is the target information architecture. Show only available destinations in production. In a design preview, label unfinished destinations explicitly; do not ship buttons that silently do nothing.

## 3. Navigation and routes

| Sidebar group | Label | Route | Purpose |
| --- | --- | --- | --- |
| Overview | Dashboard | `/dashboard` | Daily starting point |
| Practice | Problem of the Day | `/dashboard/pod` | Today's problem and archive |
| Practice | Practice Resources | `/dashboard/resources` | Practice websites and programming tools |
| Practice | Leaderboard | `/dashboard/leaderboard` | Rankings, once scoring is defined |
| Community | Events | `/dashboard/events` | Upcoming and past hub events |
| Community | Announcements | `/dashboard/announcements` | Hub updates |
| Community | Coordinators | `/dashboard/coordinators` | Team directory |
| Community | Connect | `/dashboard/connect` | Approved community links |
| Support | Feedback | `/dashboard/feedback` | Submit feedback |
| Staff only | Manage Content | `/dashboard/manage` | Content administration |

Sidebar footer: avatar, member name, Profile link (`/dashboard/profile`), and Sign out. Authentication lives at `/login`. The root route redirects to `/dashboard` for an authenticated user and `/login` otherwise; a public landing page can be planned separately.

### Sidebar behavior

- Desktop: 248 px wide, white surface, subtle right border, full viewport height.
- Brand area: a compact KPH mark with “Knuth Programming Hub” underneath or alongside it. Use a text mark until brand assets are provided.
- Navigation rows: 44 px minimum height, consistent outline icons, 14 px labels.
- Selected item: pale emerald background, dark emerald text, and a visible selection indicator. Use `aria-current="page"`.
- Keep the footer accessible while the navigation scrolls on short screens.
- Collapse control switches to a 72 px icon rail with accessible labels and tooltips; remember this preference locally.
- Tablet: start with the compact rail. Mobile: replace it with a menu button opening a left drawer.

## 4. Dashboard layout

Use a compact header and a content grid. Give the daily problem the strongest emphasis, then events and announcements. Move the full resource catalog to its own page while keeping useful shortcuts on the dashboard.

```text
┌──────────────────────┬─────────────────────────────────────────────────┐
│ KPH                  │ Dashboard                        Member avatar  │
│ Knuth Programming Hub├─────────────────────────────────────────────────┤
│                      │ Welcome back, {firstName}                       │
│ OVERVIEW             │ Your next practice session starts here.         │
│ ● Dashboard          │                                                 │
│                      │ ┌────────────────────────┐ ┌──────────────────┐ │
│ PRACTICE             │ │ Problem of the Day     │ │ Upcoming events  │ │
│   Problem of the Day │ │ Title · difficulty     │ │ Next 3 events    │ │
│   Practice Resources │ │ Topics · platform      │ │ Date · location  │ │
│   Leaderboard*       │ │ [Open problem ↗]       │ │ [View events]    │ │
│                      │ └────────────────────────┘ └──────────────────┘ │
│ COMMUNITY            │ ┌────────────────────────┐ ┌──────────────────┐ │
│   Events             │ │ Practice shortcuts     │ │ Announcements    │ │
│   Announcements      │ │ Compact resource cards │ │ Latest 3 updates │ │
│   Coordinators*      │ │ [Browse resources]     │ │ [View all]       │ │
│   Connect*           │ └────────────────────────┘ └──────────────────┘ │
│                      │ ┌─────────────────────────────────────────────┐ │
│ SUPPORT              │ │ Useful tools: compact links + View all      │ │
│   Feedback*          │ └─────────────────────────────────────────────┘ │
│                      │                                                 │
│ Avatar · Member      │                                                 │
│ Profile · Sign out   │                                                 │
└──────────────────────┴─────────────────────────────────────────────────┘

* Planned destinations; appear as functional modules when delivered.
```

### Content specifications

| Section | Content | Interaction |
| --- | --- | --- |
| Header | Page title; avatar menu; mobile menu button when needed | Profile and sign-out actions |
| Welcome | First name and a short, useful introduction | Keep it compact; avoid a large decorative banner |
| Problem of the Day | Problem title, difficulty, topic tags, source platform, brief context | Primary “Open problem” link; secondary link to POD details/archive |
| Upcoming events | Up to 3 published upcoming events with date, time, format/location | Open event details; “View events” opens the listing |
| Practice shortcuts | Up to 4 featured platforms with small logo, name, and one-line description | Clearly labeled external link; “Browse resources” opens the catalog |
| Announcements | Up to 3 published updates with title, excerpt, date, and optional pinned label | Open announcement details; “View all” opens the listing |
| Useful tools | Up to 3 featured tools with name and purpose | Open tool externally or browse the Tools tab in Resources |

Use the screenshot's resource inventory as a starting point: Codeforces, AtCoder, CodeChef, CSES, HackerRank, HackerEarth, and SPOJ. Review tool links such as StopStalk, CLIST, CodeDrills, CF Predictor, CF Practice Tracker, and CF Visualiser before publishing them. The screenshot alone does not verify their current URLs or availability.

The Resources page will use Practice and Tools tabs, a name/tag filter, and compact cards. Replace generic “Expand” buttons with explicit actions such as “Visit platform” and “View details.” External links should indicate that they open a new tab.

Do not add activity charts, solved counts, streaks, or ranks until reliable data exists. In the first build, fixtures are visibly identified as sample content. Opening an external problem does not count as solving it.

## 5. Visual system

The intended feel is a focused learning workspace: calm, readable, and consistent, with restrained decoration.

| Token | Proposed value |
| --- | --- |
| Page background | `#F8FAFC` |
| Card/sidebar surface | `#FFFFFF` |
| Main text | `#0F172A` |
| Secondary text | `#475569` |
| Borders | `#E2E8F0` |
| Primary action / active text | `#047857` |
| Primary hover | `#065F46` |
| Active navigation background | `#ECFDF5` |
| Typography | Geist Sans or an equivalent readable sans-serif; monospace only for code |
| Type scale | Page title 28–32 px; section title 18–20 px; body 14–16 px; metadata 12–13 px |
| Spacing | 4 px base; 16–24 px card padding; 24 px section gaps; 32 px desktop page padding |
| Corners | 10–12 px cards; 8 px inputs/buttons |
| Elevation | Thin borders and subtle shadows only where needed |

- One filled primary action in the main dashboard area; secondary actions use outline, text, or quiet surfaces.
- Use compact, consistently sized platform logos. Avoid oversized logo tiles and bright decorative gradients.
- Status and difficulty indicators include text, so meaning does not depend on color alone.
- Keep transitions short and respect reduced-motion preferences.
- Dark theme is a later enhancement after the light design is stable.

## 6. Responsive and accessible behavior

- **1200 px and above:** expanded sidebar, 64 px header, content capped near 1440 px; main grid approximately two-thirds/one-third.
- **768–1199 px:** compact sidebar; use two columns only when cards remain readable, otherwise stack them.
- **Below 768 px:** no permanent sidebar; accessible navigation drawer, 16 px page padding, single-column content.
- Mobile content order: welcome, daily problem, upcoming events, announcements, practice shortcuts, tools.
- Verify at 375, 768, 1024, and 1440 px. No page-level horizontal scrolling.
- Provide a skip link, semantic navigation/main landmarks, visible focus states, descriptive link labels, and keyboard access throughout.
- Drawer closes with Escape, traps focus while open, and restores focus to its trigger. Navigation closes it on mobile.
- Check normal text contrast against a 4.5:1 target; do not rely on the proposed palette alone as proof of accessibility.
- Test long names, long announcement titles, 200% zoom, and touch targets of at least 44 px for primary controls.

### Required UI states

- Loading: skeletons matching the final card dimensions.
- Empty: specific messages such as “No problem scheduled for today” or “No upcoming events.”
- Failure: clear inline explanation and retry action; keep unaffected sections usable.
- Authentication expiry: redirect to sign-in with a safe internal return destination.
- Permission denied: explain that the page is restricted and offer a dashboard link.
- Form submission: pending state, field errors, success feedback, and duplicate-submit prevention.

## 7. Application architecture

Use Next.js App Router and TypeScript. Prefer Server Components for reading dashboard data and Client Components for the navigation drawer, filters, menus, and forms. Protect access where data is read or changed, not solely through a layout or redirect. [Next.js authentication guidance](https://nextjs.org/docs/app/guides/authentication)

Proposed UI tooling: [Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes) for design tokens and responsive styling, [shadcn/ui](https://ui.shadcn.com/docs) for customizable UI primitives, and [Lucide React](https://lucide.dev/guide/react) for a consistent icon set. Pin compatible stable versions when scaffolding.

```text
src/
  app/
    (auth)/login/page.tsx
    (platform)/dashboard/
      layout.tsx
      page.tsx
      loading.tsx
      error.tsx
      resources/page.tsx
      pod/page.tsx
      events/page.tsx
      events/[eventId]/page.tsx
      announcements/page.tsx
      announcements/[announcementId]/page.tsx
      profile/page.tsx
    api/auth/session/route.ts
    api/auth/logout/route.ts
  components/
    layout/                 # Sidebar, header, mobile navigation
    dashboard/              # POD, events, resources, announcements
    ui/                     # Buttons, cards, badges, dialogs, skeletons
  lib/
    firebase/client.ts      # Browser authentication only
    firebase/admin.ts       # Server-only Firebase Admin initialization
    auth/                   # Session verification and authorization
    data/                   # Server-only Firestore access
    validation/             # Input schemas and field allowlists
  config/navigation.ts
  fixtures/                 # Development/sample data only
  types/
firestore.rules
firestore.indexes.json
.env.example
```

Keep mock and Firestore data behind the same typed interfaces so the approved layout does not need to be rebuilt during integration. Production must never silently fall back to fixtures after a database error.

### Authentication and authorization

1. Sign in through Firebase Authentication with Google using nonpersistent browser auth state.
2. Send the fresh ID token to a same-origin session endpoint. Verify the token and recent sign-in, enforce CSRF protection, and issue a Firebase session cookie with `HttpOnly`, production `Secure`, and `SameSite=Lax` settings.
3. Clear browser Firebase auth state after the exchange. Use the server session as the application identity; require sign-in again when it expires.
4. Verify the session, including revocation, for protected server operations. Logout clears the cookie; provide revocation for account/session security events.

This follows Firebase's server-session flow. [Firebase session cookies](https://firebase.google.com/docs/auth/admin/manage-cookies)

Use three application roles: `member`, `coordinator`, and `admin`. Keep role assignment server-controlled; never accept a role from signup or profile input. Begin with an admin-created role record and check the current role on privileged requests.

| Role | Permissions |
| --- | --- |
| Member | Read published content; edit own allowed profile fields; later submit own feedback |
| Coordinator | Member capabilities plus manage hub content |
| Admin | Coordinator capabilities plus manage role assignments |

### Database access boundary

All MVP Firestore reads and writes go through the Next.js server using the Admin SDK. Browser Firestore access is denied by default. Admin SDK requests bypass Firestore Security Rules, so the server data layer must enforce sessions, roles, ownership, field validation, and publication status on every operation. Restrict server credentials through IAM and keep them out of browser bundles and source control. [Firestore security guidance](https://firebase.google.com/docs/firestore/security/rules-conditions)

Use request-scoped reuse for session checks and avoid shared caching of private profile data. Return only fields the screen needs. Validate external URLs as approved `https` destinations and render content safely without arbitrary HTML.

## 8. Initial Firestore model

Collection names and fields below are a starting schema, to be finalized alongside each feature.

| Collection/document | Key fields | Access |
| --- | --- | --- |
| `users/{uid}` | displayName, photoURL, optional batch, codingHandles, createdAt, updatedAt | Own profile; whitelist editable fields |
| `userRoles/{uid}` | role, updatedAt, updatedBy | Server reads; admin changes only |
| `resources/{id}` | name, description, url, category, tags, logoPath, featured, sortOrder, published | Members read published items; staff writes |
| `dailyProblems/{YYYY-MM-DD}` | title, problemUrl, platform, difficulty, topics, description, published, updatedAt | Members read published items; staff writes |
| `events/{id}` | title, summary, body, startsAt, endsAt, timezone, location, format, registrationUrl, status | Members read published events; staff writes |
| `announcements/{id}` | title, excerpt, body, pinned, publishedAt, status, authorUid | Members read published announcements; staff writes |
| `coordinators/{id}` — later | displayName, roleTitle, photoPath, approvedLinks, sortOrder, published | Member-visible directory separate from private profiles |
| `communityLinks/{id}` — later | label, url, description, sortOrder, published | Members read published links; staff writes |
| `feedback/{id}` — later | authorUid, category, message, status, createdAt | Author's own submissions and authorized staff only |

- Store timestamps in UTC; use an explicit hub timezone for daily problem selection and event display. Proposed default: `Asia/Kolkata`, to be confirmed.
- Fetch today's POD by deterministic date ID; do not load the archive for the dashboard.
- Bound dashboard queries: 3 upcoming events, 3 announcements, 4 practice resources, 3 tools.
- Define pinned-announcement ordering and required composite indexes with the actual queries. Paginate full listings.
- Seed content in development first. Staff-maintained seed/import scripts can support the functional MVP until management screens are delivered.
- Keep authentication credentials in Firebase Authentication. Never store passwords or expose member email addresses in public directory records.
- Defer leaderboard storage and scoring until the source of verified results and ranking rules are agreed.

## 9. Implementation sequence

### Phase 1 — Dashboard design

- [x] Scaffold Next.js, TypeScript, and UI tooling.
- [x] Establish color, spacing, typography, and component tokens.
- [x] Build the responsive sidebar, header, and shared dashboard layout.
- [x] Build the dashboard cards using clearly marked sample content.
- [x] Implement mobile navigation and available preview interactions.
- [ ] Review visual hierarchy, keyboard behavior, and responsive states.

Deliverable: a polished `/dashboard` preview with reusable components.

### Phase 2 — Authentication and live data

- [ ] Configure development Firebase Authentication and Firestore, with local emulators for testing.
- [ ] Add Google sign-in, session creation, protected data access, and sign-out.
- [ ] Add schema validation, role checks, deny-by-default browser rules, and query indexes.
- [ ] Seed real resource, POD, event, and announcement content.
- [ ] Replace fixtures through the typed data layer.
- [ ] Build resource browsing, POD archive/details, event details, announcement details, and own profile editing.

Deliverable: the functional dashboard MVP.

### Phase 3 — Community and maintenance

- [ ] Add coordinator directory, Connect links, and feedback workflow.
- [ ] Add staff content management and admin role management.
- [ ] Record actor and timestamp for administrative changes.
- [ ] Agree leaderboard rules and verification sources before implementing rankings.

### Phase 4 — Launch preparation

- [ ] Complete lint, type checks, and production build.
- [ ] Test sign-in, session expiry, logout, and dashboard navigation end to end.
- [ ] Verify unauthorized direct requests fail, members cannot elevate roles, and one member cannot read or edit another member's private data.
- [ ] Test direct browser Firestore requests are denied in the emulator, and separately test server authorization because rules do not cover Admin SDK calls.
- [ ] Check empty/error states, accessibility, mobile layout, broken external links, and real content.
- [ ] Configure production environment, auth domains, indexes, secrets, and error reporting.
- [ ] Deploy the chosen host and run a production smoke check.

Firebase App Hosting is a candidate because it supports Next.js. It requires the Blaze plan; settle hosting and billing before provisioning. No paid services or deployment are part of this planning task. [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 10. Acceptance criteria

The first design build is complete when:

- `/dashboard` has a professional, consistent light-theme layout and left navigation.
- The active location, primary action, and section hierarchy are clear at a glance.
- Desktop, tablet, and mobile layouts work without clipped content or horizontal overflow.
- Daily problem, events, announcements, practice shortcuts, and tools have complete sample, loading, empty, and error presentations.
- Every displayed control has a meaningful action or an explicit preview status.
- Keyboard navigation, focus visibility, drawer behavior, and readable contrast are checked.

The functional MVP additionally requires:

- Signed-out users cannot access protected data through pages or direct server requests.
- Members see live, published data and can manage only their own permitted profile fields.
- External platform activity is never presented as verified progress without a real verification source.
- Sample content cannot appear in production accidentally.
- The authorization checks and main member journeys pass the tests described above.

## 11. Decisions to settle during implementation

These do not block the initial dashboard preview:

- Final KPH logo, accent color, and typography preference.
- Whether sign-in is open to everyone, restricted to an institution, or invitation-only.
- Whether email/password authentication is needed in addition to Google.
- Confirm the POD meaning and the hub's timezone.
- Which existing content should migrate, and whether an export is available. No old database access is assumed.
- Who will maintain daily problems, events, and announcements.
- Whether events need internal registration or only external registration links.
- Leaderboard scoring, result verification, and coding-platform integrations.
- Deployment account, domain, region, and hosting budget.

**Implemented preview:** `/dashboard` has grouped left navigation, a collapsible rail, a mobile drawer, and an avatar plus the user's name in the profile area. The sample profile can be edited locally. Resources have working filters; events and announcements open sample details; later modules show explicit coming-soon states. Firebase setup files are present, but authentication and database access are not connected. Root currently redirects to the public dashboard preview, and sign-out is deferred until authentication exists.

**Next action:** review the UI direction, then implement Phase 2 authentication and live data.
