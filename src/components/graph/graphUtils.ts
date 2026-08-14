// graphUtils.ts

import * as THREE from "three";

export interface GraphPosition {
    position: [number, number, number];
}

export const getGraphScale = (
    width: number,
    height: number,
) => {
    return Math.min(width, height) / 10;
};

export const getWorldPosition = (
    position: [number, number, number],
    scaleFactor: number,
) => {
    return new THREE.Vector3(
        position[0] * scaleFactor,
        position[1] * scaleFactor,
        position[2] * scaleFactor,
    );
};