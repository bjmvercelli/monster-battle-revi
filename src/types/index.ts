export interface Monster {
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  image_url: string;
}

export interface BattleRound {
  attacker: Monster;
  defender: Monster;
  damage: number;
  defenderHpAfter: number;
}
