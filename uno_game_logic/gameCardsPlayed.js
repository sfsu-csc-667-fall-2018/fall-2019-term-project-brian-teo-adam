let gameCardsStack = require('./gameCardsStack');


module.exports =  class gameCardsPlayed extends gameCardsStack { //Do not have extension file yet. 
  constructor() {
    super();
  }

  receiveKPlayedCards(playedCards) { //Where do all these come from? I think comes from gamePlayer
    this.insertCards(playedCards);
  }

  //Top of deck is the logo side facing you represented by the end of array
  //Bottom of deck is where the deck shows the value represented by front of array
  readBottomOfDeck() {
    return this.deckArray[0].getCardAttributes();
  }
}