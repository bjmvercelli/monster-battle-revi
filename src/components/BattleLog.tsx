import React from "react";
import type { BattleRound } from "../types";
import { motion } from "framer-motion";

interface Props {
  rounds: BattleRound[];
}

export const BattleLog: React.FC<Props> = ({ rounds }) => {
  return (
    <div className="space-y-3 mt-4">
      {rounds.map((round, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="p-3 rounded border bg-gray-100 flex flex-col space-y-1"
        >
          <span className="font-bold text-blue-600">
            ⚔️ {round.attacker.name} ataca {round.defender.name}
          </span>
          <span>
            Causa <span className="font-bold">{round.damage}</span> de dano.
            HP restante de {round.defender.name}:{" "}
            <span className="font-bold">{round.defenderHpAfter}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};
