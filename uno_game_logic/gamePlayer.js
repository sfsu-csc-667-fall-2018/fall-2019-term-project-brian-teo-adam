let gameCardsInHand = require('./gameCardsInHand');

module.exports =  class gamePlayer { 
  constructor(username) {
    this.username = username;
    this.currentHand = new gameCardsInHand();
    this.playerTurn = false;
    this.gamePoints = 0;
  }

  //Accepting the starting cards into a player's hand
  acceptCards(nCards) { 
    this.currentHand.placeCardsInDeck(nCards);
  }

  //Best possible card to be played
  bestPlayCard(cards) {
    let bestCard = this.currentHand.deckArray[cards].getAttributesOfCards();
    return bestCard;
  }

  //The outcome of the played card
  actionOfPlayedCard(cards) { 
    let playedCard = this.currentHand.cardsInHand([cards]);
    return playedCard;
  }

  //Player choosing to draw a card
  playerDrawsCard(card) {
    this.currentHand.placeCardsInDeck(card);
  }

  //Player's turn
  playerTurn(turn) { 
    this.playerTurn = turn;
  }

  //Updating the player's score
  playerScore(amount) { 
    this.gamePoints += amount;
  }

  //Cards in the player's hand
  getPlayerHand() { 
    return this.currentHand.getCardsStillInDeck();
  }

  //Checking that player has cards
  handCheck() { 
    return this.currentHand.getCardsStillInDeck() === 1;
  }

  //All cards available in Hand
  getAvailableCards() { 
    return this.currentHand.deckArray;
  }

  //Current cards in Hand
  getCurrentHand() { 
    return this.currentHand.getNCards(this.currentHand.getCardsStillInDeck());
  }
}