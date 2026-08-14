"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/20 pb-8 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="text-muted-foreground">
            © {new Date().getFullYear()} TechPath. All rights reserved.
          </motion.p>

          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }} className="flex flex-wrap gap-4 text-sm">
            <Link href="/privacy-policy" className="text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted-foreground transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/documentation" className="text-muted-foreground transition-colors hover:text-primary">
              Documentation
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};