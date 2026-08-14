"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using TechPath, you agree to comply with these Terms of
        Service and all applicable laws and regulations. If you do not agree
        with these terms, please do not use the website or its services.
      </p>
    ),
  },
  {
    id: "use-license",
    number: "02",
    title: "Use License",
    content: (
      <>
        <p>
          TechPath grants you a limited, non-exclusive, non-transferable
          license to access and use the website for personal and
          non-commercial purposes.
        </p>

        <p className="mt-4">
          You may not use the website or its content to:
        </p>

        <ul>
          <li>Modify, reproduce, or redistribute website materials.</li>
          <li>
            Use the materials for unauthorized commercial purposes or public
            display.
          </li>
          <li>
            Attempt to decompile, reverse engineer, or otherwise extract the
            source code of the website.
          </li>
          <li>Remove copyright, trademark, or other proprietary notices.</li>
          <li>
            Copy, mirror, or redistribute the website or its content on another
            server without permission.
          </li>
          <li>
            Use automated systems to scrape or collect data in a way that
            negatively impacts the service.
          </li>
        </ul>

        <p className="mt-4">
          This license automatically terminates if you violate these
          restrictions. TechPath may also terminate or restrict access to the
          service at any time where permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "content",
    number: "03",
    title: "Technology Information",
    content: (
      <p>
        TechPath provides technology information, relationships, project
        information, and other educational content for informational purposes.
        While we aim to keep the information accurate and useful, technology
        changes frequently and we cannot guarantee that all information is
        complete, current, or error-free.
      </p>
    ),
  },
  {
    id: "disclaimer",
    number: "04",
    title: "Disclaimer",
    content: (
      <>
        <p>
          TechPath is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. To the extent permitted by applicable law,
          TechPath makes no warranties, express or implied, regarding the
          availability, accuracy, reliability, or suitability of the website
          or its content.
        </p>

        <p className="mt-4">
          Information provided through TechPath should not be considered
          professional, legal, financial, security, or technical advice.
        </p>
      </>
    ),
  },
  {
    id: "limitations",
    number: "05",
    title: "Limitations of Liability",
    content: (
      <p>
        To the maximum extent permitted by applicable law, TechPath and its
        contributors will not be liable for indirect, incidental, special,
        consequential, or similar damages arising from your use of, or
        inability to use, the website or its content.
      </p>
    ),
  },
  {
    id: "third-party",
    number: "06",
    title: "Third-Party Links",
    content: (
      <p>
        TechPath may contain links to third-party websites, repositories, or
        services. These links are provided for convenience and informational
        purposes. TechPath does not control or necessarily endorse third-party
        websites and is not responsible for their content, availability, or
        practices.
      </p>
    ),
  },
  {
    id: "availability",
    number: "07",
    title: "Service Availability",
    content: (
      <p>
        We may modify, suspend, or discontinue any part of TechPath at any time,
        including features, content, or availability of the service. We do not
        guarantee that the website will always be available, uninterrupted, or
        free from errors.
      </p>
    ),
  },
  {
    id: "modifications",
    number: "08",
    title: "Changes to These Terms",
    content: (
      <p>
        TechPath may update these Terms of Service from time to time. When
        material changes are made, we may update the date shown at the top of
        this page. Your continued use of TechPath after changes become
        effective constitutes acceptance of the updated terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    number: "09",
    title: "Governing Law",
    content: (
      <p>
        These Terms of Service shall be governed by and interpreted in
        accordance with the applicable laws of the jurisdiction in which
        TechPath is operated, without regard to conflict-of-law principles.
        Any disputes will be subject to the applicable courts having
        jurisdiction.
      </p>
    ),
  },
  {
    id: "contact",
    number: "10",
    title: "Contact",
    content: (
      <>
        <p>
          If you have questions about these Terms of Service, please contact
          us.
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
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
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "August 14, 2026";

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
              Legal
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              These terms explain the rules and conditions that apply when you
              access or use TechPath.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        {/* Table of Contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>

            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {section.number}
                  </span>

                  <span>{section.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Terms */}
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
                <span className="hidden shrink-0 pt-1 font-mono text-sm text-muted-foreground/40 sm:block">
                  {section.number}
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {section.title}
                  </h2>

                  <div className="mt-5 text-sm leading-7 text-muted-foreground">
                    <div className="[&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:pl-1 [&_li]:marker:text-primary">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            By continuing to use TechPath, you acknowledge that you have read
            and understood these Terms of Service.
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary/80"
          >
            Return to TechPath →
          </Link>
        </div>
      </section>
    </main>
  );
}