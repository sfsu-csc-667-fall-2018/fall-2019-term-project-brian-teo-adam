const socketIo = require( 'socket.io' )
//const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )
const USER_JOINED = 'user-joined';


const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on( 'connection', socket => {
    console.log( 'client jjjjjj connected' )
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    
    socket.on('disconnect', function(username) {
      console.log("user disconnect  ",username)
      io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })
    socket.on('chat_message', function(message) {
      console.log(message)
      io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });
     socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
    // socket.on( MESSAGE_SEND, data => io.emit( MESSAGE_SEND, data ))
  })
}

module.exports = { init }