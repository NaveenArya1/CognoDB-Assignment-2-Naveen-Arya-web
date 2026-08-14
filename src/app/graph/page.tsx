"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  ChevronDown,
  CircleDot,
  Database,
  GitBranch,
  Layers3,
  Loader2,
  Network,
  RefreshCcw,
  Search,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  useGraph,
  useGraphPath,
} from "@/providers/QueryProvider";

const TechGraph = dynamic(
  () =>
    import("@/components/graph/TechGraph").then(
      (mod) => mod.TechGraph
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[620px] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="relative">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <Network className="absolute inset-0 m-auto h-4 w-4 text-primary" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Building technology graph
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Preparing relationships and connections...
            </p>
          </div>
        </div>
      </div>
    ),
  }
);

type Technology = {
  id: string;
  name: string;
  category?: string;
};

type GraphNode = {
  id?: string;
  type?: string;
  data?: {
    id?: string;
    name?: string;
    category?: string;
  };
};

type GraphData = {
  nodes?: GraphNode[];
  relationships?: unknown[];
};

type PathTechnology = Technology;

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="flex min-w-[110px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">
          {value}
        </p>
        <p className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}

function SelectionBox({
  label,
  value,
  technologies,
  onChange,
  accent,
}: {
  label: string;
  value: string;
  technologies: Technology[];
  onChange: (value: string) => void;
  accent: "primary" | "emerald";
}) {
  const selectedTechnology = technologies.find(
    (technology) => technology.id === value
  );

  const accentClasses =
    accent === "primary"
      ? {
        badge:
          "border-primary/20 bg-primary/10 text-primary",
        dot: "bg-primary",
        focus:
          "focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20",
      }
      : {
        badge:
          "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
        dot: "bg-emerald-400",
        focus:
          "focus-within:border-emerald-400/40 focus-within:ring-1 focus-within:ring-emerald-400/20",
      };

  return (
    <div
      className={`group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 transition ${accentClasses.focus}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${accentClasses.badge}`}
      >
        <span
          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${accentClasses.dot}`}
        />
        {label}
      </div>

      <div className="relative min-w-0 flex-1">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none bg-transparent pr-7 text-sm font-medium text-white outline-none"
        >
          <option value="" className="bg-[#0b0f17] text-white">
            Select {label === "A" ? "starting" : "destination"} technology
          </option>

          {technologies.map((technology) => (
            <option
              key={technology.id}
              value={technology.id}
              className="bg-[#0b0f17] text-white"
            >
              {technology.name}
            </option>
          ))}
        </select>

        {selectedTechnology && (
          <p className="pointer-events-none absolute bottom-0 left-0 translate-y-0.5 text-[10px] text-muted-foreground">
            {selectedTechnology.category || "Technology"}
          </p>
        )}

        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function GraphPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * `from` and `to` are the APPLIED path.
   * `fromValue` and `toValue` are the current selections in the toolbar.
   *
   * This prevents the API from calculating a path every time a dropdown
   * changes. The path is only requested after "Find Path".
   */
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);
  const [technologySearch, setTechnologySearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setFromValue(from);
    setToValue(to);
  }, [from, to]);

  const {
    data: graphData,
    isLoading: isLoadingGraph,
    error: errorGraph,
  } = useGraph();

  const {
    data: pathData,
    isLoading: isLoadingPath,
    error: errorPath,
  } = useGraphPath(from, to);

  const technologies = useMemo<Technology[]>(() => {
    const nodes = (graphData as GraphData | undefined)?.nodes ?? [];

    return nodes
      .filter((node) => node.type === "Technology")
      .map((node) => ({
        id: node.data?.id || node.id || "",
        name: node.data?.name || "Unknown technology",
        category: node.data?.category || "Technology",
      }))
      .filter((technology) => technology.id)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [graphData]);

  const projectsCount = useMemo(() => {
    const nodes = (graphData as GraphData | undefined)?.nodes ?? [];

    return nodes.filter((node) => node.type === "Project").length;
  }, [graphData]);

  const categories = useMemo(() => {
    const values = technologies
      .map((technology) => technology.category || "Technology")
      .filter(Boolean);

    return ["All", ...Array.from(new Set(values)).sort()];
  }, [technologies]);

  const filteredTechnologies = useMemo(() => {
    const query = technologySearch.trim().toLowerCase();

    return technologies.filter((technology) => {
      const matchesSearch =
        !query ||
        technology.name.toLowerCase().includes(query) ||
        technology.id.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        technology.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [
    technologies,
    technologySearch,
    activeCategory,
  ]);

  const selectedFrom = technologies.find(
    (technology) => technology.id === fromValue
  );

  const selectedTo = technologies.find(
    (technology) => technology.id === toValue
  );

  const pathNodes = (pathData?.path ?? []) as PathTechnology[];

  const pathNodeIds = useMemo(() => {
    return new Set(pathNodes.map((node) => node.id));
  }, [pathNodes]);

  const updateAppliedPath = (
    nextFrom: string,
    nextTo: string
  ) => {
    const params = new URLSearchParams();

    if (nextFrom) {
      params.set("from", nextFrom);
    }

    if (nextTo) {
      params.set("to", nextTo);
    }

    const query = params.toString();

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      {
        scroll: false,
      }
    );
  };

  const findPath = () => {
    if (!fromValue || !toValue || fromValue === toValue) {
      return;
    }

    updateAppliedPath(fromValue, toValue);
  };

  const clearPath = () => {
    setFromValue("");
    setToValue("");

    router.replace(pathname, {
      scroll: false,
    });
  };

  const swapPath = () => {
    setFromValue(toValue);
    setToValue(fromValue);

    if (fromValue && toValue) {
      updateAppliedPath(toValue, fromValue);
    }
  };

  const retryGraph = () => {
    window.location.reload();
  };

  const hasDraftChanges =
    fromValue !== from || toValue !== to;

  const canFindPath =
    Boolean(fromValue) &&
    Boolean(toValue) &&
    fromValue !== toValue;

  if (isLoadingGraph) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            <Network className="absolute inset-0 m-auto h-5 w-5 text-primary" />
          </div>

          <div className="text-center">
            <p className="font-medium text-foreground">
              Loading technology ecosystem
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Mapping technologies and relationships...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (errorGraph) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <Network className="h-7 w-7 text-red-400" />
          </div>

          <h2 className="text-xl font-semibold text-foreground">
            Could not load graph
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {errorGraph.message ||
              "Something went wrong while loading the technology graph."}
          </p>

          <Button
            onClick={retryGraph}
            className="mt-6 gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Technology Explorer
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Explore the{" "}
                <span className="text-primary">
                  Technology Ecosystem
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Discover how technologies and projects are
                connected. Select two technologies to reveal the
                shortest route through your ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <StatCard
                icon={CircleDot}
                label="Nodes"
                value={graphData?.nodes?.length ?? 0}
              />

              <StatCard
                icon={GitBranch}
                label="Connections"
                value={
                  graphData?.relationships?.length ?? 0
                }
              />

              <div className="hidden sm:block">
                <StatCard
                  icon={Layers3}
                  label="Technologies"
                  value={technologies.length}
                />
              </div>

              <div className="hidden md:block">
                <StatCard
                  icon={Database}
                  label="Projects"
                  value={projectsCount}
                />
              </div>
            </div>
          </div>
        </motion.header>

        {/* =========================================================
            GRAPH
        ========================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-[#070a10] shadow-2xl"
        >
          {/* Graph background */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />

            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-500/[0.035] blur-[100px]" />

            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/[0.035] blur-[100px]" />
          </div>

          {/* =======================================================
              PATH CONTROLLER
          ======================================================== */}
          <div className="absolute left-3 right-3 top-3 z-30 sm:left-5 sm:right-5 sm:top-5">
            <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#090c12]/90 p-3 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                <SelectionBox
                  label="A"
                  value={fromValue}
                  technologies={technologies}
                  onChange={setFromValue}
                  accent="primary"
                />

                <button
                  type="button"
                  onClick={swapPath}
                  disabled={!fromValue && !toValue}
                  aria-label="Swap technologies"
                  className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 xl:h-10 xl:w-10"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </button>

                <SelectionBox
                  label="B"
                  value={toValue}
                  technologies={technologies}
                  onChange={setToValue}
                  accent="emerald"
                />

                <div className="flex shrink-0 gap-2">
                  <Button
                    disabled={!canFindPath || isLoadingPath}
                    onClick={findPath}
                    className="h-12 flex-1 gap-2 px-5 xl:flex-none"
                  >
                    {isLoadingPath ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}

                    {isLoadingPath
                      ? "Finding..."
                      : "Find Path"}
                  </Button>

                  {(fromValue || toValue) && (
                    <Button
                      variant="ghost"
                      onClick={clearPath}
                      className="h-12 px-4 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                      <span className="ml-1 hidden sm:inline">
                        Clear
                      </span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Validation / status */}
              <div className="mt-2 min-h-4 px-1">
                {fromValue &&
                  toValue &&
                  fromValue === toValue ? (
                  <p className="text-[11px] text-amber-400">
                    Starting and destination technologies must
                    be different.
                  </p>
                ) : hasDraftChanges ? (
                  <p className="text-[11px] text-primary/80">
                    Update ready — click Find Path to calculate
                    the connection.
                  </p>
                ) : from && to && pathData?.found ? (
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <Check className="h-3 w-3" />
                    Path calculated successfully
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground">
                    Choose two technologies to discover their
                    shortest connection.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* =======================================================
              GRAPH CANVAS
          ======================================================== */}
          <div className="relative min-h-full w-full overflow-hidden sm:min-h-[720px]">
            <div className="relative z-10 h-full w-full sm:h-[720px]">
              <TechGraph
                graph={graphData ?? undefined}
                path={pathData?.path || []}
              />
            </div>

            {/* Graph legend */}
            <div className="absolute bottom-4 left-4 z-20 hidden items-center gap-4 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white/70 shadow-xl backdrop-blur-xl sm:flex">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                Technology
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Project
              </div>

              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-white/40" />
                Relationship
              </div>

              {pathData?.found && (
                <div className="flex items-center gap-2 border-l border-white/10 pl-4 text-primary">
                  <Target className="h-3.5 w-3.5" />
                  Shortest path
                </div>
              )}
            </div>

            {/* Path status */}
            {from && to && (
              <div className="absolute bottom-4 right-4 z-20">
                <div
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs shadow-xl backdrop-blur-xl ${isLoadingPath
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : pathData?.found
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                        : "border-amber-400/20 bg-amber-400/10 text-amber-400"
                    }`}
                >
                  {isLoadingPath ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Calculating path...
                    </>
                  ) : pathData?.found ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {pathData.hops}{" "}
                      {pathData.hops === 1 ? "hop" : "hops"}
                    </>
                  ) : (
                    <>
                      <Target className="h-3.5 w-3.5" />
                      No path found
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!from && !to && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
                <div className="mt-20 max-w-sm text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Network className="h-6 w-6" />
                  </div>

                  <h2 className="text-lg font-semibold text-white">
                    Explore the graph
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Choose a starting and destination
                    technology above to highlight their
                    shortest connection.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* =========================================================
            LOWER CONTENT
        ========================================================== */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          {/* =======================================================
              PATH RESULT
          ======================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border/60 bg-card/40 p-5 shadow-sm sm:p-6"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GitBranch className="h-4 w-4" />
                  </div>

                  <h2 className="text-lg font-semibold">
                    {pathData?.found
                      ? "Shortest Path"
                      : "Path Finder"}
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {from && to
                    ? "The shortest connection between your selected technologies."
                    : "Select two technologies above to discover how they are connected."}
                </p>
              </div>

              {pathData?.found && (
                <div className="flex shrink-0 items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2">
                  <Zap className="h-3.5 w-3.5 text-primary" />

                  <span className="text-sm font-semibold text-primary">
                    {pathData.hops}{" "}
                    {pathData.hops === 1
                      ? "hop"
                      : "hops"}
                  </span>
                </div>
              )}
            </div>

            {isLoadingPath ? (
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/30 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Finding shortest path
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Analyzing technology relationships...
                  </p>
                </div>
              </div>
            ) : errorPath ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <X className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-red-400">
                      Unable to calculate path
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-400/70">
                      {errorPath.message ||
                        "An unexpected error occurred."}
                    </p>
                  </div>
                </div>
              </div>
            ) : pathData?.found &&
              pathNodes.length > 0 ? (
              <div>
                {/* Path summary */}
                <div className="mb-5 rounded-xl border border-primary/10 bg-primary/[0.035] p-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="text-muted-foreground">
                      Route:
                    </span>

                    {selectedFrom && (
                      <span className="font-semibold text-primary">
                        {selectedFrom.name}
                      </span>
                    )}

                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />

                    {selectedTo && (
                      <span className="font-semibold text-emerald-400">
                        {selectedTo.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Path nodes */}
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max items-center gap-2">
                    {pathNodes.map(
                      (technology, index) => {
                        const isStart =
                          index === 0;
                        const isEnd =
                          index === pathNodes.length - 1;

                        return (
                          <div
                            key={`${technology.id}-${index}`}
                            className="flex items-center gap-2"
                          >
                            <div
                              className={`group relative min-w-[130px] rounded-xl border px-4 py-3 transition ${isStart
                                  ? "border-primary/30 bg-primary/10"
                                  : isEnd
                                    ? "border-emerald-400/30 bg-emerald-400/10"
                                    : "border-border/60 bg-background/40 hover:border-primary/30"
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${isStart
                                      ? "bg-primary/15 text-primary"
                                      : isEnd
                                        ? "bg-emerald-400/15 text-emerald-400"
                                        : "bg-white/5 text-muted-foreground"
                                    }`}
                                >
                                  <span className="text-[10px] font-bold">
                                    {index + 1}
                                  </span>
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">
                                    {technology.name}
                                  </p>

                                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                                    {technology.category ||
                                      "Technology"}
                                  </p>
                                </div>
                              </div>

                              {isStart && (
                                <span className="mt-2 block text-[9px] font-semibold uppercase tracking-wider text-primary">
                                  Start
                                </span>
                              )}

                              {isEnd && (
                                <span className="mt-2 block text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
                                  Destination
                                </span>
                              )}
                            </div>

                            {index <
                              pathNodes.length - 1 && (
                                <ArrowRight className="h-4 w-4 shrink-0 text-primary/50" />
                              )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            ) : from && to ? (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <Target className="h-5 w-5" />
                </div>

                <p className="text-sm font-medium">
                  No route found
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  These technologies do not have a connected
                  path in the current graph.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/70 bg-background/20 p-8 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-5 w-5" />
                </div>

                <p className="text-sm font-medium">
                  No path selected
                </p>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                  Select two different technologies above,
                  then click Find Path.
                </p>
              </div>
            )}
          </motion.section>

          {/* =======================================================
              TECHNOLOGY EXPLORER
          ======================================================== */}
          <motion.aside
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border/60 bg-card/40 p-5 shadow-sm sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers3 className="h-4 w-4" />
                  </div>

                  <h3 className="font-semibold">
                    Technologies
                  </h3>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {filteredTechnologies.length} of{" "}
                  {technologies.length} available
                </p>
              </div>

              {technologySearch && (
                <button
                  type="button"
                  onClick={() => setTechnologySearch("")}
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                  aria-label="Clear technology search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                value={technologySearch}
                onChange={(event) =>
                  setTechnologySearch(event.target.value)
                }
                placeholder="Search technologies..."
                className="h-10 w-full rounded-xl border border-border/60 bg-background/40 pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
              />
            </div>

            {/* Category filters */}
            {categories.length > 1 && (
              <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
                {categories.map((category) => {
                  const active =
                    activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setActiveCategory(category)
                      }
                      className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition ${active
                          ? "bg-primary/10 text-primary"
                          : "bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                        }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Technology list */}
            <div className="max-h-[390px] space-y-1.5 overflow-y-auto pr-1">
              {filteredTechnologies.length > 0 ? (
                filteredTechnologies.map(
                  (technology) => {
                    const isFrom =
                      technology.id === fromValue;
                    const isTo =
                      technology.id === toValue;
                    const isPathNode =
                      pathNodeIds.has(technology.id);

                    return (
                      <button
                        key={technology.id}
                        type="button"
                        onClick={() => {
                          if (!fromValue) {
                            setFromValue(technology.id);
                          } else if (!toValue) {
                            setToValue(technology.id);
                          } else {
                            setFromValue(technology.id);
                          }
                        }}
                        className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${isPathNode
                            ? "border-primary/30 bg-primary/10"
                            : isFrom
                              ? "border-primary/20 bg-primary/5"
                              : isTo
                                ? "border-emerald-400/20 bg-emerald-400/5"
                                : "border-border/50 bg-background/20 hover:border-primary/20 hover:bg-primary/5"
                          }`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isFrom
                              ? "bg-primary/15 text-primary"
                              : isTo
                                ? "bg-emerald-400/15 text-emerald-400"
                                : "bg-white/[0.04] text-muted-foreground group-hover:text-primary"
                            }`}
                        >
                          {isFrom ? (
                            <span className="text-[10px] font-bold">
                              A
                            </span>
                          ) : isTo ? (
                            <span className="text-[10px] font-bold">
                              B
                            </span>
                          ) : (
                            <CircleDot className="h-3.5 w-3.5" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium">
                              {technology.name}
                            </p>

                            {isPathNode && (
                              <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-primary">
                                Path
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                            {technology.category ||
                              "Technology"}
                          </p>
                        </div>

                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </button>
                    );
                  }
                )
              ) : (
                <div className="rounded-xl border border-dashed border-border/60 p-6 text-center">
                  <Search className="mx-auto h-5 w-5 text-muted-foreground" />

                  <p className="mt-2 text-sm font-medium">
                    No technologies found
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Try another search or category.
                  </p>
                </div>
              )}
            </div>

            {/* Quick action */}
            {fromValue && toValue && (
              <div className="mt-4 border-t border-border/50 pt-4">
                <Button
                  variant="outline"
                  onClick={findPath}
                  disabled={!canFindPath || isLoadingPath}
                  className="h-10 w-full gap-2"
                >
                  <Target className="h-4 w-4" />
                  {isLoadingPath
                    ? "Finding path..."
                    : "Calculate selected path"}
                </Button>
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

export default function GraphPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="relative">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
              <Network className="absolute inset-0 m-auto h-4 w-4 text-primary" />
            </div>

            <span className="text-sm">
              Loading technology graph...
            </span>
          </div>
        </div>
      }
    >
      <GraphPageContent />
    </Suspense>
  );
}