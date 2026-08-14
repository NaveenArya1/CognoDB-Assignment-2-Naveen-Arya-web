"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechnologyCard } from "@/components/technology/TechnologyCard";
import { useTechnologies } from "@/providers/QueryProvider";

function EcosystemPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: technologies, isLoading, error, isServiceUnavailable } = useTechnologies();

  const filteredTechnologies = useMemo<Array<{ id: string; name: string; category: string; description: string }>>(() => {
    return (
      (technologies || []).filter((tech: { id: string; name: string; category: string; description: string }) => {
        const matchesSearch = !search || tech.name.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
      })
    );
  }, [technologies, search]);

  const updateFilters = (nextSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");

    router.replace(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading technologies...</div>
      </div>
    );
  }

  if (isServiceUnavailable) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">������</div>
          <h2 className="mb-2 text-2xl font-bold">Service unavailable</h2>
          <p className="mb-6 text-muted-foreground">Technology data is temporarily unavailable. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <div className="mb-4 text-4xl">���</div>
          <h2 className="mb-2 text-2xl font-bold">Could not load technologies</h2>
          <p className="mb-6 text-muted-foreground">{error.message || "Unexpected error while loading technologies."}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Explore Technology Ecosystems</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Discover how technologies connect and influence each other</p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            value={search}
            onChange={(event) => updateFilters(event.target.value)}
            placeholder="Search technologies..."
            className="w-full rounded-md border border-border bg-background/80 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 sm:max-w-md"
          />

          <Button variant="outline" onClick={() => updateFilters("")} className="sm:w-auto">
            Clear Filters
          </Button>
        </motion.div>

        <div className="min-h-[calc(100vh-200px)]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto pb-8">
            {filteredTechnologies.length === 0 ? (
              <div className="glass col-span-full rounded-xl p-10 text-center text-muted-foreground">No technologies match your current search.</div>
            ) : (
              filteredTechnologies.map((tech: { id: string; name: string; category: string; description: string }) => (
                <Link key={tech.id} href={`/ecosystem/${tech.id}`}>
                  <TechnologyCard id={tech.id} name={tech.name} category={tech.category} description={tech.description} />
                </Link>
              ))
            )}
          </motion.div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          Showing {filteredTechnologies.length} of {technologies?.length || 0} technologies
        </div>
      </div>
    </div>
  );
}

export default function EcosystemPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16"><div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading technologies...</div></div>}>
      <EcosystemPageContent />
    </Suspense>
  );
}