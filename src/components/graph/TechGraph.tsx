"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { GraphCamera } from "./GraphCamera";
import { GraphControls } from "./GraphControls";
import { GraphEdge } from "./GraphEdge";
import { GraphNode } from "./GraphNode";

interface TechGraphProps {
  graph?: {
    nodes?: Array<{
      id: string;
      type?: string;
      data?: {
        id: string;
        name: string;
        category?: string;
        description?: string;
      };
    }>;
    relationships?: Array<{
      source: string;
      target: string;
      type?: string;
    }>;
  };

  path?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

interface GraphNodeData {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
}

interface GraphEdgeData {
  source: string;
  target: string;
  strength: number;
  pathIndex?: number;
}

export const TechGraph = ({
  graph,
  path = [],
}: TechGraphProps) => {
  const router = useRouter();

  /**
   * Current animated path position.
   *
   * IMPORTANT:
   * This is state instead of useRef because changing a ref
   * does not cause React to render again.
   */
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  /**
   * Build graph data.
   *
   * useMemo keeps the graph stable and prevents unnecessary
   * rebuilding every render.
   */
  const { nodes, edges } = useMemo(() => {
    /**
     * -------------------------------------------------------
     * API GRAPH
     * -------------------------------------------------------
     */
    const graphNodes = (graph?.nodes ?? []).filter(
      (node) => node.type === "Technology",
    );

    const relationships = graph?.relationships ?? [];

    if (graphNodes.length > 0) {
      /**
       * Use a circle around the origin.
       *
       * Keep these coordinates stable.
       * GraphNode and GraphEdge receive the SAME positions.
       */
      const radius = 2.6;

      const generatedNodes: GraphNodeData[] =
        graphNodes.map((item, index) => {
          const angle =
            graphNodes.length > 1
              ? (index / graphNodes.length) *
              Math.PI *
              2
              : 0;

          return {
            id: item.data?.id ?? item.id,
            name: item.data?.name ?? item.id,
            category:
              item.data?.category ?? "Technology",

            position: [
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ],
          };
        });

      const generatedEdges: GraphEdgeData[] =
        relationships
          .map((relationship) => ({
            source: relationship.source,
            target: relationship.target,
            strength: 0.7,
          }))
          .filter((edge) => {
            /**
             * Don't render relationships to nodes
             * that aren't actually in the current graph.
             */
            const sourceExists = generatedNodes.some(
              (node) => node.id === edge.source,
            );

            const targetExists = generatedNodes.some(
              (node) => node.id === edge.target,
            );

            return sourceExists && targetExists;
          });

      return {
        nodes: generatedNodes,
        edges: generatedEdges,
      };
    }

    /**
     * -------------------------------------------------------
     * PATH GRAPH
     * -------------------------------------------------------
     */
    if (path.length === 0) {
      return {
        nodes: [],
        edges: [],
      };
    }

    const radius = 2.5;

    const generatedNodes: GraphNodeData[] =
      path.map((item, index) => {
        /**
         * Spread path nodes around a circle.
         */
        const angle =
          path.length > 1
            ? (index / (path.length - 1)) *
            Math.PI *
            2 -
            Math.PI
            : 0;

        return {
          id: item.id,
          name: item.name,
          category: item.category,

          position: [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0,
          ],
        };
      });

    /**
     * Path edges have an explicit pathIndex.
     *
     * 0 → node0 → node1
     * 1 → node1 → node2
     * 2 → node2 → node3
     */
    const generatedEdges: GraphEdgeData[] =
      path.slice(0, -1).map((item, index) => ({
        source: item.id,
        target: path[index + 1].id,
        strength: 0.8,
        pathIndex: index,
      }));

    return {
      nodes: generatedNodes,
      edges: generatedEdges,
    };
  }, [graph, path]);

  /**
   * IDs belonging to the current path.
   */
  const pathIds = useMemo(
    () => new Set(path.map((item) => item.id)),
    [path],
  );

  /**
   * Animate path highlighting.
   *
   * Node 0
   *   ↓ 400ms
   * Node 1
   *   ↓ 400ms
   * Node 2
   *   ↓ ...
   */
  useEffect(() => {
    if (path.length === 0) {
      setCurrentPathIndex(0);
      return;
    }

    setCurrentPathIndex(0);

    const timer = window.setInterval(() => {
      setCurrentPathIndex((current) => {
        if (current >= path.length - 1) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, 400);

    return () => {
      window.clearInterval(timer);
    };
  }, [path]);

  /**
   * Navigate to technology.
   */
  const handleNodeClick = (nodeId: string) => {
    router.push(`/technologies/${nodeId}`);
  };

  const hasGraph = nodes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl"
    >
      {hasGraph ? (
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.6} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
          />

          <GraphCamera>
            <group renderOrder={10}>
              {/* EDGES */}
              {edges.map((edge, index) => {
                const sourcePathIndex =
                  path.findIndex(
                    (item) => item.id === edge.source,
                  );

                const targetPathIndex =
                  path.findIndex(
                    (item) => item.id === edge.target,
                  );

                const isPathEdge =
                  path.length > 1 &&
                  pathIds.has(edge.source) &&
                  pathIds.has(edge.target) &&
                  Math.abs(
                    sourcePathIndex - targetPathIndex,
                  ) === 1;

                const pathIndex =
                  edge.pathIndex ??
                  (isPathEdge
                    ? Math.min(
                      sourcePathIndex,
                      targetPathIndex,
                    )
                    : undefined);

                return (
                  <GraphEdge
                    key={`${edge.source}-${edge.target}-${index}`}
                    edge={edge}
                    nodes={nodes}
                    isPathEdge={isPathEdge}
                    pathIndex={pathIndex}
                    currentPathIndex={currentPathIndex}
                  />
                );
              })}

              {/* NODES */}
              {nodes.map((node) => {
                const pathIndex = path.findIndex(
                  (item) => item.id === node.id,
                );

                return (
                  <GraphNode
                    key={node.id}
                    node={node}
                    onNodeClick={handleNodeClick}
                    isPathNode={pathIds.has(node.id)}
                    pathIndex={
                      pathIndex >= 0
                        ? pathIndex
                        : undefined
                    }
                    totalPathLength={path.length}
                    currentPathIndex={currentPathIndex}
                  />
                );
              })}
            </group>
          </GraphCamera>

          <GraphControls />
        </Canvas>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center">
            <div
              className="mb-3 text-3xl"
              aria-hidden="true"
            >
              🔎
            </div>

            <p className="text-sm text-muted-foreground">
              No graph data available
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};