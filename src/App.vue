<script setup>
import { Saper } from "./functions/saper.js";
import { clearArea } from "./functions/clearArea.js";
import { ref, computed, watch } from "vue";

const range = ref("10");
const gameStatus = ref("progress");
const board = ref([]);
const openedCells = ref(new Set());

const totalCells = computed(() => Number(range.value) * Number(range.value));
const bombCount = computed(() => Math.round(Number(range.value) + (Number(range.value / 1.3))));
const openedCount = computed(() => openedCells.value.size);

const changeBoard = () => {
  const game = new Saper(Number(range.value), Number(range.value) === 10 ? 10 : bombCount.value);

  const newBoard = game.start();

  board.value = newBoard;

  openedCells.value.clear();
};

const sounds = [
  "sounds/grass1.ogg",
  "sounds/grass2.ogg",
  "sounds/grass3.ogg",
];

const playRandomSound = () => {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const audio = new Audio(sounds[randomIndex]); // Створюємо аудіо-об'єкт
  audio.play(); // Відтворюємо звук
};

function defineCellType(cellValue) {
  switch (cellValue) {
    case 0:
      return "cell cell__empty";
    case "B":
      return "cell cell__bomb";

    default:
      return `cell cell__${cellValue}`;
  }
}

const handleClickCell = (rowIndex, cellIndex, cell) => {
  if (gameStatus === "lose") {
    return undefined;
  }
  if (cell === 0) {
    clearArea(board.value, rowIndex, cellIndex);
  } else if (cell === "B") {
    gameStatus.value = "lose";
  }
  playRandomSound();
  openedCells.value.add(`${rowIndex} - ${cellIndex}`);
};

const isOpened = (rowIndex, cellIndex, cell) => {
  if (cell === null) {
    return true;
  }
  return openedCells.value.has(`${rowIndex} - ${cellIndex}`);
};

watch(openedCount, (newCount) => {
  const winCondition = totalCells.value - bombCount.value;
  if (newCount === winCondition && gameStatus.value !== 'lose') {
    gameStatus.value = 'win';
  }
});

</script>

<template>
  <header>
    <h1 class="title">Saper</h1>
    <form
      class="form"
      @submit.prevent="() => { changeBoard(), gameStatus = 'progress'}"
    >
      <label for="select">
        <h3>Select Range:</h3>
        <select class="form__select" v-model="range">
          <option value="10">10X10</option>
          <option value="20">20X20</option>
          <option value="30">30X30</option>
        </select>
      </label>
      <button class="form__button" type="submit">Start!</button>
    </form>
  </header>

  <main>
    <h1 v-if="gameStatus === 'lose'">You lose!</h1>
    <h1 v-if="gameStatus === 'win'">You win!</h1>
    <div v-if="board.length > 0" class="game">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="game__row">
        <div
          v-for="(cell, cellIndex) in row"
          @click="gameStatus === 'lose' ? () => {} : handleClickCell(rowIndex, cellIndex, cell)"
          :key="cellIndex"
          class="cell"
          :class="[
            isOpened(rowIndex, cellIndex, cell) ? 'open' : '',
            defineCellType(cell),
          ]"
        >
          <img
            v-if="cell === 'B' && isOpened(rowIndex, cellIndex, cell)"
            src="/bomb.png"
            alt="B"
            class="bomb"
          />
          <p class="cell__value" v-if="cell > 0 && cell !== 'B'">{{ cell }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.game {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

 

  &__row {
    min-width: 100%;
    min-height: 100%;
    display: flex;

    &:hover {
      cursor: url("/cursor.png"), auto;
    }
  }
}

h1,
h3 {
  font-family: "Comic Neue", cursive;
  font-weight: 700;
  font-style: normal;
}

.cell {
  background-image: url("grass.png"); /* закрита клітинка */
  background-position: center;
  background-size: contain;
  border: 2px solid #bfb68f;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: transparent; /* ховаємо цифри */
  transition: 0.2s;
  &:hover {
    cursor: url("/cursor.png"), auto;
  }

  &.open {
    background-image: url("earth.png");
    background-color: #ddd; /* відкрита */
    color: #000; /* показуємо цифри */
  }
}

.form {
  margin-bottom: 80px;
  min-width: 50vw;
  background-color: #bfb68f;
  border: 5px solid white;
  border-radius: 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  &__button {
    height: 60px;
    width: 160px;

    background-color: #50b839;
    border-radius: 15px;
    border: 5px solid white;

    font-size: 30px;
    font-family: "Comic Neue", cursive;
    font-weight: 700;
    font-style: normal;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      cursor: url("/cursor.png"), auto;
    }
  }

  &__select {
    width: 100%;
    border-radius: 10px;
    height: 35px;
    font-family: "Comic Neue", cursive;
    font-weight: 600;
    font-style: normal;

    &:hover {
      cursor: url("/cursor.png"), auto;
    }
  }
}
</style>
