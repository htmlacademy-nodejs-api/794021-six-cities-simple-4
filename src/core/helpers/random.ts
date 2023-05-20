export function getRandomNumber(min: number, max: number, fractionLength = 0): number {
  const almostEqual = Math.random() * (max - min) + min;
  return +((almostEqual).toFixed(fractionLength));
}


export function getRandomItem<T>(items: T[]): T {
  const randomIndex = getRandomNumber(0, items.length - 1);
  return items[randomIndex];
}


export function getRandomItems<T>(items: T[]): T[] {
  const startIndex = getRandomNumber(0, items.length - 1);
  const endIndex = startIndex + getRandomNumber(startIndex, items.length - 1);
  return items.slice(startIndex, endIndex);
}
