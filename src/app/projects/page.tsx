"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project/ProjectCard";
import { useProjects } from "@/providers/QueryProvider";

function ProjectsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: projects, isLoading, error, isServiceUnavailable } = useProjects();

  const filteredProjects =
    projects?.filter(
      (project: { name: string; description: string }) =>
        !search ||
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("search", value);
    else params.delete("search");
    router.replace(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-center text-3xl font-bold">Explore Projects</h1>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass animate-pulse rounded-xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-white/5" />
                    <div className="h-3 w-1/2 rounded bg-white/5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/5" />
                  <div className="h-3 w-5/6 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isServiceUnavailable) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold">Service unavailable</h2>
          <p className="mb-6 text-muted-foreground">Project data is temporarily unavailable. Please try again soon.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⛔</div>
          <h2 className="mb-2 text-2xl font-bold">Could not load projects</h2>
          <p className="mb-6 text-muted-foreground">{error.message || "Unexpected error while loading projects."}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold sm:text-4xl">Explore Projects</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Discover projects built with the technologies shaping modern engineering teams.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-md border border-border bg-background/80 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 sm:max-w-md"
            />
            <Button variant="outline" onClick={() => updateSearch("")} className="sm:w-auto">
              Clear Filters
            </Button>
          </div>
        </motion.div>

        <div className="min-h-[calc(100vh-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 overflow-y-auto pb-8"
          >
            {filteredProjects.length === 0 ? (
              <div className="glass col-span-full rounded-xl p-10 text-center text-muted-foreground">
                No projects match your current search.
              </div>
            ) : (
              filteredProjects.map((project: { id: string; name: string; description: string; technologies?: Array<{ id: string; name: string; category: string; description: string }> }) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    technologies={project.technologies || []}
                  />
                </Link>
              ))
            )}
          </motion.div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects?.length || 0} projects
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16"><div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading projects...</div></div>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
