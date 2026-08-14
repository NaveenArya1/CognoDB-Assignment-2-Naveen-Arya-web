"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  {
    id: "getting-started",
    number: "01",
    title: "Getting Started",
    description:
      "Get familiar with TechPath and learn how to explore technology relationships, ecosystems, and real-world projects.",
    content: (
      <p>
        TechPath is an interactive technology discovery platform that helps
        developers understand how programming languages, frameworks, libraries,
        and tools are connected.
      </p>
    ),
  },
  {
    id: "technologies",
    number: "02",
    title: "Exploring Technologies",
    description:
      "Browse and discover technologies across different categories.",
    content: (
      <>
        <p>
          The Technologies section provides a searchable collection of
          programming languages, frameworks, libraries, and development tools.
        </p>

        <ul>
          <li>Search for a specific technology by name.</li>
          <li>Filter technologies by category.</li>
          <li>Select a technology to view detailed information.</li>
          <li>Explore related technologies and projects.</li>
        </ul>
      </>
    ),
  },
  {
    id: "relationships",
    number: "03",
    title: "Technology Relationships",
    description:
      "Understand how technologies connect through the interactive graph.",
    content: (
      <>
        <p>
          TechPath uses an interactive 3D graph to visualize relationships
          between technologies. Select nodes and explore how different
          technologies are connected.
        </p>

        <ul>
          <li>Select nodes to highlight connected technologies.</li>
          <li>Find paths between technologies.</li>
          <li>Hover over nodes for additional information.</li>
          <li>Zoom, pan, and navigate around the graph.</li>
        </ul>
      </>
    ),
  },
  {
    id: "projects",
    number: "04",
    title: "Project Exploration",
    description:
      "Discover real-world projects and the technologies behind them.",
    content: (
      <>
        <p>
          Projects demonstrate how technologies are used together in
          real-world applications.
        </p>

        <ul>
          <li>Search projects by name or description.</li>
          <li>View technologies used by each project.</li>
          <li>Explore project details and relationships.</li>
          <li>Follow external project links when available.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ecosystems",
    number: "05",
    title: "Technology Ecosystems",
    description:
      "Explore the broader ecosystem surrounding individual technologies.",
    content: (
      <p>
        Technology ecosystems provide additional context by connecting a
        technology with related tools, frameworks, languages, and real-world
        applications. This makes it easier to understand where a technology
        fits within the broader development landscape.
      </p>
    ),
  },
  {
    id: "api",
    number: "06",
    title: "API Reference",
    description:
      "Integrate TechPath data into your own applications using the REST API.",
    content: (
      <>
        <p>
          Developers can access technology, project, and relationship data
          through the TechPath REST API.
        </p>

        <div className="mt-5 rounded-xl border border-border/60 bg-muted/40 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Base URL
          </p>

          <code className="block overflow-x-auto rounded-lg border border-border/50 bg-background px-4 py-3 text-sm">
            https://api.techpath.example.com
          </code>
        </div>
      </>
    ),
  },
  {
    id: "support",
    number: "07",
    title: "Support & Feedback",
    description:
      "Have a question or suggestion? We'd love to hear from you.",
    content: (
      <>
        <p>
          If you have questions, encounter an issue, or have suggestions for
          improving TechPath, feel free to get in touch.
        </p>

        <a
          href="mailto:support@techpath.example.com"
          className="mt-4 inline-flex font-medium text-primary transition-colors hover:text-primary/80"
        >
          support@techpath.example.com
        </a>
      </>
    ),
  },
];

const navItems = sections.map(({ id, number, title }) => ({
  id,
  number,
  title,
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function DocumentationPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-10 max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              TechPath Documentation
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Learn how TechPath works
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore technologies, discover relationships, understand
              ecosystems, and see how different technologies come together in
              real-world projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {item.number}
                  </span>

                  <span>{item.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Documentation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-w-0 space-y-6"
        >
          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              // variants={itemVariants}
              className="scroll-mt-24 rounded-2xl border border-border/60 bg-card/50 p-6 shadow-sm transition-colors hover:border-border sm:p-8"
            >
              <div className="flex gap-4">
                <div className="hidden shrink-0 font-mono text-sm text-muted-foreground/50 sm:block">
                  {section.number}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {section.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {section.description}
                  </p>

                  <div className="prose prose-sm mt-6 max-w-none text-muted-foreground dark:prose-invert">
                    <div className="space-y-4 leading-7 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:pl-1 [&_li]:marker:text-primary">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>

      {/* Footer CTA */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/60 bg-muted/30 p-6 text-center sm:p-8"
          >
            <h2 className="text-xl font-semibold">
              Ready to explore TechPath?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Start exploring technologies and discover how they connect
              across modern development ecosystems.
            </p>

            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/technologies"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore Technologies
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Explore Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}