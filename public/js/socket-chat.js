//USANDO IMPORTACION DEL <SCRIPT> EN HTML
var socket = io()

//VARIABLES
var params = new URLSearchParams( window.location.search )

if( !params.has('name') ||!params.has('room')){
    window.location = 'index.html'
    throw new Error('El nombre de usuario y sala son necesario')
}

var usuario = {
    name: params.get('name'),
    room: params.get('room')
}


//Reporte de usuarios en el chat
socket.on('connect', function(){
    socket.emit('OpenChat', usuario, function( res ){
        // console.log('Usuarios Conectados', res);
        renderUsers( res )
    })
})

//Mensaje de desconexion
socket.on('disconnect', function(){
    console.log('Se perdio conexion del servidor');
})

//Escucha de avisos del administrador
socket.on('crearMensaje', function( message ){
    // console.log('Servidor', message)
    renderMessage( message, false )
    scrollBottom()
})

//Escucha las entradas de usuarion o salidas
socket.on('listPeople', function( data ) {
    // console.log(data);
    renderUsers( data )
})






//Mensajes privados
socket.on('mensajePrivado', function( message ){
    console.log('Mensaje Privao', message);
})