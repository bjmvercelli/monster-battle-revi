import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { Monster, BattleRound } from "../types";
import { simulateBattle } from "../utils/battleEngine";
import { monstersMock } from "../mocks/monsters";
import { motion } from "framer-motion";
import { MonsterSelectionSlider } from "./MonsterSelectionSlider";
import { BattleControls } from "./BattleControls";
import { BattleMonstersDisplay } from "./BattleMonstersDisplay";
import { WinnerDisplay } from "./WinnerDisplay";

export const BattlePage: React.FC = () => {
  const [selected, setSelected] = useState<Monster[]>([]);
  const [battleRounds, setBattleRounds] = useState<BattleRound[]>([]);
  const [currentHp, setCurrentHp] = useState<Record<string, number>>({});
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [showDamage, setShowDamage] = useState<BattleRound | null>(null);
  const [battleInProgress, setBattleInProgress] = useState(false);

  const monsters = monstersMock;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.5, spacing: 12 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    mode: "free-snap",
  });

  const handleSelect = (monster: Monster) => {
    setSelected((prev) => {
      if (prev.includes(monster)) {
        return prev.filter((m) => m !== monster);
      }
      if (prev.length < 2) {
        return [...prev, monster];
      }
      return prev;
    });
  };

  const handleBattle = () => {
    if (selected.length === 2) {
      const rounds = simulateBattle(selected[0], selected[1]);
      setBattleRounds(rounds);
      setCurrentHp({
        [selected[0].name]: selected[0].hp,
        [selected[1].name]: selected[1].hp,
      });
      setCurrentRound(0);
      setShowDamage(null);
      setBattleInProgress(true);
    }
  };

  const resetBattle = () => {
    setSelected([]);
    setBattleRounds([]);
    setCurrentHp({});
    setCurrentRound(0);
    setShowDamage(null);
    setBattleInProgress(false);
  };

  useEffect(() => {
    if (battleInProgress && currentRound < battleRounds.length) {
      const round = battleRounds[currentRound];
      setShowDamage(round);
      setTimeout(() => {
        setCurrentHp((prev) => ({
          ...prev,
          [round.defender.name]: round.defenderHpAfter,
        }));
        setCurrentRound((prev) => prev + 1);
        setShowDamage(null);
      }, 700);
    }
  }, [battleInProgress, currentRound]);

  return (
    <div className="relative min-h-screen text-white font-epic max-w-screen overflow-x-hidden w-full">
      <div className="relative z-10 p-6 space-y-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-epic text-center tracking-wide sm:tracking-widest mb-6 sm:mb-10
  bg-gradient-to-r from-[#bfa534] via-[#d6b651] to-[#ffe680]
  bg-clip-text text-transparent leading-tight"
          initial={{ textShadow: "0 0 8px rgba(255, 223, 100, 0.5)" }}
          animate={{
            textShadow: [
              "0 0 8px rgba(255, 223, 100, 0.5)",
              "0 0 20px rgba(255, 223, 100, 0.8)",
              "0 0 8px rgba(255, 223, 100, 0.5)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          ⚔️ BATALHA DOS MONSTROS
        </motion.h1>

        <p className="text-center text-lg text-gray-300 mb-14">
          Selecione dois monstros para iniciar a batalha!
        </p>

        {!battleInProgress && (
          <MonsterSelectionSlider
            monsters={monsters}
            selected={selected}
            onSelect={handleSelect}
            sliderRef={sliderRef}
            instanceRef={instanceRef}
          />
        )}

        {!battleInProgress && selected.length === 2 && (
          <BattleControls selected={selected} onBattle={handleBattle} />
        )}

        {battleInProgress && (
          <BattleMonstersDisplay
            selected={selected}
            currentHp={currentHp}
            showDamage={showDamage}
          />
        )}

        {battleInProgress && currentRound === battleRounds.length && (
          <WinnerDisplay
            winner={
              currentHp[selected[0].name] > 0
                ? selected[0].name
                : selected[1].name
            }
            onReset={resetBattle}
          />
        )}
      </div>
    </div>
  );
};
