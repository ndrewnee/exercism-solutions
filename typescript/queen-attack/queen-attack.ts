export default class QueenAttack {
  white: number[]
  black: number[]

  constructor(positions: { white: [number, number]; black: [number, number] }) {
    if (positions.white[0] === positions.black[0] && positions.white[1] === positions.black[1]) {
      throw new Error('Queens cannot share the same space')
    }

    this.white = positions.white
    this.black = positions.black
  }

  toString(): string {
    const board: string[] = []

    for (let i = 0; i < 8; i++) {
      const row: string[] = []

      for (let j = 0; j < 8; j++) {
        if (this.white[0] === i && this.white[1] === j) {
          row.push('W')
        } else if (this.black[0] === i && this.black[1] === j) {
          row.push('B')
        } else {
          row.push('_')
        }
      }

      board.push(row.join(' '))
    }

    return board.join('\n') + '\n'
  }

  canAttack(): boolean {
    const row = this.white[0] === this.black[0]
    const col = this.white[1] === this.black[1]
    const diagonal =
      Math.abs(this.white[0] - this.black[0]) === Math.abs(this.white[1] - this.black[1])

    return row || col || diagonal
  }
}
