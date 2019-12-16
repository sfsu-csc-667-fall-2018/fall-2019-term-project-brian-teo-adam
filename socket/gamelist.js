const gamelist = (io, socket, db, games, users) => {
	socket.on('get game list', data => {
		db.any('SELECT (id, name) FROM games')
		.then(games => {
			let gameList = [];
			for (let row_id in games) {
				let temp = {};
				let info = games[row_id]["row"].replace('(', '').replace(')', '').split(',');
				temp["gameid"] = info[0];
				temp["gamename"] = info[1];
				gameList.push(temp);
			}
			socket.emit('get game list response', {'result':true, 'gamelist':gamelist});
		})
		.catch(err => {
			socket.emit('get game list response', {'result':false})
		});
	});

	socket.on('game status', data => {
		if(games.hasOwnProperty(data.gameid)){
			socket.emit('game status response', {result:true, gameid:data.gameid});
		}else{
			socket.emit('game status response', {result:false});
		}
	});
}

module.exports = listofgames;