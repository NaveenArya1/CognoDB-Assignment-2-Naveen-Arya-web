"use client";

import type { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/providers/QueryProvider";

interface ProjectSearchProps {
  onSearch: (searchTerm: string) => void;
}

export const ProjectSearch = ({ onSearch }: ProjectSearchProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data: projects, isLoading, error } = useProjects();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  if (isLoading) {
    return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="animate-pulse rounded bg-border/20 px-4 py-2" />;
  }

  if (error) {
    return <div className="text-red-400">Unable to load project search.</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
      <Input placeholder="Search projects..." value={search} onChange={handleSearch} className="w-full" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Showing {projects?.length || 0} projects</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.delete("search");
            window.history.pushState({}, "", url.toString());
          }}
        >
          Clear Filters
        </Button>
      </div>
    </motion.div>
  );
};