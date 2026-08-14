"use client";

import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type ApiEnvelope<T> = {
  data: T;
  error?: string;
  isServiceUnavailable?: boolean;
};

type UnwrappedQueryResult<T> = Omit<UseQueryResult<ApiEnvelope<T>, Error>, "data"> & {
  data: T | null;
  error: Error | null;
  isServiceUnavailable: boolean;
};

const unwrapQuery = <T,>(query: UseQueryResult<ApiEnvelope<T>, Error>): UnwrappedQueryResult<T> => {
  return {
    ...query,
    data: query.data?.data ?? null,
    error: query.error ?? (query.data?.error ? new Error(query.data.error) : null),
    isServiceUnavailable: Boolean(query.data?.isServiceUnavailable),
  };
};

// Create a QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Custom hooks for each API function
export const useTechnologies = (): UnwrappedQueryResult<Technology[]> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<Technology[]>>({
      queryKey: ["technologies"],
      queryFn: () => api.getTechnologies(),
    }),
  );
};

export const useTechnology = (id: string): UnwrappedQueryResult<Technology> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<Technology>>({
      queryKey: ["technology", id],
      queryFn: () => api.getTechnology(id),
      enabled: !!id,
    }),
  );
};

export const useRelatedTechnologies = (id: string): UnwrappedQueryResult<Technology[]> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<Technology[]>>({
      queryKey: ["related-technologies", id],
      queryFn: () => api.getRelatedTechnology(id),
      enabled: !!id,
    }),
  );
};

export const useTechnologyProjects = (id: string): UnwrappedQueryResult<Project[]> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<Project[]>>({
      queryKey: ["technology-projects", id],
      queryFn: () => api.getTechnologyProjects(id),
      enabled: !!id,
    }),
  );
};

export const useTechnologyEcosystem = (id: string): UnwrappedQueryResult<TechnologyEcosystemItem[]> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<TechnologyEcosystemItem[]>>({
      queryKey: ["technology-ecosystem", id],
      queryFn: () => api.getTechnologyEcosystem(id),
      enabled: !!id,
    }),
  );
};

export const useProjects = (): UnwrappedQueryResult<Project[]> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<Project[]>>({
      queryKey: ["projects"],
      queryFn: () => api.getProjects(),
    }),
  );
};

export const useProject = (id: string): UnwrappedQueryResult<Project> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<Project>>({
      queryKey: ["project", id],
      queryFn: () => api.getProject(id),
      enabled: !!id,
    }),
  );
};

export const useGraph = (): UnwrappedQueryResult<GraphData> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<GraphData>>({
      queryKey: ["graph"],
      queryFn: () => api.getGraph(),
    }),
  );
};

export const useGraphPath = (from: string, to: string): UnwrappedQueryResult<PathResult> => {
  return unwrapQuery(
    useQuery<ApiEnvelope<PathResult>>({
      queryKey: ["graph-path", from, to],
      queryFn: () => api.getGraphPath(from, to),
      enabled: !!from && !!to,
    }),
  );
};

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
  }>;
  url?: string;
  github?: string;
  createdAt: string;
  updatedAt: string;
}

interface TechnologyEcosystemItem {
  technology: Technology;
  projects: Project[];
}

interface GraphNode {
  id: string;
  type: 'Technology' | 'Project';
  data: {
    id: string;
    name: string;
    category?: string;
    description?: string;
  };
}

interface GraphRelationship {
  source: string;
  target: string;
  type: string;
}

interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

interface PathResult {
  from: string;
  to: string;
  found: boolean;
  hops: number;
  path: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

// Provider component
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};