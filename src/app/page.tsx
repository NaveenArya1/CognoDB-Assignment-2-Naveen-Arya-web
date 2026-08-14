"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Technologies", value: "1,247+", detail: "Programming languages, frameworks, and tools", accent: "primary" },
  { label: "Relationships", value: "8,932+", detail: "Documented connections between technologies", accent: "secondary" },
  { label: "Projects", value: "3,421+", detail: "Real-world implementations and product teams", accent: "accent" },
  { label: "Industries", value: "156+", detail: "Cross-sector adoption and impact", accent: "muted" },
];

export default function Home() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <section className="relative pb-24 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <motion.h1 initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold tracking-tight md:text-5xl">
                <span className="gradient-text">Explore the Future of Technology</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-xl text-lg text-muted-foreground">
                Discover how technologies connect, evolve, and shape the modern digital landscape through interactive exploration.
              </motion.p>

              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/technologies">Explore Technologies</Link>
                </Button>
                <Button variant="outline" className="border-primary hover:bg-primary/10" asChild>
                  <Link href="/graph">Open Graph</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative flex h-96 items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-2xl" />
              <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl backdrop-blur-sm">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="flex h-16 w-16 items-center justify-center rounded-xl bg-background/70 text-2xl font-bold text-primary">
                  TP
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 text-center text-3xl font-bold">
            Technology Landscape Overview
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.09 }} className="glass rounded-xl border border-border/30 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.accent === "primary" ? "bg-primary/20 text-primary" : stat.accent === "secondary" ? "bg-secondary/20 text-secondary" : stat.accent === "accent" ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"}`}>
                      {stat.label.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-foreground">{stat.value}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

