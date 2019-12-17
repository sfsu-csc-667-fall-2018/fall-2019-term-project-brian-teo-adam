const socketIo = require('socket.io')

const init = (app, server) => {
  const users = {}
  const io = socketIo(server);
  app.set('io', io)

  io.on('connection', socket => {
    socket.emit('lobby-chat-message', 'Hello World');
    socket.on('lobby-send-chat-message', message => {
      socket.broadcast.emit(message)
    })
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })
    socket.on('lobby-send-chat-messa', message => {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })

    socket.on('send-chat-message', (room, message) => {
      socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
    })
    socket.on('new-game', (room, message) => {
      console.log("new game ")
      console.log(room)
      console.log(message)
      io.to(`${gameType}:${gameId}`).broadcast.emit('game-message', { message: message, })
    })
    socket.on('lobby chat message', (message) => {
      console.log("lobby message")
      console.log(message)
    })

  })
}


module.exports = { init }