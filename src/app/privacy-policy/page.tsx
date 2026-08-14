"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    content: (
      <p>
        Welcome to TechPath. This Privacy Policy explains how information may
        be collected, used, stored, and protected when you access or use the
        TechPath website and related services. By using TechPath, you
        acknowledge the practices described in this policy.
      </p>
    ),
  },
  {
    id: "information-collected",
    number: "02",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We may collect information that you provide directly as well as
          limited information that is generated automatically when you use the
          service.
        </p>

        <h3 className="mt-6 font-semibold text-foreground">
          Information you provide
        </h3>

        <ul>
          <li>Information submitted through contact or feedback forms.</li>
          <li>Information you provide when communicating with us.</li>
          <li>
            Any other information you voluntarily choose to provide through the
            website.
          </li>
        </ul>

        <h3 className="mt-6 font-semibold text-foreground">
          Automatically collected information
        </h3>

        <ul>
          <li>IP address and general device information.</li>
          <li>Browser type and operating system.</li>
          <li>Pages visited and interactions with the website.</li>
          <li>Date, time, and duration of visits.</li>
          <li>Error and diagnostic information.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    number: "03",
    title: "How We Use Information",
    content: (
      <>
        <p>
          Information we collect may be used for the following purposes:
        </p>

        <ul>
          <li>To operate and maintain TechPath.</li>
          <li>To provide requested features and services.</li>
          <li>To respond to questions, feedback, or support requests.</li>
          <li>To improve the performance and usability of the website.</li>
          <li>To identify and resolve technical issues.</li>
          <li>To monitor and protect the security of the service.</li>
          <li>To understand how the service is used and improve its features.</li>
          <li>To comply with applicable legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "technology-data",
    number: "04",
    title: "Technology & Project Data",
    content: (
      <p>
        TechPath provides information about technologies, frameworks,
        programming languages, tools, projects, and relationships between them.
        Much of this information is intended to be publicly accessible and is
        not considered private user information. We may store and process this
        information to provide search, filtering, graph visualization, and
        ecosystem exploration features.
      </p>
    ),
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies & Tracking Technologies",
    content: (
      <>
        <p>
          TechPath may use cookies, local storage, and similar technologies to
          maintain functionality, remember preferences, understand usage
          patterns, and improve the overall experience.
        </p>

        <p className="mt-4">
          You can control or disable cookies through your browser settings.
          Some features of the website may not function correctly if certain
          technologies are disabled.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    number: "06",
    title: "Third-Party Services",
    content: (
      <p>
        TechPath may rely on third-party providers for services such as
        hosting, analytics, infrastructure, authentication, monitoring, or API
        delivery. These providers may process limited information as necessary
        to provide their services. Their use of information is governed by
        their respective privacy policies and terms.
      </p>
    ),
  },
  {
    id: "data-sharing",
    number: "07",
    title: "Information Sharing",
    content: (
      <>
        <p>
          We do not sell personal information as part of the normal operation
          of TechPath.
        </p>

        <p className="mt-4">
          Information may be shared with service providers when reasonably
          necessary to operate the website, provide requested services,
          maintain infrastructure, prevent abuse, or comply with legal
          obligations.
        </p>

        <p className="mt-4">
          We may also disclose information when required by law or when
          reasonably necessary to protect the rights, security, and property of
          TechPath, its users, or others.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    number: "08",
    title: "Data Security",
    content: (
      <p>
        We take reasonable technical and organizational measures to protect
        information against unauthorized access, alteration, disclosure, or
        destruction. However, no internet transmission or electronic storage
        system can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    id: "data-retention",
    number: "09",
    title: "Data Retention",
    content: (
      <p>
        We retain information only for as long as reasonably necessary for the
        purposes described in this policy, including providing services,
        maintaining records, resolving disputes, enforcing agreements, and
        meeting legal or security requirements.
      </p>
    ),
  },
  {
    id: "external-links",
    number: "10",
    title: "External Links",
    content: (
      <p>
        TechPath may provide links to external websites, repositories, or
        services. We are not responsible for the privacy practices, content, or
        security of third-party websites. We recommend reviewing the privacy
        policies of external services before providing them with personal
        information.
      </p>
    ),
  },
  {
    id: "your-rights",
    number: "11",
    title: "Your Privacy Rights",
    content: (
      <p>
        Depending on your location and applicable law, you may have rights
        relating to your personal information, including rights to access,
        correct, delete, or restrict certain processing of your information.
        To make a privacy-related request, contact us using the information
        provided below.
      </p>
    ),
  },
  {
    id: "children",
    number: "12",
    title: "Children's Privacy",
    content: (
      <p>
        TechPath is not intended to knowingly collect personal information from
        children where prohibited by applicable law. If you believe that a
        child has provided personal information to us, please contact us so we
        can take appropriate steps.
      </p>
    ),
  },
  {
    id: "changes",
    number: "13",
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        to our services, technologies, or legal requirements. When changes are
        made, we will update the &quot;Last updated&quot; date displayed on this
        page. Your continued use of TechPath after an updated policy becomes
        effective constitutes acceptance of the revised policy where permitted
        by law.
      </p>
    ),
  },
  {
    id: "contact",
    number: "14",
    title: "Contact Information",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or the handling of your information, please contact us:
        </p>

        <a
          href="mailto:privacy@techpath.example.com"
          className="mt-4 inline-flex font-medium text-primary transition-colors hover:text-primary/80"
        >
          privacy@techpath.example.com
        </a>
      </>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
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

export default function PrivacyPolicyPage() {
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
              Privacy
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              This policy explains what information TechPath may collect, how
              it is used, and the steps we take to protect your privacy.
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

        {/* Policy Content */}
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
            We value your privacy and are committed to handling your
            information responsibly.
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Return to TechPath →
          </Link>
        </div>
      </section>
    </main>
  );
}