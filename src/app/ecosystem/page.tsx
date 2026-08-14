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

  const {
    data: technologies,
    isLoading,
    error,
    isServiceUnavailable,
  } = useTechnologies();

  const filteredTechnologies = useMemo<
    Array<{
      id: string;
      name: string;
      category: string;
      description: string;
    }>
  >(() => {
    return (technologies || []).filter(
      (tech: {
        id: string;
        name: string;
        category: string;
        description: string;
      }) => {
        const matchesSearch =
          !search ||
          tech.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesSearch;
      },
    );
  }, [technologies, search]);

  const updateFilters = (nextSearch: string) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (nextSearch) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);
  };

  /* Loading */
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <div className="mx-auto h-6 w-40 animate-pulse rounded-full bg-muted/50" />

            <div className="mx-auto mt-4 h-10 w-80 animate-pulse rounded-lg bg-muted/50" />

            <div className="mx-auto mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-muted/40" />
          </div>

          <div className="mb-8 rounded-2xl border border-border/60 bg-background/60 p-4">
            <div className="h-11 w-full animate-pulse rounded-xl bg-muted/40" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-border/50 bg-muted/10 p-6"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted/50" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/3 rounded bg-muted/50" />
                      <div className="h-3 w-1/3 rounded bg-muted/40" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted/40" />
                    <div className="h-3 w-5/6 rounded bg-muted/40" />
                    <div className="h-3 w-2/3 rounded bg-muted/40" />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  /* Service unavailable */
  if (isServiceUnavailable) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background/70 p-8 text-center shadow-sm backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold">
            Service unavailable
          </h2>

          <p className="mt-2 mb-6 text-sm leading-6 text-muted-foreground">
            Technology data is temporarily unavailable.
            Please try again later.
          </p>

          <Button
            onClick={() => window.location.reload()}
            className="rounded-xl"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background/70 p-8 text-center shadow-sm backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-2xl">
            ⛔
          </div>

          <h2 className="text-2xl font-bold">
            Could not load technologies
          </h2>

          <p className="mt-2 mb-6 text-sm leading-6 text-muted-foreground">
            {error.message ||
              "Unexpected error while loading technologies."}
          </p>

          <Button
            onClick={() => window.location.reload()}
            className="rounded-xl"
          >
            Retry
          </Button>
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
            Technology Ecosystem
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore Technology Ecosystems
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Discover how technologies connect, relate, and
            influence each other.
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
                onChange={(event) =>
                  updateFilters(event.target.value)
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
                  onClick={() => updateFilters("")}
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
              onClick={() => updateFilters("")}
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

          {/* Active filter */}
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

        {/* Technology grid */}
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
                Try changing your search term to find another
                technology ecosystem.
              </p>

              <Button
                variant="outline"
                onClick={() => updateFilters("")}
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
                lg:grid-cols-3
                xl:grid-cols-4
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
                    href={`/ecosystem/${tech.id}`}
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

export default function EcosystemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
          <div className="rounded-2xl border border-border/60 bg-background/70 px-8 py-6 text-sm text-muted-foreground shadow-sm backdrop-blur-xl">
            Loading technologies...
          </div>
        </div>
      }
    >
      <EcosystemPageContent />
    </Suspense>
  );
}