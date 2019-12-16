let gamedeck = require('./gamedeck');

module.exports = class gameDrawCards extends gamedeck { 
    constructor() {
        super();
        this.deckArray = [];
    }

    //Getting more cards
    getNMoreCards(n) {
        return this.getNCards(n);
    }

    //Creating a deck to draw new cards from
    creatingDeckToDrawFrom(placingCards) {
        this.placeCardsInDeck(placingCards, true); 
        this.shuffleCardsInDeck(); 
    }

}
