"use client";

import { OrbitControls, useBounds } from "@react-three/drei";

export const GraphControls = () => {
  const bounds = useBounds();

  return (
    <OrbitControls
      makeDefault
      enableZoom
      enablePan
      enableRotate

      /* Smooth movement */
      enableDamping
      dampingFactor={0.08}

      /* Zoom */
      minDistance={5}
      maxDistance={150}
      zoomSpeed={1}

      /* Pan */
      panSpeed={1.2}

      /* Rotation */
      rotateSpeed={0.6}

      /* Prevent camera from going upside down */
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI - 0.2}
    />
  );
};