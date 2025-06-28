import React from "react";
import { MonsterCard } from "./MonsterCard";
import type { Monster } from "../types";
import type { KeenSliderInstance } from "keen-slider/react";

interface MonsterSelectionSliderProps {
  monsters: Monster[];
  selected: Monster[];
  onSelect: (monster: Monster) => void;
  sliderRef: React.Ref<HTMLDivElement>;
  instanceRef: React.RefObject<KeenSliderInstance | null>;
}

export const MonsterSelectionSlider: React.FC<MonsterSelectionSliderProps> = ({
  monsters,
  selected,
  onSelect,
  sliderRef,
  instanceRef,
}) => (
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
              onSelect={() => onSelect(champ)}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
