import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Player } from "./Player/Player";
import { Boundary } from "./Boundary/Boundary";
import { Enemy } from "./Enemy/Enemy";
import GameOver from "./GameOver/GameOver";

interface BoundaryType {
  x: number;
  y: number;
}

export default function App() {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [enemySpeed, setEnemySpeed] = useState<number>(0.05);
  const [boundary, setBoundary] = useState<BoundaryType>({ x: 5, y: 5 });
  const speed = 0.2;

  useEffect(() => {
    const updateBoundary = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const height = 6.5;
      const width = height * aspect;
      setBoundary({ x: width / 2, y: height / 2 });
    };

    updateBoundary();
    window.addEventListener("resize", updateBoundary);
    return () => window.removeEventListener("resize", updateBoundary);
  }, []);

  useEffect(() => {
    const preventArrowKeyScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventArrowKeyScroll);
    return () => window.removeEventListener("keydown", preventArrowKeyScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      setPlayerPos((prev) => {
        let [x, y, z] = prev;

        switch (e.key) {
          case "ArrowUp":
            y = Math.min(y + speed, boundary.y);
            break;
          case "ArrowDown":
            y = Math.max(y - speed, -boundary.y);
            break;
          case "ArrowLeft":
            x = Math.max(x - speed, -boundary.x);
            break;
          case "ArrowRight":
            x = Math.min(x + speed, boundary.x);
            break;
          default:
            break;
        }

        return [x, y, z];
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, boundary]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setScore((prev) => prev + 1);
      if (score % 5 === 0 && score > 0) {
        setEnemySpeed((prev) => prev + 0.05);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, score]);

  const resetGame = () => {
    setPlayerPos([0, 0, 0]);
    setScore(0);
    setEnemySpeed(0.05);
    setGameOver(false);
  };

  if (gameOver) {
    return <GameOver score={score} onRestart={resetGame} />;
  }

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="white" />
        <Boundary boundary={boundary} />
        <Player position={playerPos} />
        <Enemy
          playerPos={playerPos}
          speed={enemySpeed}
          gameOver={gameOver}
          setGameOver={setGameOver}
          boundary={boundary}
        />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          color: "white",
          backgroundColor: "black",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        Score: {score}
      </div>
    </>
  );
}
