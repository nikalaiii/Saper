export function clearArea(board, row, cell) {
  // межі поля
  const rows = board.length;
  const cols = board[0].length;

  // Перевірка виходу за межі або вже очищеної клітинки
  if (
    row < 0 || row >= rows ||
    cell < 0 || cell >= cols ||
    board[row][cell] === null ||
    board[row][cell] === 'B'
  ) {
    return;
  }

  // Якщо клітинка не 0, не очищаємо її
  if (board[row][cell] !== 0) return;

  // Очищення поточної клітинки
  board[row][cell] = null;

  // Рекурсивне очищення 8-ми сусідів
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],         [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ];

  for (const [dx, dy] of directions) {
    clearArea(board, row + dx, cell + dy);
  }
}
