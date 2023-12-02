
export class Logger {
  name = null

  constructor(name) {
    this.name = name
  }

  log(key, ...values) {
    console.log(key, ...values)
    return this
  }
}
