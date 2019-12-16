module.exports =  class gameCardsStack {
    constructor() {
      this.deckArray = [];
    }
  
    getNumOfCardsLeft() { //Look for these functions elsewhere
      return this.deckArray.length;
    }
  
    //Cards on top of the deck display the logo, while the bottom displays the card attributes.
    getKCardsFromDeck(n, cardsOnTop = true) {
      if(n > this.deckArray.length) {
        throw("Could not draw cards; the deck is empty");
      }
  
      let returningCards = [];
      if(cardsOnTop) {
        returningCards = this.deckArray.splice(this.deckArray.length - n, n);
      }
      else {
        returningCards = this.deckArray.splice(0, n);
      }
      return returningCards;
    }
  
    //Placing cards into the deck
    placeCardsInDeck(insertingCards, fromCardsOnTop = false) {
      for (let chosenCard of insertingCards) {
        if(fromCardsOnTop) {
          this.deckArray.push(chosenCard);
        }
        else {
          this.deckArray.unshift(chosenCard);
        }
      }
    }
  };