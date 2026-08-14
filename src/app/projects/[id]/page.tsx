"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechnologyCard } from "@/components/technology/TechnologyCard";
import { useProject } from "@/providers/QueryProvider";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProject(String(id || ""));

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">⛔</div>
          <h2 className="mb-2 text-2xl font-bold">Could not load project</h2>
          <p className="mb-6 text-muted-foreground">{error.message || "Unexpected error while loading the project."}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">🔎</div>
          <h2 className="mb-2 text-2xl font-bold">Project not found</h2>
          <p className="mb-6 text-muted-foreground">The project you requested could not be found.</p>
          <Button asChild variant="outline">
            <Link href="/projects">Back to projects</Link>
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
            <Link href="/projects">← Back to projects</Link>
          </Button>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold gradient-text">{project.name}</h1>
          <p className="mt-2 text-muted-foreground">{project.technologies?.length || 0} technologies used</p>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass mb-12 rounded-2xl border border-border/30 p-6">
          <p className="text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="rounded bg-border/20 px-3 py-1 text-xs text-muted-foreground hover:bg-border/30">
                Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="rounded bg-border/20 px-3 py-1 text-xs text-muted-foreground hover:bg-border/30">
                GitHub
              </a>
            )}
          </div>
        </motion.section>

        <section>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 text-center text-3xl font-bold">
            Technologies Used
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.technologies?.map((tech: { id: string; name: string; category: string; description: string }) => (
              <Link key={tech.id} href={`/technologies/${tech.id}`}>
                <TechnologyCard id={tech.id} name={tech.name} category={tech.category} description={tech.description} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
