# ⚔️ Batalha dos Monstros

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-EF4975?style=for-the-badge&logo=framer&logoColor=white)
![Keen Slider](https://img.shields.io/badge/Keen--Slider-1B1F23?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMjJDNi40OCAyMiAyIDcuNTIgMiAxMkMyIDYuNDggNi40OCAyIDEyIDJzMTAgNC40OCAxMCAxMGMwIDQuNDgtNC40OCAxMC0xMCAxMHptLTYtN2gxMnYtMmgtMTJ2MnptMC00aDEydjJoLTEydi0yem0wIDhoMTJ2LTJoLTEydjJ6Ii8+PC9zdmc+)

Uma aplicação épica de combate entre monstros (campeões) inspirados no universo de League of Legends. Usuários podem selecionar dois campeões e assistir a uma batalha animada com barra de HP e danos visuais.

---

## 🧠 Lógica de Combate Detalhada

A batalha é processada na função `simulateBattle(monster1, monster2)`. Todos os rounds são pré-calculados e armazenados.

### 1. Definição de quem começa

```ts
let attacker = firstSelectedMonster.speed > secondSelectedMonster.speed || (firstSelectedMonster.speed === secondSelectedMonster.speed && firstSelectedMonster.attack >= secondSelectedMonster.attack) ? firstSelectedMonster : secondSelectedMonster;
let defender = attacker === firstSelectedMonster ? secondSelectedMonster : firstSelectedMonster;
```

- O campeão com maior `speed` começa.
- Se empatado, o maior `attack` define o primeiro atacante.

---

### 2. Cálculo de dano

```ts
const damage = Math.max(attacker.attack - defender.defense, 1);
defender.hp = Math.max(defender.hp - damage, 0);
```

- Dano é `attack - defense`, mas nunca menor que 1.
- Atualiza o HP do defensor, subtraindo o `damage` sofrido

---

### 3. Turnos e alternância

```ts
rounds.push({
  attacker,
  defender,
  damage,
  defenderHpAfter: defender.hp
});

[attacker, defender] = [defender, attacker]; // troca
```

- Armazena os dados do turno.
- Em seguida, alterna atacante e defensor.

---

### 4. Loop até fim da batalha

```ts
while (firstSelectedMonster.hp > 0 && secondSelectedMonster.hp > 0) {
  // processo de ataque
}
```

- Continua até um dos dois atingir 0 de HP.

---

## 🛠️ Tecnologias e Bibliotecas

| Lib              | Uso principal                              |
|------------------|--------------------------------------------|
| **React + TS**   | Estrutura da aplicação                     |
| **Tailwind CSS** | Estilização responsiva e customizada       |
| **Framer Motion**| Animações de entrada e dano                |
| **Keen Slider**  | Carrossel de seleção de campeões           |

---

## 📲 Como rodar o projeto

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/batalha-campeoes.git
cd batalha-campeoes

# 2. Instale as dependências
yarn

# 3. Rode o projeto
yarn dev
```

---

## 🧪 Funcionalidades já implementadas

- ✅ Cadastro mockado de campeões
- ✅ Interface interativa e responsiva
- ✅ Visualização dos stats
- ✅ Barra de HP dinâmica
- ✅ Sequência animada de batalha
- ✅ Vencedor exibido ao final da luta
- ✅ Reinício da batalha e seleção de novos campeões

---

## 🔮 Possíveis melhorias futuras

- 💾 **Cadastro dinâmico de campeões** (via formulário)
- 🌐 **Integração com API/backend** para persistência
- 🧠 **Adição de habilidades especiais e status** (ex: stun, crit)
- 🎵 **Efeitos sonoros e música de fundo**
