import React from "react";
import type { Monster } from "../types";

interface Props {
  monster: Monster;
  onSelect?: () => void;
  isSelected?: boolean;
}

export const MonsterCard: React.FC<Props> = ({ monster, onSelect, isSelected }) => {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-lg p-4 cursor-pointer transition transform flex flex-col items-center space-y-2
        ${isSelected ? 'border-green-500 scale-105 shadow-lg' : 'hover:scale-105 hover:shadow-lg'}
      `}
    >
      <img
        src={monster.image_url}
        alt={monster.name}
        className="w-24 h-24 object-cover rounded"
      />
      <h3 className="font-bold text-lg">{monster.name}</h3>
      <div className="text-sm text-gray-300">
        ⚔️ Atk: {monster.attack} | 🛡️ Def: {monster.defense}
        <br />
        ⚡ Speed: {monster.speed} | ❤️ HP: {monster.hp}
      </div>
    </div>
  );
};

