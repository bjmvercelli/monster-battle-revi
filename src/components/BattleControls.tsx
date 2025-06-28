import React from "react";

interface BattleControlsProps {
  selected: { name: string }[];
  onBattle: () => void;
}

export const BattleControls: React.FC<BattleControlsProps> = ({ selected, onBattle }) => (
  <div className="text-center space-y-2">
    <h2 className="text-xl">
      Pronto para: <strong>{selected[0].name}</strong> vs {" "}
      <strong>{selected[1].name}</strong>
    </h2>
    <button
      onClick={onBattle}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
    >
      Iniciar Batalha
    </button>
  </div>
);
