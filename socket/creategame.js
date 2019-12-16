const pgp = require('pg-promise')();
const gamesDB = require('../db/games.js');
const util = require('./util.js');
const lib = require('./lib.js');

const game = (io, socket, db, users, games) => {
	
	socket.on('create game request',async data => {
		let id = util.getUserId(socket);
		await gamesDB.insertInGame(data.gamename)
		.then(result => {
			games[result.id] = new lib.gameRoom(result.id);
			socket.emit('create game response', {result: true, 'gameid':result.id});
		})
		.catch(err => {
			socket.emit('create game response', {result: false});
		});
	})

	
}