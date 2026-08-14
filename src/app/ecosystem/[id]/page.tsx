"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechnologyCard } from "@/components/technology/TechnologyCard";
import { useTechnologyEcosystem } from "@/providers/QueryProvider";

export default function TechnologyEcosystemPage() {
  const { id } = useParams();
  const ecosystemId = String(id || "");
  const { data: ecosystem, isLoading, error, isServiceUnavailable } = useTechnologyEcosystem(ecosystemId);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading ecosystem data...</div>
      </div>
    );
  }

  if (isServiceUnavailable) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold">Service unavailable</h2>
          <p className="mb-6 text-muted-foreground">The ecosystem service is temporarily unavailable. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (error || !ecosystem) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⛔</div>
          <h2 className="mb-2 text-2xl font-bold">Could not load ecosystem</h2>
          <p className="mb-6 text-muted-foreground">{error?.message || "This ecosystem is not available yet."}</p>
          <Button asChild variant="outline">
            <Link href="/technologies">Back to technologies</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalProjects = ecosystem.reduce((sum, item) => sum + (item.projects?.length || 0), 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/ecosystem">← Back to ecosystem</Link>
          </Button>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text">Technology Ecosystem</h1>
          <p className="mt-2 text-muted-foreground">Exploring the ecosystem around {ecosystemId}</p>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass rounded-xl border border-border/30 p-6">
            <h3 className="font-semibold">Related</h3>
            <p className="mt-2 text-2xl font-bold">{ecosystem.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Connected technologies</p>
          </div>
          <div className="glass rounded-xl border border-border/30 p-6">
            <h3 className="font-semibold">Projects</h3>
            <p className="mt-2 text-2xl font-bold">{totalProjects}</p>
            <p className="mt-1 text-sm text-muted-foreground">Real-world usage</p>
          </div>
          <div className="glass rounded-xl border border-border/30 p-6">
            <h3 className="font-semibold">Categories</h3>
            <p className="mt-2 text-2xl font-bold">{new Set(ecosystem.map((item) => item.technology.category)).size}</p>
            <p className="mt-1 text-sm text-muted-foreground">Distinct technology groups</p>
          </div>
        </motion.section>

        <section className="mb-12">
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 text-center text-3xl font-bold">
            Related Technologies
          </motion.h2>
          <div className="space-y-6">
            {ecosystem.length ? (
              ecosystem.map((item: { technology: { id: string; name: string; category: string; description: string }; projects: Array<{ id: string; name: string; description: string }> }) => (
                <div key={item.technology.id} className="glass rounded-2xl border border-border/30 p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">{item.technology.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.technology.category}</p>
                    </div>
                    <Link href={`/technologies/${item.technology.id}`} className="text-sm font-medium text-primary hover:underline">
                      View technology →
                    </Link>
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground">{item.technology.description}</p>

                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Projects</p>
                    {item.projects?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {item.projects.map((project) => (
                          <span key={`${item.technology.id}-${project.id}`} className="rounded-full border border-border/50 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                            {project.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No associated projects.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full rounded-xl border border-dashed border-border/50 p-8 text-center text-muted-foreground">No related technologies found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
