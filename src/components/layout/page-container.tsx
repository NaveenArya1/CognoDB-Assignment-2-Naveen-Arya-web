"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] pb-12"
    >
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </motion.div>
  );
};