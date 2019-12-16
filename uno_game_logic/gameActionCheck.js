let gamecards = require('./gamecards');

const actionReverse = "ReverseDirection";
const actionSkipTurn = "SkipTurn";
const actionDrawTwo = "DrawTwo";
const actionWildDrawFour = "DrawFour";
const actionChooseColor = "ChooseColor";
const actionDefault = "Default";

module.exports =  class gameActionCheck {
  constructor() {
    this.cardAtrributes = {};
    this.actionCheck = actionDefault;
    this.selectedColor = "";
  }

  resultOfNewAction() { 
    this.actionCheck = actionDefault;
  }

  //actions that can be accepted by the game
  acceptedAction(action) {
    let colorOfCard = this.cardAtrributes[gamecards.cardColor];
    let actionOfCard = action.getAttributesOfCards();
    if(colorOfCard === gamecards.colorAllWild) {
      if(this.selectedColor === "") {
        colorOfCard = actionOfCard[gamecards.cardColor];
      }
      else {
        colorOfCard = this.selectedColor;
      }

      this.selectedColor = "";
    }

    let typeOfCard = this.cardAtrributes[gamecards.cardType];
    let valueOfCard = this.cardAtrributes[gamecards.cardType];

    
    let wildRead = actionOfCard[gamecards.cardType] === gamecards.cardWild ||
    actionOfCard[gamecards.cardType] === gamecards.cardWildDrawFour;
    let sameColor = actionOfCard[gamecards.cardColor] === colorOfCard;
    let sameValue = actionOfCard[gamecards.cardValue] === valueOfCard;
    let sameType = actionOfCard[gamecards.cardType] === typeOfCard;

    console.log("This Card " + colorOfCard + " " + typeOfCard + " " + valueOfCard);
    console.log("Card Action " + actionOfCard[gamecards.cardColor] + " " + actionOfCard[gamecards.cardType] + " " + actionOfCard[gamecards.cardValue]);

    if((sameColor || (sameValue && sameType)) || wildRead) {
      if(actionOfCard[gamecards.cardType] === gamecards.cardSkip) {
        this.actionCheck = actionSkipTurn;
      }
      else if(actionOfCard[gamecards.cardType] === gamecards.cardReverse) {
        this.actionCheck = actionReverse;
      }
      else if(actionOfCard[gamecards.cardType] === gamecards.cardDrawTwo) {
        this.actionCheck = actionDrawTwo;
      }
      else if(actionOfCard[gamecards.cardType] === gamecards.cardWildDrawFour) {
        this.actionCheck = actionWildDrawFour;
      }
      else if(actionOfCard[gamecards.cardType] === gamecards.cardWild) {
        this.actionCheck = actionChooseColor;
      }
      else {
        this.actionCheck = actionDefault;
      }
      console.log("Action Valid");
      return true;
    }
    console.log("Action Invalid");
    return false;
  }


  getMostPlayedCards(playedCardsDeck) {
    this.cardAtrributes = playedCardsDeck;
  }

  //When wild or wild draw four, set a card color
  setColorOfCard(newCardColor) {
    this.selectedColor = newCardColor;
  }

  static get actionReverse() {
    return actionReverse;
  }

  static get actionSkipTurn() {
    return actionSkipTurn;
  }

  static get actionChooseColor() {
    return actionChooseColor;
  }

  static get actionDrawTwo() {
    return actionDrawTwo;
  }

  static get actionWildDrawFour() {
    return actionWildDrawFour;
  }

  static get actionDefault() {
    return actionDefault;
  }
}