import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HPBar } from "./HPBar";
import type { Monster, BattleRound } from "../types";

interface BattleMonstersDisplayProps {
  selected: Monster[];
  currentHp: Record<string, number>;
  showDamage: BattleRound | null;
}

export const BattleMonstersDisplay: React.FC<BattleMonstersDisplayProps> = ({
  selected,
  currentHp,
  showDamage,
}) => (
  <AnimatePresence>
    <motion.div
      className="flex justify-around items-start gap-8 flex-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {selected.map((m) => (
        <div key={m.name} className="flex flex-col items-center w-40">
          <motion.img
            key={m.name}
            src={m.image_url}
            alt={m.name}
            className="w-32 h-32 object-cover rounded mb-2"
            animate={
              showDamage?.defender.name === m.name
                ? { x: [-5, 5, -5, 5, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.3 }}
          />
          <h3 className="text-lg font-bold mb-1">{m.name}</h3>
          <HPBar current={currentHp[m.name]} total={m.hp} />
          {showDamage?.defender.name === m.name && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-red-500 font-bold text-lg mt-2"
            >
              -{showDamage.damage} HP
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  </AnimatePresence>
);
