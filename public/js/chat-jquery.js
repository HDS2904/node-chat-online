//IMPORTACIONES
var params = new URLSearchParams( window.location)

//REFERENCIAS DE JQUERY
var divUsers = $('#divUsuarios')
var formSend = $('#formEnviar')
var txtmessage = $('#txtMensaje')
var divChatBox = $('#divChatbox')
var searchContac = $('#formulario')

var name = params.get('name')
var room = params.get('room')

//FUNCIONES
function renderUsers( personas ){

    var html = ''

    html += '<li>'
    html +=     '<a href="javascripthtml:void(0)" class="active"> Chat de <span>'+ params.get('room') +'</span></a>'
    html += '</li>'

    for( var i = 0; i < personas.length; i++){
        html += '<li>'
        html +=    ' <a data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"><span>'+ personas[i].name +'<small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsers.html(html)
}


function renderMessage( message, emi ){

    var html = ''
    var date = new Date(message.fecha)
    var hour = date.getHours() + ':' + date.getMinutes()

    var admEmi = 'info'

    if( message.name === 'Administrador'){
        admEmi = 'danger'
    }

    if( emi ){
        html += '<li class="reverse">'
        html += '    <div class="chat-content">'
        html += '        <h5>'+ message.name +'</h5>'
        html += '        <div class="box bg-light-inverse">'+ message.message+'</div>'
        html += '    </div>'
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '    <div class="chat-time">'+ hour +'</div>'
        html += '</li>'
    }else {
        html += '<li class="animated fadeIn">'
        if( message.name === 'Administrador'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }
        html += '    <div class="chat-content">'
        html += '        <h5>'+ message.name +'</h5>'
        html += '        <div class="box bg-light-'+ admEmi +'">' + message.message + '</div>'
        html += '    </div>'
        html += '    <div class="chat-time">'+ hour +'</div>'
        html += '</li>'
    }

    divChatBox.append(html)
}

//Funcio de manejo scroll de chat
function scrollBottom() {

    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}


//LISTENER
divUsers.on('click', 'a', function(){
    //data-id ="" => data('id')
    var id = $(this).data('id')
    if( id ){
        console.log(id)
    }
})

formSend.on('submit', function( e ){
    e.preventDefault()
    if( txtmessage.val().trim().length === 0 ){
        return
    }

    socket.emit('crearMensaje', {
        name: name,
        message: txtmessage.val()
    }, function(message){
        txtmessage.val('').focus()
        renderMessage(message, true)
        scrollBottom()
    })
})




searchContac.on('keyup',function(){
    socket.emit('search1', {
        cadena: searchContac.val()
    }, function( pers ){
        renderUsers( pers )
    })
})


