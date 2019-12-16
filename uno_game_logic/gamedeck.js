//Not using this yet, as I don't have the files
/*
let UnoPileOfCards = require('./UnoPileOfCards'); //Pile of cards
let UnoCard = require('./UnoCard'); //Cards are required?
let UnoPlayer = require('./UnoPlayer'); //The player
*/

//Can move these declarations around
const startingCards = 7;  //Start with 7 cards?
const totalZeroCards = 4; //Not sure? Total number of zero cards?
const totalNumberedCards = 8; //Not sure? 8 of each card? From 1-9?
const allNumberedCards = totalNumberedCards * 9; //Maybe all cards in deck? Check what the difference is between this one and one before
const totalSkipCards = 8; //Total of 8 "skip" cards
const totalReverseCards = 8; //Total of 8 "reverse" cards
const totalDrawTwoCards = 8; //Total of 8 "draw two" cards
const totalWildCards = 4; //Total of 8 "wild" cards
const totalWildDrawFourCards = 4; //Total of 8 "wild draw four" cards
const completeDeck = totalZeroCards + allNumberedCards +  
totalSkipCards + totalReverseCards + totalDrawTwoCards + 
totalWildCards + totalWildDrawFourCards; //Total number of cards in the deck

module.exports = class gameDeck extends pileOfGameCards { //Don't have the extended file yet; Name it this
    constructor() {
      super();
      this.createGameDeck();
      this.shuffleCardsInDeck();
    }

    createGameDeck() {
        //Creating the game deck; Creating all zero cards
        for(let i = 0; i < totalZeroCards; i++) {
          this.deckArray.push(new cardsUno(cardsUno.cardNumber, //deckArray comes from where?
            cardsUno.valueZero,
            cardsUno.colorCardArray[i],
            //cardsUno.mapIDCardArray[i] + cardsUno.valueZero)); //Not using Map ID yet. 
          ));
        }

        //Create all numbered cards not including zero
        for(let i = 1; i < 10; i++) {
        for(let j = 0; j < totalNumberedCards; j++) {
          this.deckArray.push(new cardsUno(cardsUno.cardNumber, //deckArray comes from where?
            cardsUno.valueCardArray[i],
            cardsUno.colorCardArray[j%4],
            //cardsUno.mapIDCardArray[j%4] + cardsUno.valueCardArray[i])); //Not using Map ID Yet.
          ));
        }
      }
    
      //Creating the skip cards. 
    for(let i = 0; i < totalSkipCards; i++) {
        this.deckArray.push(new cardsUno(cardsUno.SKIP_CARD, //Check where deckArray comes from
          cardsUno.valueSkip,
          cardsUno.colorCardArray[i%4],
          //cardsUno.mapIDCardArray[i%4] + 10)); //Not using Map ID Yet.
        ));
      }

      //Creating the Reverse Cards
    for(let i = 0; i < totalReverseCards; i++) {
        this.deckArray.push(new cardsUno(cardsUno.cardReverse, //Check where deck array comes from
          cardsUno.valueReverse,
          cardsUno.colorCardArray[i%4],
          //cardsUno.mapIDCardArray[i%4] + 11)); //Not using Map ID Yet. 
        ));
      }

      //Creating the draw two cards
    for(let i = 0; i < totalDrawTwoCards; i++) {
        this.deckArray.push(new cardsUno(cardsUno.cardDrawTwo, //Check where deck array comes from
          cardsUno.valueDrawTwo,
          cardsUno.colorCardArray[i%4],
         // cardsUno.mapIDCardArray[i%4] + 12)); //Not using Map ID yet. 
        ));
      }

      //Creating the wild cards
      for(let i = 0; i < totalWildCards; i++) {
          this.deckArray.push(new cardsUno(cardsUno.cardWild, //Check where deck array comes from
          cardsUno.valueWild,
          cardsUno.colorCardArray[4],
          //cardsUno.mapIDCardArray[4] //Not using Map ID yet.
            ));
      }

      //Creating the wild draw four cards
    for(let i = 0; i < totalWildDrawFourCards; i++) {
      this.deckArray.push(new cardsUno(cardsUno.cardWildDrawFour, //Check where deck array comes from
        cardsUno.valueWildDrawFour,
        cardsUno.colorCardArray[4],
        //cardsUno.CARD_MAP_ID[4] + cardsUno.valueWildDrawFour)); //Not using Map ID yet.
      ));
    }
}

//Shuffling the game deck
shuffleCardsInDeck() {
  let currentCardIndex = this.deckArray.length, temporaryCardPosition, randomCardIndex; //Check where deckArray comes from 

  //While elements are not all shuffled
  while (0 !== currentCardIndex) {

   //A random card index will be chosen
   randomCardIndex = Math.floor(Math.random() * currentCardIndex);
   currentCardIndex -= 1; 

   //Change the temporary card position with the current index
   temporaryCardPosition = this.deckArray[currentCardIndex]; //Check where deck array is
   this.deckArray[currentCardIndex] = this.deckArray[randomCardIndex];
   this.deckArray[randomCardIndex] = temporaryCardposition;
  }
}

dealCards(nAmountPlayers, dealingPosition) {
  for(let i = 0; i < startingCards; i++) {
    for(let j = 0; j < nAmountPlayers.length; j++) {
      let currentDealingPosition = (j + dealingPosition) % nAmountPlayers.length;
      nAmountPlayers[currentDealingPosition].receiveCards(this.getKCardsFromDeck(1)); //Where does receive cards and get KCards from deck come from?
    }
  }
}

//Representation of no more cards in the game deck
emptyGameDeck() {
  return this.deckArray.splice(0, this.deckArray.length); //Check where deckArray comes from
}

//Will possibly be able to move these around?
static get totalNumberedCards(){
  return totalNumberedCards;
}

static get allNumberedCards(){
  return allNumberedCards;
}

static get totalZeroCards() {
  return totalZeroCards;
}

static get totalWildCards() {
  return totalWildCards;
}

static get totalWildDrawFourCards() {
  return totalWildDrawFourCards;
}

static get totalSkipCards() {
  return totalSkipCards;
}

static get totalReverseCards() {
  return totalReverseCards;
}

static get totalDrawTwoCards () {
  return totalDrawTwoCards;
}

static get completeDeck() {
  return completeDeck;
}

static get startingCards() {
  return startingCards;
}

};