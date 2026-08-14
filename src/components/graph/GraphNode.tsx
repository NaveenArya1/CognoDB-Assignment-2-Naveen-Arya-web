"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
  getGraphScale,
  getWorldPosition,
} from "./graphUtils";

interface GraphNodeProps {
  node: {
    id: string;
    name: string;
    category: string;
    position: [number, number, number];
  };

  onNodeClick?: (nodeId: string) => void;
  onNodeHover?: (nodeId: string | null) => void;

  isPathNode?: boolean;
  pathIndex?: number;
  totalPathLength?: number;
  currentPathIndex?: number;
}

interface NodeLabelProps {
  text: string;
  position: [number, number, number];
  color: string;
  scale: number;
}

function NodeLabel({
  text,
  position,
  color,
  scale,
}: NodeLabelProps) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") {
      return null;
    }

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 96;

    const context = canvas.getContext("2d");

    if (!context) {
      return null;
    }

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    context.font = "bold 30px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Text shadow
    context.shadowColor = "rgba(0, 0, 0, 0.9)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 2;

    context.fillStyle = color;

    context.fillText(
      text,
      canvas.width / 2,
      canvas.height / 2,
    );

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    return texture;
  }, [text, color]);

  if (!texture) {
    return null;
  }

  return (
    <sprite
      position={position}
      scale={[
        2.8 * scale,
        0.52 * scale,
        1,
      ]}
    >
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </sprite>
  );
}

export const GraphNode = ({
  node,
  onNodeClick,
  onNodeHover,
  isPathNode = false,
  pathIndex,
  currentPathIndex = 0,
}: GraphNodeProps) => {
  const { size } = useThree();

  /**
   * IMPORTANT:
   * Must be exactly the same calculation used by GraphEdge.
   */
  const scaleFactor = getGraphScale(
    size.width,
    size.height,
  );

  /**
   * IMPORTANT:
   * Node and edge now use the exact same world position.
   */
  const worldPosition = useMemo(() => {
    return getWorldPosition(
      node.position,
      scaleFactor,
    );
  }, [node.position, scaleFactor]);

  /**
   * Path states
   */
  const isActive =
    isPathNode &&
    pathIndex !== undefined &&
    pathIndex < currentPathIndex;

  const isCurrent =
    isPathNode &&
    pathIndex !== undefined &&
    pathIndex === currentPathIndex;

  const isUpcoming =
    isPathNode &&
    pathIndex !== undefined &&
    pathIndex > currentPathIndex &&
    pathIndex <= currentPathIndex + 2;

  /**
   * Keep colors consistent with GraphEdge.
   */
  const color = isActive
    ? "#10b981"
    : isCurrent
      ? "#f59e0b"
      : isUpcoming
        ? "#fbbf24"
        : "#3b82f6";

  /**
   * Node size
   */
  const radius = Math.max(
    0.08,
    0.1 * scaleFactor,
  );

  return (
    <group
      position={worldPosition}
      onClick={(event) => {
        event.stopPropagation();
        onNodeClick?.(node.id);
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onNodeHover?.(node.id);
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onNodeHover?.(null);
      }}
    >
      {/* =========================================
          OUTER GLOW
      ========================================= */}
      {(isPathNode || isCurrent) && (
        <mesh>
          <sphereGeometry
            args={[
              radius * (isCurrent ? 2.4 : 1.8),
              24,
              24,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={isCurrent ? 0.18 : 0.08}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* =========================================
          MAIN NODE
      ========================================= */}
      <mesh>
        <sphereGeometry
          args={[
            radius * (isCurrent ? 1.25 : 1),
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={
            isCurrent
              ? 1.2
              : isPathNode
                ? 0.6
                : 0.25
          }
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* =========================================
          CURRENT NODE RING
      ========================================= */}
      {isCurrent && (
        <mesh>
          <ringGeometry
            args={[
              radius * 1.6,
              radius * 1.85,
              32,
            ]}
          />

          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* =========================================
          TECHNOLOGY NAME
      ========================================= */}
      <NodeLabel
        text={node.name}
        position={[
          0,
          radius * 2.5,
          0,
        ]}
        color="#ffffff"
        scale={scaleFactor}
      />

      {/* =========================================
          CATEGORY
      ========================================= */}
      <NodeLabel
        text={node.category}
        position={[
          0,
          -radius * 2.5,
          0,
        ]}
        color={color}
        scale={scaleFactor * 0.75}
      />
    </group>
  );
};