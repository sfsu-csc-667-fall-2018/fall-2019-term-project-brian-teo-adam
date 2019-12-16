let gameCardsStack = require('./gameCardsStack');

module.exports =  class gameCardsPlayed extends gameCardsStack {
  constructor() {
    super();
  }

  //Cards that have already been played
  obtainCardsOutOfGame(playedCards) { 
    this.placeCardsInDeck(playedCards);
  }

  //Scanning the end of the deck
  endOfDeck() {
    return this.deckArray[0].getAttributesOfCards();
  }
}