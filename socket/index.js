const socketIo = require( 'socket.io' )
//const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )
const USER_JOINED = 'user-joined';
// const messageContainer = document.getElementById('message-container')
// const messageForm = document.getElementById('send-container')
// const messageInput = document.getElementById('message-input')


const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on('connection', socket => {
    socket.on('new-user', (room, name) => {
      socket.join(room)
      rooms[room].users[socket.id] = name
      socket.to(room).broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', (room, message) => {
      socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
    })
    socket.on('disconnect', () => {
      getUserRooms(socket).forEach(room => {
        socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
        delete rooms[room].users[socket.id]
      })
    })
  })

  function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
      if (room.users[socket.id] != null) names.push(name)
      return names
    }, [])
}
}
//   io.on( 'connection', socket => {
//     console.log( 'client jjjjjj connected', socket)
//     io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    
//     socket.on('disconnect', function(username) {
//       console.log("user disconnect  ",username)
//       io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
//     })
//     socket.on('chat_message', function(message) {
//       console.log(message)
//       io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
//     });
//      socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
//     // socket.on( MESSAGE_SEND, data => io.emit( MESSAGE_SEND, data ))
//   })
// }
// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = messageInput.value
//   appendMessage(`You: ${message}`)
//   socket.emit('send-chat-message', message)
//   messageInput.value = ''
// })

// function appendMessage(message) {
//   const messageElement = document.createElement('div')
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }



module.exports = { init }