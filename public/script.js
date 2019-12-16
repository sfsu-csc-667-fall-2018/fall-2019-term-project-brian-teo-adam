//client side js 
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const createGame = document.getElementById('create-game-form')
const lobbymessageContainer = document.getElementById('lobby-message-container')
const lobbymessageForm = document.getElementById('lobby-send-container')
const lobbymessageInput = document.getElementById('lobby-message-input')



socket.emit('new-user', name)
// if (lobbymessageForm != null) {
//   const name = prompt('What is your name?')
//appendMessage('You joined')
//socket.emit('new-user', roomName, name)
createGame.addEventListener('submit', function ( event ) {
  event.preventDefault();
  console.log("fetch function ")
  fetch('/room/createGame', {
    'method': 'POST',
    'headers': {
      'Content-type': 'application/json'
    },
    'body': JSON.stringify({
      'gameName': document.getElementById('gameName').value,
      'numberPlayers': document.getElementById('numberPlayers').value
    })
  }).then(async res => {
    console.log("res", res)
    const data = await res.json();
    console.log('data return', data);
    localStorage.setItem('userId', data.userId);
    socket.emit('new-game', request.body.room)
    console.log('userId', data.userId);
  });
})

socket.on('new-game', function ( message ) { 
  const {
    userId,
    gameType,
    gameId,
  } = message;

  console.log("Script message", message)

  if ( userId == localStorage.getItem('userId') ) {

    // open game window

  }
  else {
     // render the game advertisement somewhere
  }
});



// socket.on('room-created', room => {
//   const roomElement = document.createElement('div')
//   roomElement.innerText = room
//   const roomLink = document.createElement('a')
//   roomLink.href = `/${room}`
//   roomLink.innerText = 'join'
//   roomContainer.append(roomElement)
//   roomContainer.append(roomLink)
// })

// socket.on('lobby-chat-message', data => {
//   console.log(data)
//   //appendMessage(`${data.name}: ${data.message}`)
// })

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

lobbymessageForm.addEventListener('lobby-submit', function (event) {
  //prevent refresh after submit 
  event.preventDefault()
  const message = lobbymessageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('lobby-send-chat-message', message)
  lobbymessageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  lobbymessageContainer.append(messageElement)
}
