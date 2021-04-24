export default class Matrix {
  rows: number[][]
  columns: number[][]

  constructor(input: string) {
    this.rows = input.split('\n').map((line) => line.split(' ').map(parseFloat))
    this.columns = this.rows.map((_, i) => this.rows.map((row) => row[i]))
  }
}
