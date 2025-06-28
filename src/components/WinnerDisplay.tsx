import React from "react";

interface WinnerDisplayProps {
  winner: string;
  onReset: () => void;
}

export const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, onReset }) => (
  <div className="text-center mt-8 space-y-2">
    <h2 className="text-2xl font-bold text-green-400">
      🏆 Vencedor: {winner}
    </h2>
    <button
      onClick={onReset}
      className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mt-2"
    >
      🔁 Reiniciar Batalha
    </button>
  </div>
);
