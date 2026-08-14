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
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 text-left sm:mb-10"
        >
          <div className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Project Explorer
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore Projects
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Discover projects built with the technologies shaping modern
            engineering teams.
          </p>
        </motion.header>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="
          mb-8
          rounded-2xl
          border
          border-border/60
          bg-background/60
          p-3
          shadow-sm
          backdrop-blur-xl
          sm:p-4
        "
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search input */}
            <div className="relative flex-1 sm:max-w-xl">
              <svg
                className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search projects..."
                className="
                h-11
                w-full
                rounded-xl
                border
                border-border/70
                bg-background/70
                pl-10
                pr-10
                text-sm
                text-foreground
                outline-none
                transition-all
                duration-200
                placeholder:text-muted-foreground/70
                hover:border-border
                hover:bg-background
                focus:border-primary/50
                focus:bg-background
                focus:ring-4
                focus:ring-primary/10
              "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="
                  absolute
                  right-2
                  top-1/2
                  flex
                  h-7
                  w-7
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-muted-foreground
                  transition-colors
                  hover:bg-muted
                  hover:text-foreground
                "
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Clear filters */}
            <Button
              variant="outline"
              onClick={() => updateSearch("")}
              disabled={!search}
              className="
              h-11
              rounded-xl
              border-border/70
              px-5
              transition-all
              duration-200
              hover:bg-muted/60
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              Clear filters
            </Button>
          </div>

          {/* Active search */}
          {search && (
            <div className="mt-3 flex items-center gap-2 px-1 text-xs text-muted-foreground">
              <span>Active filter:</span>

              <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1">
                Search:{" "}
                <strong className="text-foreground">
                  {search}
                </strong>
              </span>
            </div>
          )}
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          {filteredProjects.length === 0 ? (
            <div
              className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-border
              bg-muted/10
              px-6
              py-12
              text-center
            "
            >
              <div
                className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-muted/50
                text-2xl
              "
              >
                🔍
              </div>

              <h3 className="text-lg font-semibold">
                No projects found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Try changing your search term to find the project
                you&apos;re looking for.
              </p>

              <Button
                variant="outline"
                onClick={() => updateSearch("")}
                className="mt-5 rounded-xl"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div
              className="
              grid
              gap-4
              sm:grid-cols-2
              sm:gap-5
              xl:grid-cols-3
              lg:gap-6
            "
            >
              {filteredProjects.map(
                (project: {
                  id: string;
                  name: string;
                  description: string;
                  technologies?: Array<{
                    id: string;
                    name: string;
                    category: string;
                    description: string;
                  }>;
                }) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="
                    group
                    block
                    h-full
                    rounded-2xl
                    outline-none
                    transition-transform
                    duration-200
                    hover:-translate-y-1
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                  "
                  >
                    <ProjectCard
                      id={project.id}
                      name={project.name}
                      description={project.description}
                      technologies={project.technologies || []}
                    />
                  </Link>
                ),
              )}
            </div>
          )}
        </motion.div>

        {/* Result count */}
        <div className="mt-8 flex items-center justify-center">
          <div
            className="
            rounded-full
            border
            border-border/60
            bg-muted/20
            px-4
            py-1.5
            text-xs
            text-muted-foreground
          "
          >
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {projects?.length || 0}
            </span>{" "}
            projects
          </div>
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
