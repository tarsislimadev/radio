import { Output } from './output.js'
import { Logger } from './logger.js'

export class Input {
  data = null
  logger = new Logger('Input')

  constructor(data) {
    this.data = data
  }

  createOutput() {
    this.logger.log('createOutput', {})

    return new Output()
  }
}
