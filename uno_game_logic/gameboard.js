let gamedeck = require('./gamedeck');
let gameDrawCards = require('./gameDrawCards');
let gameCardsPlayed = require('./gameCardsPlayed');


module.exports = class gameboard {
  constructor() {
    this.gameDeck = new gamedeck(); 
    this.cardsToDraw = new gameDrawCards(); 
    this.cardsPlayed = new gameCardsPlayed();
  }

  cardDealing(nCurrentPlayers, currentIndex = 0) {
    
    for(let i = 0; i < gamedeck.startingCards; i++) {
      for(let j = 0; j < nCurrentPlayers.length; j++) {
        let currentDealingPosition = (j + currentIndex) % nCurrentPlayers.length;
        
        nCurrentPlayers[currentDealingPosition].acceptCards(this.gameDeck.getNCards(1)); 
      }
    }
  }

  creatingDrawDeck() {
    this.cardsToDraw.creatingDeckToDrawFrom(this.gameDeck.emptyGameDeck());
  }

  creatingPlayedDeck() {
    this.cardsPlayed.obtainCardsOutOfGame(this.cardsToDraw.getNMoreCards(1));
  }

  newDrawDeck() {
    let newCardsPlaced = this.cardsPlayed.getNCards(this.cardsPlayed.getCardsStillInDeck());
    this.cardsToDraw.placeCardsInDeck(newCardsPlaced);
    this.cardsToDraw.shuffleCardsInDeck();
  }

  getNewCardsToDraw (newCards) {
    let currentCards = []
    if(newCards > this.cardsToDraw.getCardsStillInDeck()) {
      let cardsLeft = this.cardsToDraw.getCardsStillInDeck();
      newCards -= cardsLeft;
      currentCards = this.cardsToDraw.getNMoreCards(cardsLeft);

      this.newDrawDeck();

      remainingCards = this.cardsToDraw.getNMoreCards(newCards);
      for(let cards of remainingCards) {
        currentCards.push(cards);
      }
    }
    else {
      currentCards = this.cardsToDraw.getNMoreCards(newCards);
    }

    return currentCards;
  }

  playedCardsDeck(nCards) {
    this.cardsPlayed.obtainCardsOutOfGame([nCards]);
  }

  getDrawnCards() {
    return this.cardsToDraw.deckArray;
  }

  getPlayedCards() {
    return this.cardsPlayed.deckArray;
  }

  getMostPlayedCard() {
    return this.cardsPlayed.endOfDeck();
  }

};