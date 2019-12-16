let gameCardsStack = require('./gameCardsStack');

module.exports = class gameCardsInHand extends gameCardsStack {
  constructor() {
    super();
 }

 //Looking at available cards in player's hand.
 cardsInHand(cardChosen) { 
    let card = this.deckArray.splice(cardChosen, 1);
    return card[0];
 }
}