import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { Monster, BattleRound } from "../types";
import { MonsterCard } from "../components/MonsterCard";
import { HPBar } from "../components/HPBar";
import { simulateBattle } from "../utils/battleEngine";
import { monstersMock } from "../mocks/monsters";
import { motion, AnimatePresence } from "framer-motion";

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
          <div className="relative">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              aria-label="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => instanceRef.current?.next()}
              className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              aria-label="Próximo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div ref={sliderRef} className="keen-slider px-8 sm:px-12">
              {monsters.map((champ) => (
                <div
                  key={champ.name}
                  className="keen-slider__slide flex justify-center"
                >
                  <div className="p-4">
                    <MonsterCard
                      monster={champ}
                      isSelected={selected.includes(champ)}
                      onSelect={() => handleSelect(champ)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!battleInProgress && selected.length === 2 && (
          <div className="text-center space-y-2">
            <h2 className="text-xl">
              Pronto para: <strong>{selected[0].name}</strong> vs{" "}
              <strong>{selected[1].name}</strong>
            </h2>
            <button
              onClick={handleBattle}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Iniciar Batalha
            </button>
          </div>
        )}

        {battleInProgress && (
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
        )}

        {battleInProgress && currentRound === battleRounds.length && (
          <div className="text-center mt-8 space-y-2">
            <h2 className="text-2xl font-bold text-green-400">
              🏆 Vencedor:{" "}
              {currentHp[selected[0].name] > 0
                ? selected[0].name
                : selected[1].name}
            </h2>
            <button
              onClick={resetBattle}
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mt-2"
            >
              🔁 Reiniciar Batalha
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
