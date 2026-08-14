"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { getGraphScale, getWorldPosition } from "./graphUtils";

interface GraphEdgeProps {
  edge: {
    source: string;
    target: string;
    strength: number;
  };

  nodes: Array<{
    id: string;
    name: string;
    category: string;
    position: [number, number, number];
  }>;

  isPathEdge?: boolean;
  pathIndex?: number;
  currentPathIndex?: number;
}

export const GraphEdge = ({
  edge,
  nodes,
  isPathEdge = false,
  pathIndex,
  currentPathIndex = 0,
}: GraphEdgeProps) => {
  const { size } = useThree();

  const scaleFactor = getGraphScale(
    size.width,
    size.height,
  );

  const sourceNode = nodes.find(
    (node) => node.id === edge.source,
  );

  const targetNode = nodes.find(
    (node) => node.id === edge.target,
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const isActive =
    isPathEdge &&
    pathIndex !== undefined &&
    pathIndex < currentPathIndex;

  const isCurrent =
    isPathEdge &&
    pathIndex !== undefined &&
    pathIndex === currentPathIndex;

  const isUpcoming =
    isPathEdge &&
    pathIndex !== undefined &&
    pathIndex > currentPathIndex &&
    pathIndex <= currentPathIndex + 2;

  const color = isActive
    ? "#10b981"
    : isCurrent
      ? "#f59e0b"
      : isUpcoming
        ? "#fbbf24"
        : "#8b5cf6";

  const opacity = isActive
    ? 0.95
    : isCurrent
      ? 0.95
      : isUpcoming
        ? 0.65
        : Math.max(0.15, edge.strength * 0.6);

  const geometry = useMemo(() => {
    const source = getWorldPosition(
      sourceNode.position,
      scaleFactor,
    );

    const target = getWorldPosition(
      targetNode.position,
      scaleFactor,
    );

    return new THREE.BufferGeometry().setFromPoints([
      source,
      target,
    ]);
  }, [
    sourceNode.position,
    targetNode.position,
    scaleFactor,
  ]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    });
  }, [color, opacity]);

  return (
    <primitive
      object={new THREE.Line(geometry, material)}
    />
  );
};