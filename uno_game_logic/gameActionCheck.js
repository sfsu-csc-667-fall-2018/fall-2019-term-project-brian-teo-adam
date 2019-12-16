let gamecards = require('./gamecards');

const actionSkipTurn = "SkipTurn"; //These were all capital and had "_" in between each word
const actionReverseDirection = "ReverseDirection";
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

  resetMoveResult() { //Check on these functions and change. 
    this.actionCheck = actionDefault;
  }

  checkMoveValidity(action) {
    let colorOfCard = this.cardAtrributes[gamecards.cardColor];
    let actionOfCard = action.getCardAttributes();
    if(colorOfCard === gamecards.colorBlack) {
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
    actionOfCard[gamecards.cardType] === gamecards.WILD_DRAW_FOUR_CARD;
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
        this.actionCheck = actionReverseDirection;
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

  getTopOfPlayedPileCardAttributes(playedCardsDeck) { //Look for these functions elsewhere
    this.cardAtrributes = playedCardsDeck;
  }

  setNewColor(newCardColor) {
    this.selectedColor = newCardColor;
  }

  static get MOVE_RESULT_NEXT_PLAYER_SKIP() {
    return actionSkipTurn;
  }

  static get MOVE_RESULT_REVERSE_PLAY_DIRECTION() {
    return actionReverseDirection;
  }

  static get MOVE_RESULT_NEXT_PLAYER_DRAW_FOUR() {
    return actionWildDrawFour;
  }

  static get MOVE_RESULT_NEXT_PLAYER_DRAW_TWO() {
    return actionDrawTwo;
  }

  static get MOVE_RESULT_CHOOSE_COLOR() {
    return actionChooseColor;
  }

  static get MOVE_RESULT_DEFAULT() {
    return actionDefault;
  }
}