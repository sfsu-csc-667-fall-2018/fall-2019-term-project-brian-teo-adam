let gameActionCheck = require('./gameActionCheck');
let gamecards       = require('./gamecards'      );
let gameboard       = require('./gameboard'      );
let gameSeats       = require('./gameSeats'      );


const maximumPlayers   = 8;
const minimumPlayers   = 2;

const directionClockwise        = true;
const directionCounterClockwise = false;

const winningPoints = 250;

const drawCard = 1;
const playCard = 2;


module.exports = class gameRoom {
  constructor(gameRoom) {
    this.gameRoom = gameRoom;
    this.gameActionChecker = new gameActionCheck();
    this.gameboard = new gameboard();
    this.gameSeats = new gameSeats();

    this.gameDirection = directionClockwise;
    this.playerSeatedAt = 0;
    this.cardsDealtAt = 0;
    this.gameInSession = false;
    this.firstTo250 = false;
    this.completedGame = false;
    this.playerCompletedGame = -1;
  }

  addNewPlayer(playerBeingAdded) {
    console.log("Game Room " + this.gameRoom + " Player " + playerBeingAdded.name + " has been added.");
    if(this.playerSeats.getTotalPlayers() < maximumPlayers) {
      this.playerSeats.addNewPlayer(playerBeingAdded);
      return true;
    }
    else {
      return false;
    }
  }

  getTotalPlayers() {
    return this.playerSeats.getTotalPlayers();
  }

  //Game ready to play
  enteringFirstGame() {
    this.gameDirection = directionClockwise;
    this.gameboard.cardDealing(this.playerSeats.playerArray, this.cardsDealtAt);
    this.gameboard.creatingDrawDeck();
    this.gameboard.creatingPlayedDeck();
    this.gameActionCheck.resultOfNewAction();
    this.gameActionCheck.getMostPlayedCards(this.gameboard.getMostPlayedCards());
    this.playerSeatedAt = this.cardsDealtAt;
    this.memberSeatChange();
  }

  allCardsInHand(playerResults) { 
    let inGameCards = playerResults.getCurrentHand();
    let total = 0;

    for(let cards in inGameCards) {
      total += cards.valueOfCard;
    }
    return total;
  }

  inGamePoints() {
    let currentPoints = 0;

    for (let index = 0; index < this.playerSeats.getTotalPlayers(); index++){
      if(index != this.playerSeatedAt) {
        currentPoints += allCardsInHand(this.playerSeats.playerArray[index]);
      }
    }
    this.playerSeats.playerArray[this.playerSeatedAt].playerScore(currentPoints);
    if(this.playerSeats.playerArray[this.playerSeatedAt].myScore >= winningPoints) {
      this.firstTo250 = true;
    }
    this.firstTo250 = true;
    this.cardsDealtAt = (this.cardsDealtAt + 1) % this.playerSeats.getTotalPlayers();
  }

  playerCompletedGame(inGamePlayer) {
    if(inGamePlayer.getPlayerHand() === 0) {
      this.completedGame = true;
    }
  }

  memberSeatChange() {
    if(this.gameDirection === directionClockwise) {
      this.playerSeatedAt = (this.playerSeatedAt + 1) % this.playerSeats.getTotalPlayers();
    }
    else {
      this.playerSeatedAt -= 1;
      if(this.playerSeatedAt < 0) {
        this.playerSeatedAt = this.playerSeats.getTotalPlayeers() - 1;
      }
    }

    console.log("Player moved: playerSeatedAt " + this.playerSeatedAt);

  }

  //Will only start game when requirements are met
  validGameLobby() {
    if(this.playerSeats.playerArray.length < minimumPlayers) {
      alert("Minimum players requirement not met");
      return false;
    }
    else {
      alert("Game is now starting with " + this.playerSeats.playerArray.length + " players in the lobby");
      return true;
    }
  }

  playerIndexAt() {
    console.log("Position of player " + this.playerSeatedAt);

    let inGamePlayer = this.playerSeats.getSeatOfPlayer(this.playerSeatedAt);
    return inGamePlayer;
  }

  mostRecentPlayerAction() {
    let recentPlayedCard = this.gameboard.getMostPlayedCard();
    this.gameActionCheck.getMostPlayedCards(recentPlayedCard);
    let cardPlayed = this.gameActionCheck.moveResult;

    console.log("gameRoom mostRecentPlayerAction outcome " + cardPlayed);

    if(cardPlayed === gameActionCheck.actionWildDrawFour) {
      console.log("gameRoom mostRecentPlayerAction in actionWildDrawFour");
      this.playerIndexAt().acceptCards(this.gameboard.getNewCardsToDraw(4));
      this.gameActionCheck.resultOfNewAction();
    }
    else if(cardPlayed === gameActionCheck.actionDrawTwo) {
      console.log("gameRoom mostRecentPlayerAction in actionDrawTwo");
      this.playerIndexAt().acceptCards(this.gameboard.getNewCardsToDraw(2));
      this.gameActionCheck.resultOfNewAction();
    }
    else if(cardPlayed === gameActionCheck.actionSkipTurn ) {
      console.log("gameRoom mostRecentPlayerAction in actionSkipTurn");
      console.log("Player now skipped " + this.playerIndexAt().name);
      this.gameActionCheck.resultOfNewAction();
    }

    else { 
       this.gameActionCheck.resultOfNewAction();
    }
    console.log("Previous play results " + cardPlayed);
    return cardPlayed;
  }

  cardsPlayerReceives(playerCardsReceived = 1) {
    return this.gameboard.getNewCardsToDraw(playerCardsReceived);
  }

  static get directionClockwise(){
    return directionClockwise;
  }

  static get maximumPlayers() {
    return maximumPlayers;
  }

  static get minimumPlayers() {
    return minimumPlayers;
  }

  static get directionCounterClockwise() {
    return directionCounterClockwise;
  }

  static get drawCard() {
    return drawCard;
  }

  static get playCard() {
    return playCard;
  }

  getStatusOfPlayer(nPlayer, activeTurn = true) {
    if(activeTurn) {
      console.log("Before Card Was Played");
    }
    else {
      console.log("After Card Was Played");
    }
    console.log("  " + nPlayer.username + " ");
    let playingCards = "\n";
    let index = 0;
    for(let inGameCards of nPlayer.allCardsInHand.deckArray) { 
      playingCards += index + " " + inGameCards.typeOfCard + " " + inGameCards.valueOfCard + " " + inGameCards.colorOfCard + " \n"; 
      index++;
    }
    console.log(playingCards);
  }

  pointsOfLobby(playerScore) {
    for(let score of playerScore) {
      console.log("Player: " + score.username + " Points: " + score.playerScore);
    }
  }

  getDrawnCards() {
    return this.gameboard.getDrawnCards();
  }

  getPlayedCards() {
    return this.gameboard.getPlayedCards();
  }

  getAllHandsInGame(playerUserName) {
    for(let player of this.playerSeats.playerArray) {
      if(player.username === playerUserName) {
        return player.getAvailableCards();
      }
    }
  }

  getMostPlayedCardInformation() {
    return this.gameboard.getMostPlayedCard();
  }

  getAllPlayersInGame() {
    return this.playerSeats.playerArray;
  }

  getPlayersPositionAtTable() {
    return this.playerSeatedAt;
  }

  playerDrewCard() {
    let cardDrawnFromDeck = this.mostRecentPlayerAction();
    console.log("Card Previously Drawn: " + cardDrawnFromDeck);
    if(cardDrawnFromDeck != gameActionCheck.actionDefault) {
      return true;
    }

    try {
      this.playerIndexAt().acceptCards(this.gameboard.getNewCardsToDraw(1));
    }
    catch (error) {
      console.log("Could not draw card " + error);
      return false;
    }
    return true;
  }

  cardBeingPlayed(playedCard) {
    let cardPreviouslyPlayed = this.mostRecentPlayerAction();

    console.log("Result of previous move: " + cardPreviouslyPlayed);
    if(cardPreviouslyPlayed != gameActionCheck.actionDefault) {
      return true;
    }

    try {
      let newCardChosen = this.playerIndexAt().actionOfPlayCard(playedCard);
      let cardOutcome = this.gameActionCheck.acceptedAction(newCardChosen);
      if(!cardOutcome) {
        this.playerIndexAt().receiveCards([newCardChosen]);
        return cardOutcome;
      }
      this.gameboard.playedCardsDeck(newCardChosen);
      if(this.gameActionCheck.moveResult === gameActionCheck.actionReverseDirection) {
        this.gameDirection = !this.gameDirection;
        this.gameActionCheck.resultOfNewAction();
      }
    }
    catch(error) {
    
      console.log("There has been an error... " + error);
      return false;
    }
    return true;
  }

  isPlayerInGame(player) {
    for(let presentPlayers of this.playerSeats.playerArray) {
      if(player === presentPlayers.name) { 
        return true;
      }
    }
    return false;
  }

  getPreviousPlayedAction() {
    return this.gameActionCheck.actionCheck; 
  }

  setColorOfWild(setColor) {
    this.gameActionCheck.setColorOfCard(setColor);
    if(this.gameActionCheck.actionCheck !== this.gameActionCheck.actionWildDrawFour) { 
      this.gameActionCheck.resultOfNewAction();
    }
  }

  getPreviousPlayedCard() {
    return this.gameboard.getMostPlayedCard()[gamecards.cardColor];
  }

  getPlayersNumberOfCards(){
    return this.playerIndexAt().getAllHandsInGame();
  }

  checkPlayerSeat(player){
    return this.playerSeats.getIndexOfPlayer(player);
  }
};