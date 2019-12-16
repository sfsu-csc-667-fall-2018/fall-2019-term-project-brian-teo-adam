let gameCardsStack = require('./gameCardsStack');

module.exports = class gameCardsInHand extends gameCardsStack {
  constructor() {
    super();
 }

 cardsInHand(cardChosen) { 
    let card = this.deckArray.splice(cardChosen, 1);
    return card[0];
 }
}