/*
//Not using this yet, double check back later.
let UnoDeck = require('./UnoDeck');
*/

module.exports = class UnoDrawCardsPile extends UnoDeck { //Don't have UnoDrawCardsPile or UnoDeck 
    constructor() {
        super();
        this.deckArray = [];
    }

    getNFollowingCards(n) {
        return this.getKCardsFromDeck(n); //Check on where getKCardsFromDeck comes from
    }

    buildingGameDrawCardsDeck(cardsToInsert) { //Check where cardsToInsert comes from 
        this.insertCards(cardsToInsert, true); //Check where insertCards comes from
        this.shuffleGameDeck(); 
    }

}
