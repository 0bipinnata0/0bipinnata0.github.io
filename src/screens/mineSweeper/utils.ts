function random(min: number, max: number) {
  const scope = max - min + 1;
  const random = Math.floor(Math.random() * scope);
  return random + min;
}

export function selectTargetIndex(length: number, selectedNums: number) {
  const indexArr = new Array<number>(length).fill(0).map((_, index) => index);
  const result: number[] = [];
  for (let time = 0; time < selectedNums; time++) {
    const randomIndex = random(0, length - 1 - time);
    result.push(indexArr[randomIndex]);
    // exchange
    [indexArr[randomIndex], indexArr[length - time - 1]] = [
      indexArr[length - time - 1],
      indexArr[randomIndex],
    ];
  }
  return result;
}
