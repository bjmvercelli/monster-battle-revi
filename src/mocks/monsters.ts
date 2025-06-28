import draven from "../assets/draven.png";
import kayn from "../assets/kayn.png";
import lee from "../assets/lee.png";
import rammus from "../assets/rammus.png";
import yasuo from "../assets/yasuo.png";
import type { Monster } from "../types"; // ou Champion, se quiser renomear depois

export const monstersMock: Monster[] = [
  {
    name: "Draven",
    attack: 18,
    defense: 5,
    speed: 7,
    hp: 60,
    image_url: draven,
  },
  {
    name: "Kayn",
    attack: 15,
    defense: 9,
    speed: 10,
    hp: 68,
    image_url: kayn,
  },
  {
    name: "Lee Sin",
    attack: 14,
    defense: 8,
    speed: 10,
    hp: 65,
    image_url: lee,
  },
  {
    name: "Rammus",
    attack: 8,
    defense: 17,
    speed: 6,
    hp: 85,
    image_url: rammus,
  },
  {
    name: "Yasuo",
    attack: 17,
    defense: 6,
    speed: 11,
    hp: 60,
    image_url: yasuo,
  },
];
