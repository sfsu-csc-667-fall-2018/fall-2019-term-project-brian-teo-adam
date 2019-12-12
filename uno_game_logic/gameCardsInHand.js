//let UnoPileOfCards = require('./UnoPileOfCards');

module.exports = class gameCardsInHand extends UnoPileOfCards { //What is this file related to?
  constructor() {
    super();
 }

 pickCardsAtIndices(index) { //Check if this is called anywhere
    let selection = this.deckArray.splice(index, 1);
    return selection[0];
 }
}