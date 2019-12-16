module.exports =  class gameCardsStack {
    constructor() {
      this.deckArray = [];
    }
  
    getCardsStillInDeck() {
      return this.deckArray.length;
    }
  
    getNCards (n, cardsOnTop = true) {
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
    placeCardsInDeck(insertingCards, takenCardsOnTop = false) {
      for (let chosenCard of insertingCards) {
        if(takenCardsOnTop) {
          this.deckArray.push(chosenCard);
        }
        else {
          this.deckArray.unshift(chosenCard);
        }
      }
    }
  };