//let UnoPlayerHandCards = require('./UnoPlayerHandCards'); Do not have these files yet

module.exports =  class gamePlayer { 
  constructor(username) {
    this.username = username;
    this.currentHand = new gameCardsInHand(); //Don't have this yet
    this.cardDealer = false;
    this.gamePoints = 0;
  }
//Refer back to these names to see where they are applied in other files
  receiveCards(nCards) { //Rename
    this.currentHand.insertCards(nCards);
  }

  proposeCardToPlay(index) { //Rename
    let proposedCard = this.currentHand.deckArray[index].getCardAttributes();
    return proposedCard;
  }

  playCardMove(index) { //Rename
    let cardToPlay = this.currentHand.pickCardsAtIndices([index]);
    return cardToPlay;
  }

  drawCardMove(drawnCards) { //Rename
    this.currentHand.insertCards(drawnCards);
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