//The characteristics of a card.
const cardType  = "TYPE";
const cardValue = "VALUE";
const cardColor = "COLOR";
//const cardMapID = "MAPID"; Need to figure out exactly what Map ID does.

//Different colors that a card may have
const colorRed     = "RED"; //Color of cards Red, Yellow, Green, Blue, Black ( Black as in All?)
const colorYellow  = "YELLOW"; //Do these need to be capitalized?
const colorGreen   = "GREEN";
const colorBlue    = "BLUE";
const colorBlack   = "BLACK"; //Maybe consider naming "Black", into "all" color?

const colorCardArray = [ colorRed, colorYellow, colorGreen, 
colorBlue, colorBlack ]; //Change "Black to all"

//The different types of cards with no color association
//Capitalize what is in quotes? or Rename all variables?
const cardNumber        = "cardNumber"; //Any Numberd Card
const cardReverse       = "cardReverse"; //Reverse Card
const cardSkip          = "cardSkip"; //Skip card
const cardDrawTwo       = "cardDrawTwo"; //Draw Two Card
const cardWild          = "cardWild"; //Wild Card
const cardWildDrawFour  = "cardWildDrawFour"; //Wild and Draw Four Card

const typeCardArray = [ cardNumber, cardReverse, cardSkip,
cardDrawTwo, cardWild, cardDrawFourWild ];

//The values of every numbered card and unique card
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
const valueReverse = 20; //Not sure why these are 20
const valueSkip = 20;
const valueDrawTwo = 20;
const valueWild = 50; //Not sure why these are 50
const valueWildDrawFour = 50;

const valueCardArray = [ valueZero, valueOne, valueTwo, //Putting card values into an array?
valueThree, valueFour, valueFive, valueSix, valueSeven, valueEight,
valueNine, valueReverses, valueSkip, valueDrawTwo,
valueWild, valueWildDrawFour ];

/*
const mapIDRed        = 0; //Not sure about this but maybe where the card location is mapped to?
const mapIDYellow     = 13; //Yellow was 39, Green was 13, and Blue was 26, I swapped Yellow's position
const mapIDGreen      = 26;
const mapIDBlue       = 39;
const mapIDBlack      = 100; //Black can probably be replaced with "all" values
*/

/* Need to look into more of the mapID stuff
const mapIDCardArray = [ mapIDRed, mapIDYellow, mapIDGreen, //Look into this
mapIDBlue, mapIDBlack ];
*/

module.exports = class gamecards { //You have the type of card, the color of it, and it's mapID? This can be changed. 
    constructor(type, value, color, mapId) { 
      this.typeOfCard = type;
      this.valueOfCard = value;
      this.colorOfCard = color;
      //this.mapId = mapId;
    }

    getCardAttributes() {
        let cardAttributes = {};
        cardAttributes[cardType] = this.typeOfCard; //What type of card it is 
        cardAttributes[cardValue] = this.valueOfCard; //What the value of the card is
        cardAttributes[cardColor] = this.colorOfCard; //What color the card is
        //cardAttributes[cardMapID] = this.mapId; //MapId? I don't know what it means //Currently not using mapID
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
/*static cardSortCriteriaWithMap(set1, set2) { //Currently not using map
    return set1.mapId - set2.mapId;
  }
*/

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

  //Color color getters
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

  static get colorBlack() { //Maybe change black to all
    return colorBlack;
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

  static get valueCardArray() {
    return valueCardArray;
  }

  static get CARD_COLOR_ARRAY() {
    return CARD_COLOR_ARRAY;
  }

  static get UNO_CARD_TYPE() {
    return UNO_CARD_TYPE;
  }

  static get UNO_CARD_VALUE() {
    return UNO_CARD_VALUE;
  }

  static get UNO_CARD_COLOR() {
    return UNO_CARD_COLOR;
  }

  static get CARD_MAP_ID() {
    return CARD_MAP_ID;
  }

  static get UNO_CARD_MAPID() {
    return UNO_CARD_MAPID;
  }


}