import { BREAK_LINE } from '../constants.js'

import { Logger } from './logger.js'

class RTSP {
  first_line = null
  headers = {}
  body = ''
}

export class RTSPRequest extends RTSP {
  logger = new Logger('RTSPRequest')

  constructor(data) {
    super()

    this.parseData(data)
  }

  parseData(data = '') {
    const self = this
    let is_header = true

    data.forEach((line, index) => {
      if (index === 0) self.first_line = line
      if (line === '') is_header = false

      if (is_header) {
        const [key, value = ''] = line.split(': ', 2)

        self.headers = { ...self.headers, [key]: value, }
      } else {
        self.body += line
      }
    })

  }
}

export class RTSPResponse extends RTSP {
  logger = new Logger('RTSPResponse')
  request = null
  cseq = 0

  constructor(request, cseq = 1) {
    super()

    this.request = request
    this.cseq = cseq
  }

  getAllLines() {
    this.logger.log('getAllLines', {})

    const lines = []
    lines.push('RTSP/1.0 200 OK')
    lines.push(`CSeq: ${this.cseq}`)
    lines.push('')
    return lines
  }

  toString() {
    return this.getAllLines().join(BREAK_LINE)
  }
}
