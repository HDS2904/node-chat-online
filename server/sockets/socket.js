//IMPORTACIONES
const { io } = require('../server')
const { Users } = require('../classes/users')
const { createMessage } = require('../utils/utilidades')

//INICIALIZACIÓN DE LA CLASE
const usuarios = new Users

//ACCIONES CON EL FRONT-END y BACKEND
io.on('connection', (client) => {

    //Abrir chat
    client.on('OpenChat', ( data, callback ) => {
        if( !data.name || !data.room){
            return callback({
                error: true,
                message: 'El nombre y sala es necesario'
            })
        }

        client.join(data.room) //Agregar el usuario a la sala

        usuarios.insertPerson( client.id, data.name, data.room )
        client.broadcast.to(data.room).emit('listPeople', usuarios.getPeopleRoom(data.room) )
        client.broadcast.to(data.room).emit('crearMensaje', createMessage( 'Administrador', `${data.name} se unio al chat` ))
        callback(usuarios.getPeopleRoom(data.room))
    })

    //Envio de mensaje a todos los usuarios
    client.on('crearMensaje', ( data, callback ) => {
        let person = usuarios.getPerson( client.id )
        let messageUser = createMessage( person.name, data.message )
        client.broadcast.to(person.room).emit('crearMensaje', messageUser)
        callback( messageUser )
    })

    //reporte desconexion o salida
    client.on('disconnect', () => {
        let personDelet = usuarios.deletePerson( client.id )
        client.broadcast.to(personDelet.room).emit('crearMensaje', createMessage( 'Administrador', `${personDelet.name} abandono el chat` ))
        client.broadcast.to(personDelet.room).emit('listPeople', usuarios.getPeopleRoom( personDelet.room ))
    })

    //Mensajes privados
    client.on('mensajePrivado', ( data ) => {
        let person = usuarios.getPerson( client.id )
        client.broadcast.to(data.forId).emit('mensajePrivado', createMessage( person.name, data.message) )
    })

    client.on('search1', ( data, callback ) => {
        let pers = usuarios.searchPerson( data.cadena )
        callback( pers )
        // client.emit('search1', usuarios.searchPerson(data))
    })

})

