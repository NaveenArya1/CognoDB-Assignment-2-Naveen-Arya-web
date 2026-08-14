"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechnologyCard } from "@/components/technology/TechnologyCard";
import { useTechnology, useRelatedTechnologies, useTechnologyProjects } from "@/providers/QueryProvider";

export default function TechnologyDetailsPage() {
  const { id } = useParams();
  const technologyId = String(id || "");

  const {
    data: technology,
    isLoading: isLoadingTech,
    error: errorTech,
    isServiceUnavailable: isServiceUnavailableTech,
  } = useTechnology(technologyId);

  const {
    data: relatedTechnologies,
    isLoading: isLoadingRelated,
    error: errorRelated,
    isServiceUnavailable: isServiceUnavailableRelated,
  } = useRelatedTechnologies(technologyId);

  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: errorProjects,
    isServiceUnavailable: isServiceUnavailableProjects,
  } = useTechnologyProjects(technologyId);

  if (isLoadingTech || isLoadingRelated || isLoadingProjects) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading technology details...</div>
      </div>
    );
  }

  if (isServiceUnavailableTech || isServiceUnavailableRelated || isServiceUnavailableProjects) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold">Service unavailable</h2>
          <p className="mb-6 text-muted-foreground">The technology service is temporarily unavailable. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (errorTech || errorRelated || errorProjects) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⛔</div>
          <h2 className="mb-2 text-2xl font-bold">Could not load details</h2>
          <p className="mb-6 text-muted-foreground">An error occurred while loading this technology.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">🔎</div>
          <h2 className="mb-2 text-2xl font-bold">Technology not found</h2>
          <p className="mb-6 text-muted-foreground">This technology is not available in the current dataset.</p>
          <Button asChild variant="outline">
            <Link href="/technologies">Back to technologies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/technologies">← Back to technologies</Link>
          </Button>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text">{technology.name}</h1>
          <p className="mt-2 text-muted-foreground">{technology.category}</p>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass mb-12 rounded-2xl border border-border/30 p-6">
          <p className="text-muted-foreground">{technology.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded bg-primary/15 px-3 py-1 text-xs text-primary">{technology.category}</span>
            {technology.website && (
              <a href={technology.website} target="_blank" rel="noreferrer" className="rounded bg-border/20 px-3 py-1 text-xs text-muted-foreground hover:bg-border/30">
                Website
              </a>
            )}
          </div>
        </motion.section>

        <section className="mb-12">
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 text-center text-3xl font-bold">
            Related Technologies
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTechnologies?.length ? (
              relatedTechnologies.map((tech: { id: string; name: string; category: string; description: string }) => (
                <Link key={tech.id} href={`/technologies/${tech.id}`}>
                  <TechnologyCard id={tech.id} name={tech.name} category={tech.category} description={tech.description} />
                </Link>
              ))
            ) : (
              <p className="col-span-full rounded-xl border border-dashed border-border/50 p-8 text-center text-muted-foreground">
                No related technologies found.
              </p>
            )}
          </div>
        </section>

        <section>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6 text-center text-3xl font-bold">
            Projects Using This Technology
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects?.length ? (
              projects.map((project: {
                id: string;
                name: string;
                description: string;
                technologies: Array<{ id: string; name: string; category: string; description: string }>;
              }) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="glass rounded-xl border border-border/30 p-6 transition-all duration-300 hover:border-secondary/40">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                          {project.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary">{project.name}</h3>
                          <p className="text-xs text-muted-foreground">{project.technologies?.length || 0} technologies</p>
                        </div>
                      </div>
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).slice(0, 3).map((tech) => (
                        <span key={`${project.id}-${tech.id}`} className="rounded bg-secondary/15 px-2 py-1 text-[10px] text-secondary">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full rounded-xl border border-dashed border-border/50 p-8 text-center text-muted-foreground">
                No projects found using this technology.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
