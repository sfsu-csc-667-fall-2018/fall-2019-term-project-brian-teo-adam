let gameCard = require('./gameCard');

const actionSkipTurn = "SkipTurn"; //These were all capital and had "_" in between each word
const actionReverseDirection = "ReverseDirection";
const actionDrawFour = "DrawFour";
const actionDrawTwo = "DrawTwo";
const actionChooseColor = "ChooseColor";
const actionDefault = "Default";

module.exports =  class UnoMoveChecker {
  constructor() {
    this.cardAtrributes = {};
    this.actionCheck = actionDefault;
    this.selectedColor = "";
  }

  resetMoveResult() { //Check on these functions and change. 
    this.actionCheck = actionDefault;
  }

  checkMoveValidity(action) {
    let colorOfCard = this.cardAtrributes[gameCard.cardColor];
    let actionOfCard = action.getCardAttributes();
    if(colorOfCard === gameCard.colorBlack) {
      if(this.selectedColor === "") {
        colorOfCard = actionOfCard[gameCard.cardColor];
      }
      else {
        colorOfCard = this.selectedColor;
      }

      this.selectedColor = "";
    }

    let typeOfCard = this.cardAtrributes[gameCard.cardType];
    let valueOfCard = this.cardAtrributes[gameCard.cardType];

    
    let wildRead = actionOfCard[gameCard.cardType] === gameCard.cardWild ||
    actionOfCard[gameCard.cardType] === gameCard.WILD_DRAW_FOUR_CARD;
    let sameColor = actionOfCard[gameCard.cardColor] === colorOfCard;
    let sameValue = actionOfCard[gameCard.cardValue] === valueOfCard;
    let sameType = actionOfCard[gameCard.cardType] === typeOfCard;

    console.log("This Card " + colorOfCard + " " + typeOfCard + " " + valueOfCard);
    console.log("Card Action " + actionOfCard[gameCard.cardColor] + " " + actionOfCard[gameCard.cardType] + " " + actionOfCard[gameCard.cardValue]);

    if((sameColor || (sameValue && sameType)) || wildRead) {
      if(actionOfCard[gameCard.cardType] === gameCard.cardSkip) {
        this.actionCheck = actionSkipTurn;
      }
      else if(actionOfCard[gameCard.cardType] === gameCard.cardReverse) {
        this.actionCheck = actionReverseDirection;
      }
      else if(actionOfCard[gameCard.cardType] === gameCard.cardDrawTwo) {
        this.actionCheck = actionDrawTwo;
      }
      else if(actionOfCard[gameCard.cardType] === gameCard.cardWildDrawFour) {
        this.actionCheck = actionDrawFour;
      }
      else if(actionOfCard[gameCard.cardType] === gameCard.cardWild) {
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
    return actionDrawFour;
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