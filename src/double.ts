export class Double<T = string | number> {
  #value1?: T
  #value2?: T

  constructor(seed?: T[]) {
    seed?.forEach((val) => this.add(val))
  }

  add(val: T) {
    if (this.#value1 === val) {
      return
    } else if (this.#value2 === val) {
      return
    } else if (!this.#value1) {
      this.#value1 = val
    } else if (!this.#value2) {
      this.#value2 = val
    } else {
      throw `trying to add a third value to double (${this.#value1}, ${
        this.#value2
      }) + ${val}`
    }
  }

  has(val: T): boolean {
    if (this.#value1 === val) {
      return true
    } else if (this.#value2 === val) {
      return true
    } else {
      return false
    }
  }

  other(than: T): T {
    if (!this.has(than)) {
      throw `set doesn't have ${than}`
    }

    if (than === this.#value2) {
      return this.#value1!
    } else if (than === this.#value1) {
      return this.#value2!
    } else {
      throw 'Cannot switch if it doesnt equal one of the values'
    }
  }

  get isComplete() {
    return !!this.#value1 && !!this.#value2
  }

  get values() {
    return [this.#value1, this.#value2] as const
  }
}
