module.exports = class gameSeats {
    constructor() {
      this.playersInGameArray = [];
    }
  
    //Getting the players available in the array
    getTotalPlayers() {
      return this.playersInGameArray.length;
    }
  
    //Getting position of player seat in array
    getSeatOfPlayer(positionOfPlayer) {
      return this.playersInGameArray[positionOfPlayer];
    }
  
    //Adding to the array
    addNewPlayer(playerAdded) {
      this.playersInGameArray.push(playerAdded);
    }

    //Getting Index in Array
    getIndexOfPlayer(username){ 
      let playerPosition = -1;

      for(let i = 0; i < this.playersInGameArray.length; i++) {

        if(this.playersInGameArray[i].name === username ) {
          playerPosition = i;
          break;

        }
      }

      if(playerPosition < 0) {
        throw "No player by that name can be found in a seat";

      }

      return playerPosition;

    }
  };