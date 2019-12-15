let gameBoard = require('./gameBoard');
let gameSeats = require('./gameSeats');
let gameActionCheck = require('./gameActionCheck');
let gameCards = require('./gameCard');


const maximumPlayers   = 8;
const minimumPlayers   = 2;

const directionClockwise        = true;
const directionCounterClockwise = false;

const winningPoints = 500;

const drawCard = 1;
const playCard = 2;


module.exports = class gameRoom {
  constructor(gameID) {
    this.gameID = gameID;
    this.gameBoard = new gameBoard();
    this.gameSeats = new gameSeats();
    this.gameActionChecker = new gameActionCheck();

    this.playerReached500Points = false;
    this.directionOfPlay = directionClockwise;
    this.currentPlayerPos = 0;
    this.dealerPosition = 0;
    this.playerFinished = false;
    this.finishedPlayerPos = -1;
    this.gameStarted = false;
  }

  addPlayer(nPlayer) {
    console.log("GAME ID " + this.gameID + " Added: "+nPlayer.name);
    if(this.playerSeats.getNumOfPlayers() < maximumPlayers) {
      this.playerSeats.addPlayer(nPlayer);
      return true;
    }
    else {
      return false;
    }
  }

  getNumOfPlayers() {
    return this.playerSeats.getNumOfPlayers();
  }

  startRound() {
    this.directionOfPlay = directionClockwise;
    this.gameBoard.dealCardsToPlayers(this.playerSeats.playerArray, this.dealerPosition);
    this.gameBoard.setupDrawCardsPile();
    this.gameBoard.setupPlayedCardsPile();
    this.gameActionCheck.resetMoveResult();
    this.gameActionCheck.getTopOfPlayedPileCardAttributes(this.gameBoard.getTopPlayedCardsAttribute());
    this.currentPlayerPos = this.dealerPosition;
    this.updatePlayerPosition();
  }

  sumPlayerCards(playerResults) { //total was sum. Need new function name.
    let total = 0;
    let cards = playerResults.getCardsInHand();
    for(let c in cards) {
      total += c.valueOfCard;
    }
    return total;
  }

  calculatePlayersScores() {
    let roundScore = 0;
    for (let index = 0; index < this.playerSeats.getNumOfPlayers(); index++){
      if(index != this.currentPlayerPos) {
        roundScore += sumPlayerCards(this.playerSeats.playerArray[index]);
      }
    }
    this.playerSeats.playerArray[this.currentPlayerPos].updateMyScore(roundScore);
    if(this.playerSeats.playerArray[this.currentPlayerPos].myScore >= winningPoints) {
      this.playerReached500Points = true;
    }
    this.playerReached500Points = true;
    this.dealerPosition = (this.dealerPosition + 1) % this.playerSeats.getNumOfPlayers();
  }

  isPlayerFinished(currentPlayer) {
    if(currentPlayer.getNumOfCardsInHand() === 0) {
      this.playerFinished = true;
    }
  }

  updatePlayerPosition() {
    if(this.directionOfPlay === directionClockwise) {
      this.currentPlayerPos = (this.currentPlayerPos + 1) % this.playerSeats.getNumOfPlayers();
    }
    else {
      this.currentPlayerPos -= 1;
      if(this.currentPlayerPos < 0) {
        this.currentPlayerPos = this.playerSeats.getNumOfPlayers()-1;
      }
    }
    console.log("AFTER UPDATING currentPlayerPos " + this.currentPlayerPos);
  }

  startGame() {
    if(this.playerSeats.playerArray.length < minimumPlayers) {
      alert("Minimum players requirement not met");
      return false;
    }
    else {
      alert("Game is now starting with " + this.playerSeats.playerArray.length + " players in the lobby");
      return true;
    }
  }

  getCurrentPlayer() {
    console.log("Position of player " + this.currentPlayerPos);

    let currentPlayer = this.playerSeats.getPlayerAt(this.currentPlayerPos);
    return currentPlayer;
  }

  checkResultOfLastMove() {
    let currTopCard = this.gameBoard.getTopPlayedCardsAttribute();
    this.unoMoveChecker.getTopOfPlayedPileCardAttributes(currTopCard);
    let resultOfLastPlay = this.unoMoveChecker.moveResult;
    //Check result is from function above.
    console.log("gameRoom checkResultOfLastMove result " + resultOfLastPlay);

    if(resultOfLastPlay === gameActionCheck.actionWildDrawFour) {
      console.log("gameRoom checkResultOfLastMove in actionWildDrawFour");
      this.getCurrentPlayer().receiveCards(this.gameBoard.getKCardsFromDrawCards(4));
      this.unoMoveChecker.resetMoveResult();
    }
    else if(resultOfLastPlay === gameActionCheck.actionDrawTwo) {
      console.log("gameRoom checkResultOfLastMove in actionDrawTwo");
      this.getCurrentPlayer().receiveCards(this.gameBoard.getKCardsFromDrawCards(2));
      this.unoMoveChecker.resetMoveResult();
    }
    else if(resultOfLastPlay === gameActionCheck.actionSkipTurn ) {
      console.log("gameRoom checkResultOfLastMove in actionSkipTurn");
      console.log("SKIPPING PLAYER " + this.getCurrentPlayer().name); //Change to player skipped?
      this.unoMoveChecker.resetMoveResult();
    }

    else { //UnoMoveChecker.MOVE_RESULT_DEFAULT or UnoMoveChecker.MOVE_RESULT_CHOOSE_COLOR
       this.unoMoveChecker.resetMoveResult();
    }
    console.log("Previous play results " + resultOfLastPlay);
    return resultOfLastPlay;
  }

  drawPlayerCards(numOfCards=1) {
    return this.gameBoard.getKCardsFromDrawCards(numOfCards);
  }

  static get MAX_NUM_PLAYERS() {
    return maximumPlayers;
  }

  static get MIN_NUM_PLAYERS() {
    return minimumPlayers;
  }

  static get CLOCKWISE(){
    return directionClockwise;
  }

  static get COUNTER_CLOCKWISE() {
    return directionCounterClockwise;
  }

  static get DRAW_CARD_MOVE() {
    return drawCard;
  }

  static get PLAY_CARD_MOVE() {
    return playCard;
  }

  getPlayerState(nPlayer, beforeTurn=true) {
    if(beforeTurn) {
      console.log("===== BEFORE TURN =====");
    }
    else {
      console.log("===== AFTER TURN =====");
    }
    console.log("===== " + nPlayer.name + " =====");
    let cards = "\n";
    let index = 0;
    for(let card of nPlayer.myHand.deckArray) { //myhand and deckArray
      cards += index + " " + card.typeOfCard + " " + card.valueOfCard + " " + card.colorOfCard + " \n"; //Where are all after dots
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
    return this.gameBoard.getDrawDeckCards();
  }

  getPlayedDeckCards() {
    return this.gameBoard.getPlayedDeckCards();
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
    return this.gameBoard.getTopPlayedCardsAttribute();
  }

  getPlayers() {
    return this.playerSeats.playerArray;
  }

  getCurrentPlayerIndex() {
    return this.currentPlayerPos;
  }

  currentPlayerDrewACard() {
    let prevResult = this.checkResultOfLastMove();
    console.log("DRAW CARD PREV RESULT === " + prevResult);
    if(prevResult != gameActionCheck.actionDefault) {
      return true;
    }

    try {
      this.getCurrentPlayer().receiveCards(this.gameBoard.getKCardsFromDrawCards(1));
    }
    catch (err) {
      console.log("Could not draw card " + err);
      return false;
    }
    return true;
  }

  currentPlayerPlayedACard(cardIndex) {
    let prevResult = this.checkResultOfLastMove();

    console.log("Result of previous move " + prevResult);
    if(prevResult != gameActionCheck.actionDefault) {
      return true;
    }

    try {
      let cardToPlay = this.getCurrentPlayer().playCardMove(cardIndex);
      let result = this.unoMoveChecker.checkMoveValidity(cardToPlay);
      if(!result) {
        this.getCurrentPlayer().receiveCards([cardToPlay]);
        return result;
      }
      this.gameBoard.putCardToPlayedCards(cardToPlay);
      if(this.gameActionCheck.moveResult === gameActionCheck.actionReverseDirection) { //move result
        this.directionOfPlay = !this.directionOfPlay;
        this.unoMoveChecker.resetMoveResult();
      }
    }
    catch(err) {
    
      console.log("There has been an error... " + err); //Was Something terrible has happened...
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
    return this.gameBoard.getTopPlayedCardsAttribute()[gameCards.cardColor];
  }

  getCurrentPlayerCardCount(){
    return this.getCurrentPlayer().getNumOfCardsInHand();
  }

  requestPlayerIndex(username){
    return this.playerSeats.getPlayerIndex(username);
  }
};