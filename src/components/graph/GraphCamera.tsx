"use client";

import { Bounds } from "@react-three/drei";
import type { ReactNode } from "react";

interface GraphCameraProps {
  children: ReactNode;
}

export const GraphCamera = ({
  children,
}: GraphCameraProps) => {
  return (
    <Bounds
      fit
      clip
      observe
      margin={1.5}
    >
      {children}
    </Bounds>
  );
};