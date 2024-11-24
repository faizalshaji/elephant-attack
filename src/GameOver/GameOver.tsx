import React from "react";
import Button from "../Button/Button";
import "./GameOver.css";

interface Props {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<Props> = ({ score, onRestart }) => {
  return (
    <div className="game-over">
      <div>Game Over! Score: {score}</div>
      <Button onClick={onRestart}>Play Again</Button>
    </div>
  );
};

export default GameOver;
