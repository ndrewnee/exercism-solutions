export const BufferOverflowError = new Error('Buffer is overflow')
export const BufferEmptyError = new Error('Buffer is empty')

export default class CircularBuffer<T> {
  private buffer: T[]

  constructor(private capacity: number) {
    this.buffer = new Array<T>()
  }

  read(): T {
    if (this.buffer.length === 0) {
      throw BufferEmptyError
    }

    return this.buffer.shift()!
  }

  write(item: T): void {
    if (this.buffer.length === this.capacity) {
      throw BufferOverflowError
    }

    this.buffer.push(item)
  }

  forceWrite(item: T): void {
    if (this.buffer.length === this.capacity) {
      this.buffer.shift()
    }

    this.buffer.push(item)
  }

  clear(): void {
    this.buffer = new Array<T>()
  }
}
