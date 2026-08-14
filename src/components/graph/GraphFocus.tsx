"use client";

import { useThree } from "@react-three/fiber";
import { useBounds } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

interface GraphFocusProps {
    selectedNodeId?: string | null;
    nodes: Array<{
        id: string;
        position: [number, number, number];
    }>;
}

export const GraphFocus = ({
    selectedNodeId,
    nodes,
}: GraphFocusProps) => {
    const bounds = useBounds();
    const { camera } = useThree();

    useEffect(() => {
        if (!selectedNodeId) {
            return;
        }

        const node = nodes.find(
            (item) => item.id === selectedNodeId,
        );

        if (!node) {
            return;
        }

        const target = new THREE.Vector3(
            node.position[0],
            node.position[1],
            node.position[2],
        );

        /**
         * Move camera toward the selected node.
         */
        bounds
            .refresh()
            .clip()
            .fit();

        camera.lookAt(target);
    }, [
        selectedNodeId,
        nodes,
        bounds,
        camera,
    ]);

    return null;
};