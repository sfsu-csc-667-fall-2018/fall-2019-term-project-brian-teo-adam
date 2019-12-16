module.exports = class gameaction {
 constructor(attributeOfCard) {
  this.attribute = attributeOfCard; 
}

getAttributesOfAction() {
  return this.attribute;
}
}
