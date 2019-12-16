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

  getPlayerState(nPlayer, beforeTurn=true) {
    if(beforeTurn) {
      console.log("Before Card Was Played");
    }
    else {
      console.log("After Card Was Played");
    }
    console.log("  " + nPlayer.name + " ");
    let cards = "\n";
    let index = 0;
    for(let card of nPlayer.myHand.deckArray) { 
      cards += index + " " + card.typeOfCard + " " + card.valueOfCard + " " + card.colorOfCard + " \n"; 
      index++;
    }
    console.log(cards);
  }

  showPlayerScores(playerScore) {
    for(let score of playerScore) {
      console.log("Player " + score.name + " Score: " + score.myScore); //Look for name and myScore
    }
  }

  //FOR SERVER INTERACTION
  getDrawDeckCards() {
    return this.gameboard.getDrawnCards();
  }

  getPlayedDeckCards() {
    return this.gameboard.getPlayedCards();
  }

  getPlayerHands(nPlayerName) {
    for(let player of this.playerSeats.playerArray) {
      if(player.name === nPlayerName) {
        //console.log("GETTING CARDS FROM PLAYER: "+JSON.stringify(player))
        return player.getCardInfo();
      }
    }
  }

  getCurrentTopCardAttributes() {
    return this.gameboard.getMostPlayedCard();
  }

  getPlayers() {
    return this.playerSeats.playerArray;
  }

  getCurrentPlayerIndex() {
    return this.playerSeatedAt;
  }

  currentPlayerDrewACard() {
    let prevResult = this.mostRecentPlayerAction();
    console.log("DRAW CARD PREV RESULT === " + prevResult);
    if(prevResult != gameActionCheck.actionDefault) {
      return true;
    }

    try {
      this.playerIndexAt().receiveCards(this.gameboard.getNewCardsToDraw(1));
    }
    catch (err) {
      console.log("Could not draw card " + err);
      return false;
    }
    return true;
  }

  currentPlayerPlayedACard(cardIndex) {
    let prevResult = this.mostRecentPlayerAction();

    console.log("Result of previous move " + prevResult);
    if(prevResult != gameActionCheck.actionDefault) {
      return true;
    }

    try {
      let cardToPlay = this.playerIndexAt().playCardMove(cardIndex);
      let result = this.gameActionCheck.checkMoveValidity(cardToPlay);
      if(!result) {
        this.playerIndexAt().receiveCards([cardToPlay]);
        return result;
      }
      this.gameboard.playedCardsDeck(cardToPlay);
      if(this.gameActionCheck.moveResult === gameActionCheck.actionReverseDirection) { //move result
        this.gameDirection = !this.gameDirection;
        this.gameActionCheck.resetMoveResult();
      }
    }
    catch(err) {
    
      console.log("There has been an error... " + err);
      return false;
    }
    return true;
  }

  doesPlayerExistInGame(playerUsername) {
    for(let presentPlayers of this.playerSeats.playerArray) {
      if(playerUsername === presentPlayers.name) { //Where does name come from?
        return true;
      }
    }
    return false;
  }

  getLastMoveResult() {
    return this.gameActionCheck.moveResult; //Where does moveResult come from?
  }

  setWildCardColor(setColor) {
    this.gameActionCheck.setNewColor(setColor);
    if(this.gameActionCheck.moveResult !== this.gameActionCheck.actionWildDrawFour) { //look for moveResult
      this.gameActionCheck.resetMoveResult();
    }
  }

  getLastCardPlayed() {
    return this.gameboard.getMostPlayedCard()[gamecards.cardColor];
  }

  getCurrentPlayerCardCount(){
    return this.playerIndexAt().getNumOfCardsInHand();
  }

  requestPlayerIndex(username){
    return this.playerSeats.getPlayerIndex(username);
  }
};