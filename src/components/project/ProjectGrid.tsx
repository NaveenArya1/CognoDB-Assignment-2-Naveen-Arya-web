import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: Array<{
      id: string;
      name: string;
      category: string;
      description: string;
    }>;
  }>;
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.length === 0 ? (
        <p className="col-span-full py-8 text-center text-muted-foreground">No projects found</p>
      ) : (
        projects.map((project) => (
          <ProjectCard key={project.id} id={project.id} name={project.name} description={project.description} technologies={project.technologies} />
        ))
      )}
    </motion.div>
  );
};