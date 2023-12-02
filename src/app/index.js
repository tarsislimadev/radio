import netPkg from 'net'
import fs from 'fs'
import path from 'path'
import { BREAK_LINE, PORT } from './constants.js'
import { Input } from './libs/input.js'

import { RTSPRequest, RTSPResponse } from './libs/rtsp.js'

const server = netPkg.createServer(socket => {
  socket.on('data', (chunk) => {
    const data = chunk.toString().split(BREAK_LINE)

    console.log('data', { data })

    const req = new RTSPRequest(data)

    const res = new RTSPResponse(req)

    socket.write(res.toString())

    socket.end()

    const input = new Input(data)

    const output = input.createOutput()

    const filename = path.resolve('.', 'files/horas.wav')

    console.log('filename', { filename })

    const stream = fs.createReadStream(filename)

    output.stream(stream)
  })

  socket.on('error', console.error)
})

server.listen(PORT)
