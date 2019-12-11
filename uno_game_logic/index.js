//Edited to suit the current files had, must check back soon. 
const gameUtilities        = require('./gameUtilities'     );
const gamecards            = require('./gamecards'         );
const gameaction           = require('./gameaction'        );
const gamedeck             = require('./gamedeck'         );
const gameDrawCards        = require('./gameDrawCards'     );
const gameCardsPlayed      = require('./gameCardsPlayed'   );
const gameboard            = require('./gameboard'         );

module.exports ={
   gameUtilities: gameUtilities,
   cardsUno: gamecards, //if not cardsUno then gamecards
   gameaction,
   gamedeck: gamedeck,
   gameDrawCards: gameDrawCards,
   gameCardsPlayed: gameCardsPlayed,
   gameboard,
}