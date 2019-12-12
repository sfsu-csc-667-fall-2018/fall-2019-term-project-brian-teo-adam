//Functions/methods need to be reviewed.

module.exports = class gameSeats {
    constructor() {
      this.playersInGameArray = [];
    }
  
    getNumOfPlayers() {
      return this.playersInGameArray.length;
    }
  
    getPlayerAt(positionOfPlayer) {
      return this.playersInGameArray[positionOfPlayer];
    }
  
    addPlayer(playerAdded) {
      this.playersInGameArray.push(playerAdded);
    }
  
    getPlayerIndex(username){ //Change to player position?
      let playerPosition = -1;
      for(let i=0; i<this.playersInGameArray.length; i++){
        if(this.playersInGameArray[i].name === username ){
          playerPosition = i;
          break;
        }
      }
      if(playerPosition < 0){
        throw "No player by that name can be found in a seat";
      }
      return playerPosition;
    }
  
    setDealerPosition() {
  
    }
  };