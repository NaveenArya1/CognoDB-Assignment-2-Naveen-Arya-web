const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data: T;
  error?: string;
  isServiceUnavailable?: boolean;
}

class ApiClient {
  private async fetch<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);

      // Handle 503 Service Unavailable specifically
      if (response.status === 503) {
        return {
          // @ts-ignore
          data: null,
          error: "Service temporarily unavailable. Please try again later.",
          isServiceUnavailable: true
        };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        // @ts-ignore
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        isServiceUnavailable: false
      };
    }
  }

  // Get all technologies
  async getTechnologies() {
    return this.fetch<Technology[]>('/technologies');
  }

  // Get a specific technology by ID
  async getTechnology(id: string) {
    return this.fetch<Technology>(`/technologies/${id}`);
  }

  // Get related technologies for a given technology
  async getRelatedTechnology(id: string) {
    return this.fetch<Technology[]>(`/technologies/${id}/related`);
  }

  // Get projects for a specific technology
  async getTechnologyProjects(id: string) {
    return this.fetch<Project[]>(`/technologies/${id}/projects`);
  }

  // Get ecosystem for a specific technology
  async getTechnologyEcosystem(id: string) {
    return this.fetch<TechnologyEcosystemItem[]>(`/technologies/${id}/ecosystem`);
  }

  // Get all projects
  async getProjects() {
    return this.fetch<Project[]>('/projects');
  }

  // Get a specific project by ID
  async getProject(id: string) {
    return this.fetch<Project>(`/projects/${id}`);
  }

  // Get full technology graph from the backend
  async getGraph() {
    return this.fetch<GraphData>('/graph');
  }

  // Get graph path between two technologies
  async getGraphPath(from: string, to: string) {
    return this.fetch<PathResult>(`/graph/path?from=${from}&to=${to}`);
  }
}

// Type definitions based on the expected API responses
export interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
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

export interface TechnologyEcosystemItem {
  technology: Technology;
  projects: Project[];
}

export interface GraphNode {
  id: string;
  type: 'Technology' | 'Project';
  data: {
    id: string;
    name: string;
    category?: string;
    description?: string;
  };
}

export interface GraphRelationship {
  source: string;
  target: string;
  type: string;
}

export interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

export interface PathResult {
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

// Export a singleton instance
export const api = new ApiClient();