import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to TechPath. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website. Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground">
              We may collect personal information from you in a variety of ways, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Information you provide when you fill out forms on our website.</li>
              <li>Information about your computer and internet connection.</li>
              <li>Usage data collected automatically through cookies and similar technologies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect from you or about you for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>To present our website and its contents to you.</li>
              <li>To provide you with information, products, or services that you request.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To improve our website, products, or services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground">
              Our website may use cookies and similar tracking technologies to personalize your experience and improve
              site performance. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this privacy policy at any time. Please review it frequently for changes.
              Continued use of the website after any such modifications constitutes your acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p className="font-medium">privacy@techpath.example.com</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}