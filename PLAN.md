# Task Plan for wexa-ai-cognodb-assignment-2-web

## TASK 2 — Install Frontend Dependencies
- [x] Install framer-motion
- [x] Install three @react-three/fiber @react-three/drei
- [x] Install @tanstack/react-query
- [x] Install lucide-react
- [x] Run shadcn init
- [x] Add shadcn components: button, card, input, badge, select, dialog

## TASK 3 — Define Frontend Architecture
- [x] Create src/ directory structure: app, components, hooks, lib, types, providers
- [x] Create app subdirectories: page.tsx, technologies, projects, graph, ecosystem
- [x] Create components subdirectories: layout, technology, project, graph, path, ui

## TASK 4 — Create Global Design System
- [x] Define theme: dark background, cyan/blue primary, purple secondary, glassmorphism cards, subtle borders, white/gray text
- [x] Create global styles for background, typography, scrollbar, selection, gradients, glow effects, glass cards
- [x] Define utility concepts: glass, glow, gradient-text, grid-background

## TASK 5 — Build Application Layout
- [x] Create Navbar, Footer, PageContainer
- [x] Navbar: TechPath logo, navigation links (Technologies, Projects, Graph, Ecosystem), Explore Graph button
- [x] Add Framer Motion page transitions

## TASK 6 — Build Landing Page
- [x] Create sections: Hero, Technology Statistics, Featured Technologies, Technology Graph Preview, How TechPath Works, CTA
- [x] Hero: heading, subheading, two buttons (Explore Technologies, Open Graph)
- [x] Add animated background and floating technology elements

## TASK 7 — Create API Client
- [x] Create src/lib/api.ts
- [x] Implement API functions: getTechnologies, getTechnology, getRelatedTechnologies, getTechnologyProjects, getTechnologyEcosystem, getProjects, getProject, getGraphPath
- [x] Use NEXT_PUBLIC_API_URL environment variable

## TASK 8 — Configure TanStack Query
- [x] Create src/providers/QueryProvider.tsx
- [x] Configure QueryClient and QueryClientProvider
- [x] Create custom hooks for each API function

## TASK 9 — Technology Explorer
- [x] Create /technologies page
- [x] UI: search bar, category filters, technology cards in responsive grid
- [x] Features: search, category filter, loading state, empty state, error state

## TASK 10 — Technology Card Animations
- [x] Enhance TechnologyCard with Framer Motion animations on hover: scale, translate, glow, border animation, icon animation

## TASK 11 — Technology Details Page
- [x] Create /technologies/[id] page
- [x] Display technology details, related technologies, projects
- [x] Connect to API endpoints: GET /technologies/:id, /technologies/:id/related, /technologies/:id/projects

## TASK 12 — Project Explorer
- [x] Create /projects page
- [x] Build ProjectCard, ProjectGrid, ProjectSearch components
- [x] Display project details, technologies, view project button

## TASK 13 — Project Details
- [x] Create /projects/[id] page
- [x] Display project details, technologies list, explore technology button that navigates to technology page

## TASK 14 — Build 3D Graph Foundation
- [x] Create components/graph/TechGraph.tsx
- [x] Use Three.js, React Three Fiber, Drei
- [x] Create GraphNode, GraphEdge, GraphCamera, GraphControls components
- [x] Basic scene with 3D nodes, connections, camera controls, zoom, rotation, hover detection

## TASK 15 — Connect 3D Graph to API
- [x] Replace static graph data with API data flow: API → Technologies → Related Technologies → Graph Data → Three.js
- [x] Implement node click to navigate to technology details page
- [x] Implement hover to show technology info and connection count
- [x] Implement node selection to emphasize connected nodes

## TASK 16 — Technology Ecosystem
- [x] Create /ecosystem/[id] page
- [x] Visualize technology ecosystem using GET /technologies/:id/ecosystem
- [x] Display related technologies, projects, relationship levels, interactive nodes

## TASK 17 — Graph Path Finder
- [x] Create /graph page
- [x] UI: Technology Path Finder with dropdowns for "From" and "To", Find Path button
- [x] Call GET /graph/path?from=&to=
- [x] Display path as a sequence of technologies

## TASK 18 — Path Animation
- [x] Animate the discovered path in the 3D graph: animated edges, moving particles, node highlighting, step-by-step reveal

## TASK 19 — Loading / Error / Empty States
- [x] Implement loading states (skeleton cards), error states, empty states for all API screens
- [x] Handle 503 Service Unavailable without breaking UI

## TASK 20 — Responsive Design
- [x] Test on desktop, laptop, tablet, mobile
- [x] Ensure navbar, technology grid, project grid, 3D graph, path finder, technology details are responsive
- [x] Use simplified 3D graph configuration for mobile if necessary

## TASK 21 — Performance Optimization
- [x] Optimize 3D rendering, API requests, images, animations, bundle size
- [x] Use dynamic imports, React.memo, TanStack Query caching, lazy loading
- [x] Dynamically import 3D graph to avoid loading Three.js on every page

## TASK 22 — Final UI Polish
- [x] Add hover effects, page transitions, button animations, card animations, graph glow, background particles, tooltips, badges, animated counters, smooth scrolling, focus states
- [x] Aim for UI feel: Linear + Vercel + GitHub + 3D developer visualization

## TASK 23 — Production Environment
- [x] Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:3000
- [x] For production, set NEXT_PUBLIC_API_URL=https://your-backend-url.com
- [x] Verify CORS on NestJS backend

## TASK 24 — GitHub + Vercel Deployment
- [ ] Push frontend to GitHub repository: techpath-frontend
- [ ] Connect repository to Vercel
- [ ] Configure Vercel: Framework: Next.js, Build: npm run build, Environment: NEXT_PUBLIC_API_URL=https://your-api-url
- [ ] Deploy

## Notes
- Do not commit any changes (as per instructions)
- Do not change project name