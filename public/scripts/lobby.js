const socket = io.connect();

(() => {
	socket.emit('get game list', {});

	socket.on('get game list response', data => {
		if(data.result){
			postGameList(data.gamelist);
		}else{
			alert("error");
		}
	});

	function postGameList(gameList) {
		for (let i in gameList) {
			let str = "<div id=game" + game_list[i]["gameid"] + " class=\"col-md-5\">";
			str += "<div style=\"border: 2px solid black; width: 100%; margin: 20px; cursor: pointer\">" +
             "<center><h1>" + gameList[i]["gamename"] + "</h1>" +
             "<h4> Join </h4>"+
             "</a>" +
             "</center></div>";
		 
		 let node = document.createElement('div');
         node.setAttribute("id",game_list[i]["gameid"]);
         node.innerHTML = str;
         node.onclick = gameHandler;
         document.getElementsByClassName("current_games")[0].appendChild(node); 
		}
	}

	function gameHandler(events) {
      let gameId = events.currentTarget.id
      events.preventDefault();
      let gameInfo = {
         'gameid': target_id
      }
      socket.emit('game status', gameinfo);
   }

	socket.on('game created response', data => {
		if(data.result == true){
			window.location.href = "/game?id=" + data.gameid;
		}else{
			alert("error with joining game");
		}
	})
})();