let gameCardsInHand = require('./gameCardsInHand');

module.exports =  class gamePlayer { 
  constructor(username) {
    this.username = username;
    this.currentHand = new gameCardsInHand();
    this.cardDealer = false;
    this.gamePoints = 0;
  }

//Refer back to these names to see where they are applied in other files
  acceptCards(nCards) { 
    this.currentHand.placeCardsInDeck(nCards);
  }

  bestPlayCard(cards) {
    let bestCard = this.currentHand.deckArray[cards].getAttributesOfCards();
    return bestCard;
  }

  actionOfPlayedCard(cards) { 
    let playedCard = this.currentHand.cardsInHand([cards]);
    return playedCard;
  }

  drawCardMove(drawnCards) { //Rename
    this.currentHand.placeCardsInDeck(drawnCards);
  }

  setIAmDealer(cardDealer) { //Rename
    this.cardDealer = cardDealer;
  }

  updateMyScore(amount) { //Rename
    this.gamePoints += amount;
  }

  getNumOfCardsInHand() { //Rename
    return this.currentHand.getNumOfCardsLeft();
  }

  unoStatus() { //Rename
    return this.currentHand.getNumOfCardsLeft() === 1;
  }

  getCardInfo() { //Rename
    return this.currentHand.deckArray;
  }

  getCardsInHand() { //Rename
    return this.currentHand.getKCardsFromDeck(this.currentHand.getNumOfCardsLeft());
  }
}