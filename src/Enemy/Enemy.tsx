import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface Props {
  playerPos: [number, number, number];
  speed: number;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  boundary: { x: number; y: number };
}

export const Enemy: React.FC<Props> = ({
  playerPos,
  speed,
  gameOver,
  setGameOver,
  boundary,
}) => {
  const enemyRef = useRef<THREE.Mesh>(null);
  const velocity = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (gameOver) return;

    const enemy = enemyRef.current;
    if (enemy) {
      const dx = playerPos[0] - enemy.position.x;
      const dy = playerPos[1] - enemy.position.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const direction = new THREE.Vector2(dx, dy).normalize();

      velocity.current.x = direction.x * speed;
      velocity.current.y = direction.y * speed;

      enemy.position.x += velocity.current.x * 0.2;
      enemy.position.y += velocity.current.y * 0.2;

      enemy.position.x = Math.min(
        Math.max(enemy.position.x, -boundary.x),
        boundary.x
      );
      enemy.position.y = Math.min(
        Math.max(enemy.position.y, -boundary.y),
        boundary.y
      );

      if (distance < 0.5) {
        setGameOver(true);
      }
    }
  });

  return (
    <mesh ref={enemyRef} position={[5, 0, 0]}>
      <sphereGeometry args={[0.5]} />
      <meshPhongMaterial color="red" />
    </mesh>
  );
};
