//IMPORTACIONES
const express = require('express')
const http = require('http')    //definiendo nuevo servidor
const path = require('path')
const socketIO = require('socket.io')

//LEVANTANDO EL SERVIDOR
const app = express()
let server = http.createServer(app)   // Complementando nuevo servidor http con xpress

const port = process.env.PORT || 3000

//OBTENIENDO LA RUTA PUBLIC Y HABILITANDOLA
const publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))


//IO = comunicacion del backend a tiempo real (on: escucha, emit: enviar inf )
module.exports.io = socketIO(server)
require('./sockets/socket')


//HABILITAR LA ESCUCHA DEL PUERTO
server.listen(port, (err) => {
    if (err) throw new Error(err)
    console.log(`Servidor corriendo en puerto ${ port }`);
})