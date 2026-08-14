"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechnologyCard } from "@/components/technology/TechnologyCard";
import { useTechnologies } from "@/providers/QueryProvider";

function TechnologiesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: technologies, isLoading, error, isServiceUnavailable } = useTechnologies();

  const filteredTechnologies = useMemo<Array<{ id: string; name: string; category: string; description: string }>>(() => {
    return (
      (technologies || []).filter((tech: { id: string; name: string; category: string; description: string }) => {
        const matchesSearch = !search || tech.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !category || tech.category === category;
        return matchesSearch && matchesCategory;
      })
    );
  }, [technologies, search, category]);

  const categories = [...new Set((technologies || []).map((tech: { category: string }) => tech.category))].sort();

  const updateFilters = (nextSearch: string, nextCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");

    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");

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
          <div className="mb-4 text-4xl">⚠️</div>
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
          <div className="mb-4 text-4xl">⛔</div>
          <h2 className="mb-2 text-2xl font-bold">Could not load technologies</h2>
          <p className="mb-6 text-muted-foreground">{error.message || "Unexpected error while loading technologies."}</p>
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
            Technology Explorer
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore Technologies
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Discover the tools, frameworks, and platforms shaping modern
            product development.
          </p>
        </motion.header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="
          mb-8
          rounded-2xl
          border border-border/60
          bg-background/60
          p-3
          shadow-sm
          backdrop-blur-xl
          sm:p-4
        "
        >
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
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
                onChange={(event) =>
                  updateFilters(event.target.value, category)
                }
                placeholder="Search technologies..."
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
                  onClick={() => updateFilters("", category)}
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

            {/* Category */}
            <div className="relative">
              <svg
                className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                z-10
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
                <path d="M4 6h16" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>

              <select
                value={category}
                onChange={(event) =>
                  updateFilters(search, event.target.value)
                }
                className="
                h-11
                w-full
                appearance-none
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
                hover:border-border
                hover:bg-background
                focus:border-primary/50
                focus:bg-background
                focus:ring-4
                focus:ring-primary/10
                sm:w-[220px]
              "
              >
                <option value="">All categories</option>

                {categories.map((item: string) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <svg
                className="
                pointer-events-none
                absolute
                right-3.5
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            {/* Clear filters */}
            <Button
              variant="outline"
              onClick={() => updateFilters("", "")}
              disabled={!search && !category}
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
              lg:min-w-[130px]
            "
            >
              Clear filters
            </Button>
          </div>

          {/* Active filter information */}
          {(search || category) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs text-muted-foreground">
              <span>Active filters:</span>

              {search && (
                <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1">
                  Search: <strong className="text-foreground">{search}</strong>
                </span>
              )}

              {category && (
                <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1">
                  Category:{" "}
                  <strong className="text-foreground">{category}</strong>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          {filteredTechnologies.length === 0 ? (
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
                No technologies found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Try changing your search term or selecting a different
                category.
              </p>

              <Button
                variant="outline"
                onClick={() => updateFilters("", "")}
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
              lg:grid-cols-3
              xl:grid-cols-4
              sm:gap-5
              lg:gap-6
            "
            >
              {filteredTechnologies.map(
                (tech: {
                  id: string;
                  name: string;
                  category: string;
                  description: string;
                }) => (
                  <Link
                    key={tech.id}
                    href={`/technologies/${tech.id}`}
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
                    <TechnologyCard
                      id={tech.id}
                      name={tech.name}
                      category={tech.category}
                      description={tech.description}
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
              {filteredTechnologies.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {technologies?.length || 0}
            </span>{" "}
            technologies
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TechnologiesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16"><div className="glass rounded-xl p-10 text-center text-muted-foreground">Loading technologies...</div></div>}>
      <TechnologiesPageContent />
    </Suspense>
  );
}
