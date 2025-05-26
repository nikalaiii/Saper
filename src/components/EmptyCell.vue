<script>
import { clearArea } from '../functions/crearArea.js';

const { board, cell } = props;
</script>

<template>
     <div
          @click="clearArea(board, rowIndex, cellIndex)"
          class="cell"
          :class="open: cell === null"
        >
        </div>
</template>