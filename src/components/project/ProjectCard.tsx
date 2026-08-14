import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  technologies: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
  }>;
}

export const ProjectCard = ({ id, name, description, technologies }: ProjectCardProps) => {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Link href={`/projects/${id}`} className="group block">
        <div className="glass rounded-xl border border-border/30 p-6 transition-all duration-300 hover:border-secondary/40 h-[180px] flex flex-col">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-secondary">{name}</h3>
                <p className="text-xs text-muted-foreground">{technologies.length} technologies</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-secondary/70 hover:text-secondary">
              View
            </Button>
          </div>

          <p className="line-clamp-4 flex-1 text-sm text-muted-foreground">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span key={`${tech.id}-${index}`} className="rounded bg-secondary/15 px-2 py-1 text-[10px] text-secondary">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};