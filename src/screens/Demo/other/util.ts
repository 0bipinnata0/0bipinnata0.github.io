export function clone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj));
}

export function getMap(r: number, c: number): number[][] {
  return new Array(r).fill([1]).map(() => new Array(c).fill(0));
}
