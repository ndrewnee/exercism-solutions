export default class List<T> {
  constructor(private values: T[] = []) {}

  push(...el: T[]): List<T> {
    return new List([...this.values, ...el])
  }

  append(this: List<T>, list: List<T>): List<T> {
    return list.foldl((acc, el) => acc.push(el), this)
  }

  concat(this: List<T>, lists: List<List<T>>): List<T> {
    return lists.foldl((acc, el) => acc.push(...el.values), this)
  }

  filter(predicate: (el: T) => boolean): List<T> {
    return this.foldl((acc, el) => (predicate(el) ? acc.push(el) : acc), new List())
  }

  length(): number {
    return this.foldl((acc, _) => acc + 1, 0)
  }

  map<U>(mapper: (el: T) => U): List<U> {
    return this.foldl((acc, el) => acc.push(mapper(el)), new List())
  }

  foldl<U>(reducer: (acc: U, el: T) => U, initial: U): U {
    const [head, ...tail] = this.values
    return head ? new List(tail).foldl(reducer, reducer(initial, head)) : initial
  }

  foldr<U>(reducer: (acc: U, el: T) => U, initial: U): U {
    const [head, ...tail] = this.values
    return head ? reducer(new List(tail).foldr(reducer, initial), head) : initial
  }

  reverse(): List<T> {
    return this.foldr((acc, el) => acc.push(el), new List())
  }
}
