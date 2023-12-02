import { Logger } from './logger.js'

export class Output {
  input = null

  logger = new Logger('Output')

  constructor(input) {
    this.input = input
  }

  stream(readable) {
    this.logger.log('stream', {  })
  }
}
