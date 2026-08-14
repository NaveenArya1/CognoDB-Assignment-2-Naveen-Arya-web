import Link from "next/link";
import { motion } from "framer-motion";

export default function DocumentationPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive guides and references for using TechPath
          </p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-muted-foreground">
              Welcome to TechPath documentation! This guide will help you understand how to use our platform to
              explore technology relationships and ecosystems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Exploring Technologies</h2>
            <p className="text-muted-foreground">
              The Technologies section allows you to browse, search, and filter through our comprehensive database
              of programming languages, frameworks, and tools.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Use the search bar to find specific technologies</li>
              <li>Filter by category to narrow down results</li>
              <li>Click on any technology card to view detailed information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Understanding Technology Relationships</h2>
            <p className="text-muted-foreground">
              Our interactive 3D graph visualizes how technologies connect and influence each other. Key features
              include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Node selection to highlight connected technologies</li>
              <li>Path finding to discover relationships between technologies</li>
              <li>Hover tooltips for detailed information</li>
              <li>Zoom and pan controls for navigation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Project Exploration</h2>
            <p className="text-muted-foreground">
              Discover real-world projects built with various technologies in our Projects section.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Search projects by name or description</li>
              <li>View technologies used in each project</li>
              <li>Explore project details and external links</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technology Ecosystems</h2>
            <p className="text-muted-foreground">
              Explore the broader context around specific technologies, including related technologies and their
              real-world applications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">API Reference</h2>
            <p className="text-muted-foreground">
              For developers looking to integrate with TechPath programmatically, we provide RESTful API endpoints
              for accessing technology, project, and relationship data.
            </p>
            <p className="text-muted-foreground mt-4">
              Base URL: <code className="bg-background/20 px-2 py-1 rounded">https://api.techpath.example.com</code>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Support and Feedback</h2>
            <p className="text-muted-foreground">
              If you have questions or need assistance, please reach out to our support team:
            </p>
            <p className="font-medium">support@techpath.example.com</p>
            <p className="text-muted-foreground mt-4">
              We also welcome feedback on how we can improve your experience with TechPath.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}