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
  })

    // socket.on('disconnect', () => {
    //   getUserRooms(socket).forEach(room => {
    //     socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
    //     delete rooms[room].users[socket.id]
    //   })
    //})


    // socket.on('new-game', (room, message) => {
    //   console.log("new game ")
    //   console.log(room)
    //   console.log(message)
    //   io.to(`${gameType}:${gameId}`).broadcast.emit('game-message', { message: message, })
    // })


//  })



  
  //     socket.on('send-chat-message', (room, message) => {
  //       socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  //     })
  //     



  //   function getUserRooms(socket) {
  //     return Object.entries(rooms).reduce((names, [name, room]) => {
  //       if (room.users[socket.id] != null) names.push(name)
  //       return names
  //     }, [])
  //   }

  // io.on('connection', socket => {
  //   console.log("connection on socket")
  //   console.log(socket.request.userId)
  //   socket.on('new-user', (room, name) => {
  //     socket.join(room)
  //     rooms[room].users[socket.id] = name
  //     socket.to(room).broadcast.emit('user-connected', name)
  //   })
  //   socket.on('send-chat-message', (room, message) => {
  //     socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  //   })

  //   socket.on('lobby chat message', (message) => {
  //     console.log("lobby message")
  //     console.log(message)
  //   })

  //   socket.on('new-game', (message) => {

  //   })

  //   socket.on('game-move', (message) => {
  //     const {
  //       gameType,
  //       gameId,
  //       userId,
  //       moveType,
  //       cardData,
  //     } = message;

  //     io.to(`${gameType}:${gameId}`).broadcast.emit('game-message', { message: message, })
  //   })

  //   socket.on('disconnect', () => {
  //     getUserRooms(socket).forEach(room => {
  //       socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
  //       delete rooms[room].users[socket.id]
  //     })
  //   })
  // })

  // function getUserRooms(socket) {
  //   return Object.entries(rooms).reduce((names, [name, room]) => {
  //     if (room.users[socket.id] != null) names.push(name)
  //     return names
  //   }, [])
  // }
}


module.exports = { init }