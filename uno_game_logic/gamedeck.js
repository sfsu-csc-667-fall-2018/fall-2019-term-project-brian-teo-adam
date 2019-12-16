let gamePlayer     = require('./gamePlayer'    ); 
let gamecards      = require('./gamecards'     );
let gameCardsStack = require('./gameCardsStack');

const totalZeroCards = 4; //Total number of zero cards
const totalNumberedCards = 8; 
const startingCards = 7;  //Start with 7 cards
const allNumberedCards = totalNumberedCards * 9; 
const totalReverseCards = 8; //Total of 8 "skip, reverse, draw two" cards 
const totalSkipCards = 8; 
const totalDrawTwoCards = 8; 
const totalWildCards = 4; //Total of 4 "wild, wild draw four" cards
const totalWildDrawFourCards = 4; 
const completeDeck = totalZeroCards + allNumberedCards +  
totalSkipCards + totalReverseCards + totalDrawTwoCards + 
totalWildCards + totalWildDrawFourCards; //Total number of cards in the deck

module.exports = class gameDeck extends gameCardsStack {
    constructor() {
      super();
      this.createGameDeck();
      this.shuffleCardsInDeck();
    }

    //This function creates the game's deck of cards
    createGameDeck() {
        //Creating all zero cards
        for(let i = 0; i < totalZeroCards; i++) {
          this.deckArray.push(new gamecards(gamecards.cardNumber,
            gamecards.valueZero,
            gamecards.colorCardArray[i]));
        }

        //Creating all numbered cards not including zero
        for(let i = 1; i < 10; i++) {
        for(let j = 0; j < totalNumberedCards; j++) {
          this.deckArray.push(new gamecards(gamecards.cardNumber,
            gamecards.valueCardArray[i],
            gamecards.colorCardArray[j%4]));
        }
      }

      //Creating the Reverse Cards
    for(let i = 0; i < totalReverseCards; i++) {
      this.deckArray.push(new gamecards(gamecards.cardReverse, 
        gamecards.valueReverse,
        gamecards.colorCardArray[i%4]));
    }
    
      //Creating the skip cards. 
    for(let i = 0; i < totalSkipCards; i++) {
        this.deckArray.push(new gamecards(gamecards.cardSkip, 
          gamecards.valueSkip,
          gamecards.colorCardArray[i%4]));
      }

      //Creating the draw two cards
    for(let i = 0; i < totalDrawTwoCards; i++) {
        this.deckArray.push(new gamecards(gamecards.cardDrawTwo,
          gamecards.valueDrawTwo,
          gamecards.colorCardArray[i%4]));
      }

      //Creating the wild cards
      for(let i = 0; i < totalWildCards; i++) {
          this.deckArray.push(new gamecards(gamecards.cardWild,
          gamecards.valueWild,
          gamecards.colorCardArray[4]));
      }

      //Creating the wild draw four cards
    for(let i = 0; i < totalWildDrawFourCards; i++) {
      this.deckArray.push(new gamecards(gamecards.cardWildDrawFour, 
        gamecards.valueWildDrawFour,
        gamecards.colorCardArray[4]));
    }
}

//Shuffling the game deck
shuffleCardsInDeck() {
  let cardValue = this.deckArray.length;
  let anyCardInDeck;
  let temporaryCardPosition;  

  while (0 !== cardValue) {

   anyCardInDeck = Math.floor(Math.random() * cardValue);
   cardValue -= 1; 

   this.temporaryCardPosition = this.deckArray[cardValue];
   this.deckArray[cardValue] = this.deckArray[anyCardInDeck];
   this.deckArray[anyCardInDeck] = temporaryCardposition;
  }
}

playersToDealTo(nAmountPlayers, dealingPosition) {
  for(let i = 0; i < startingCards; i++) {
    for(let j = 0; j < nAmountPlayers.length; j++) {
      let currentDealingPosition = (j + dealingPosition) % nAmountPlayers.length;
      nAmountPlayers[currentDealingPosition].acceptCards(this.getNCards(1)); 
    }
  }
}

emptyGameDeck() {
  return this.deckArray.splice(0, this.deckArray.length);
}

static get startingCards() {
  return startingCards;
}

static get totalZeroCards() {
  return totalZeroCards;
}

static get totalNumberedCards(){
  return totalNumberedCards;
}

static get allNumberedCards(){
  return allNumberedCards;
}

static get totalReverseCards() {
  return totalReverseCards;
}

static get totalSkipCards() {
  return totalSkipCards;
}

static get totalWildCards() {
  return totalWildCards;
}

static get totalWildDrawFourCards() {
  return totalWildDrawFourCards;
}

static get totalDrawTwoCards () {
  return totalDrawTwoCards;
}

static get completeDeck() {
  return completeDeck;
}

};