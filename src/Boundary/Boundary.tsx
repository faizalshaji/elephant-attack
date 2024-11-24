import React from "react";
import * as THREE from "three";

interface BoundaryProps {
  boundary: { x: number; y: number };
}

export const Boundary: React.FC<BoundaryProps> = ({ boundary }) => {
  return (
    <lineSegments>
      <edgesGeometry
        args={[new THREE.PlaneGeometry(boundary.x * 2, boundary.y * 2)]}
      />
      <lineBasicMaterial color="gray" />
    </lineSegments>
  );
};
