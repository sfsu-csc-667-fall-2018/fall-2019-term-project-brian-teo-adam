/*
let UnoDeck = require('./gamedeck'); //"UnoDeck" to "gamedeck"
let UnoDrawCardsPile = require('./gameDrawCards');
let UnoPlayedCardsPile = require('./UnoPlayedCardsPile'); //haven't got these files yet
*/
//Must return to this file! Important for upcoming changes. Must edit from line 24, receive cards and on. 

module.exports = class gameboard {
  constructor() {
    this.gamedeck = new gamedeck(); //UnoDeck to gamedeck
    this.drawPile = new gameDrawCards(); //check where drawPile comes from
    //this.playedPile = new UnoPlayedCardsPile();//Don't have this file yet
  }

  cardDealing(nPlayers, dealingPosition = 0) {
      //Below was commented out before Brian did.
    // this.numOfPlayers = kPlayers.length;
    // this.unoDeck.dealCards(kPlayers, dealerPos);
    //Above comments can possibly be deleted.
    
    for(let i = 0; i < gamedeck.startingCards; i++) {
      for(let j = 0; j < nPlayers.length; j++) {
        let currentDealingPosition = (j + dealingPosition) % nPlayers.length;
        /*
        nPlayers[currentDealingPosition].receiveCards(this.gamedeck.getKCardsFromDeck(1)); //Check where receiveCards and getKCardsFromDeck comes from
      }
    }
  }

  setupDrawCardsPile() {
    this.drawPile.buildDrawCardsPile(this.unoDeck.emptyDeck());
  }

  setupPlayedCardsPile() {
    this.playedPile.receiveKPlayedCards(this.drawPile.getKNextCards(1));
  }

  resetDrawCardsPile() {
    let cardsToInsert = this.playedPile.getKCardsFromDeck(this.playedPile.getNumOfCardsLeft());
    this.drawPile.insertCards(cardsToInsert);
    this.drawPile.shuffleDeck();
  }

  getKCardsFromDrawCards(k) {
    let cards = []
    if(k > this.drawPile.getNumOfCardsLeft()) {
      let remaining = this.drawPile.getNumOfCardsLeft();
      k -= remaining;
      cards = this.drawPile.getKNextCards(remaining);

      this.resetDrawCardsPile();

      remainingCards = this.drawPile.getKNextCards(k);
      for(let c of remainingCards) {
        cards.push(c);
      }
    }
    else {
      cards = this.drawPile.getKNextCards(k);
    }

    return cards;
  }

  putCardToPlayedCards(kCard) {
    this.playedPile.receiveKPlayedCards([kCard]);
  }

  getTopPlayedCardsAttribute() {
    return this.playedPile.readBottomOfDeck();
  }

  //Comment put before Brian, 
  //For Server interaction
  getDrawDeckCards() {
    return this.drawPile.deckArray;
  }

  getPlayedDeckCards() {
    return this.playedPile.deckArray;
  }
  */
}
    }
} //Three } can be deleted once code is fixed.
};