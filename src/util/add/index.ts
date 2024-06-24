// add 1 2 => 3
// add -1 3 => 2

type Add = (left: number, right: number) => number
export const add: Add = (left, right) => left + right
