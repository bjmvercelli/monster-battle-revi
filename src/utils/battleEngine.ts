import type { Monster, BattleRound } from "../types";

export const simulateBattle = (m1: Monster, m2: Monster): BattleRound[] => {
  const rounds: BattleRound[] = [];
  const firstSelectedMonster = { ...m1 };
  const secondSelectedMonster = { ...m2 };

  let attacker = firstSelectedMonster.speed > secondSelectedMonster.speed || (firstSelectedMonster.speed === secondSelectedMonster.speed && firstSelectedMonster.attack >= secondSelectedMonster.attack) ? firstSelectedMonster : secondSelectedMonster;
  let defender = attacker === firstSelectedMonster ? secondSelectedMonster : firstSelectedMonster;

  while (firstSelectedMonster.hp > 0 && secondSelectedMonster.hp > 0) {
    const damage = Math.max(attacker.attack - defender.defense, 1);
    defender.hp = Math.max(defender.hp - damage, 0);
    rounds.push({ attacker, defender, damage, defenderHpAfter: defender.hp });
    [attacker, defender] = [defender, attacker];
  }

  return rounds;
};
