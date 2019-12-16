//The characteristics of a card.
const cardType  = "TYPE";
const cardValue = "VALUE";
const cardColor = "COLOR";

//Different colors that a card may have
const colorRed     = "RED";
const colorYellow  = "YELLOW"; 
const colorGreen   = "GREEN";
const colorBlue    = "BLUE";
const colorAllWild = "ALL"; 

const colorCardArray = [ colorRed, colorYellow, colorGreen, 
colorBlue, colorAllWild ]; 

//The different types of cards with no color association
const cardNumber        = "cardNumber"; 
const cardReverse       = "cardReverse"; 
const cardSkip          = "cardSkip";
const cardDrawTwo       = "cardDrawTwo"; 
const cardWild          = "cardWild"; 
const cardWildDrawFour  = "cardWildDrawFour"; 

const typeCardArray = [ cardNumber, cardReverse, cardSkip,
cardDrawTwo, cardWild, cardDrawFourWild ];

const valueZero = 0; //Value of numbered cards from 0-9
const valueOne  = 1;
const valueTwo = 2;
const valueThree = 3;
const valueFour = 4;
const valueFive = 5;
const valueSix = 6;
const valueSeven = 7;
const valueEight = 8;
const valueNine = 9;
const valueReverse = 20; 
const valueSkip = 20;
const valueDrawTwo = 20;
const valueWild = 50; 
const valueWildDrawFour = 50;

//Putting card values into an array
const valueCardArray = [ valueZero, valueOne, valueTwo,
valueThree, valueFour, valueFive, valueSix, valueSeven, valueEight,
valueNine, valueReverses, valueSkip, valueDrawTwo,
valueWild, valueWildDrawFour ];

module.exports = class gamecards { 

  //You have the type of card, the value of it, and the color of it
    constructor(type, value, color) { 
      this.typeOfCard = type;
      this.valueOfCard = value;
      this.colorOfCard = color;
    }

    getAttributesOfCards() {
        let cardAttributes = {};
        cardAttributes[cardType] = this.typeOfCard; //What the card's type, value, and color is 
        cardAttributes[cardValue] = this.valueOfCard; 
        cardAttributes[cardColor] = this.colorOfCard; 

        return cardAttributes;
      }

  //Sorting cards if not sorted
  static neededCardSort(set1, set2) {
    if(set1.valueOfCard === set2.valueOfCard) {
      if (set1.typeOfCard < set2.typeOfCard) {
        return 1;
      }
      else if (set1.typeOfCard < set2.typeOfCard) {
        return -1;
      }
      else {
        if(set1.colorOfCard > set2.colorOfCard) {
          return 1;
        }
        else if(set1.colorOfCard > set2.colorOfCard) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }
    else {
      return set1.valueOfCard - set2.valueOfCard;
    }
}

  //Type card characteristc getters
  static get cardNumber() {
    return cardNumber;
  }

  static get cardReverse() {
    return cardReverse;
  }

  static get cardSkip() {
    return cardSkip;
  }

  static get cardDrawTwo() {
    return cardDrawTwo;
  }

  static get cardWild() {
    return cardWild;
  }

  static get cardWildDrawFour() {
    return cardWildDrawFour;
  }

  static get typeCardArray() {
    return typeCardArray;
  }

  //Color getters
  static get colorRed() {
    return colorRed;
  }

  static get colorYellow() {
    return colorYellow;
  }

  static get colorGreen() {
    return colorGreen;
  }

  static get colorBlue() {
    return colorBlue;
  }

  static get colorAllWild() {
    return colorAllWild;
  }

  static get colorCardArray() {
    return colorCardArray;
  }

  //Value card getters
  static get valueZero() {
    return valueZero;
  }

  static get valueOne() {
    return valueOne;
  }

  static get valueTwo() {
    return valueTwo;
  }

  static get valueThree() {
    return valueThree;
  }

  static get valueFour() {
    return valueFour;
  }

  static get valueFive() {
    return valueFive;
  }

  static get valueSix() {
    return valueSix;
  }

  static get valueSeven() {
    return valueSeven;
  }

  static get valueEight() {
    return valueEight;
  }

  static get valueNine() {
    return valueNine;
  }

  static get valueReverse() {
    return valueReverse;
  }

  static get valueSkip() {
    return valueSkip;
  }

  static get valueDrawTwo() {
    return valueDrawTwo;
  }

  static get valueWild() {
    return valueWild;
  }

  static get valueWildDrawFour() {
    return valueWildDrawFour;
  }

  static get cardType() {
    return cardType;
  }

  static get colorCardArray() {
    return colorCardArray;
  }

  static get cardValue() {
    return cardValue;
  }

  static get cardColor() {
    return cardColor;
  }

  static get valueCardArray() {
    return valueCardArray;
  }

}