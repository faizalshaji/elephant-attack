import React from "react";

interface Props {
  position: [number, number, number];
}

export const Player: React.FC<Props> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshPhongMaterial color="blue" />
    </mesh>
  );
};
