module.exports = function check(str, bracketsConfig) {
  let bracketStack = [];

  let config = {};
  for (let brackets of bracketsConfig) {
    if (brackets[0] !== brackets[1]) {
      config[brackets[0]] = {
        isOpenBracket: true,
        isCloseBracket: false,
        closingBracket: brackets[1],
        openingBracket: null
      }
      config[brackets[1]] = {
        isOpenBracket: false,
        isCloseBracket: true,
        closingBracket: null,
        openingBracket: brackets[0]
      }
    } else {
      config[brackets[0]] = {
        isOpenBracket: true,
        isCloseBracket: true,
        closingBracket: brackets[0],
        openingBracket: brackets[0]
      }
    }
  }
  for (let bracket of str) {
    if (config[bracket].isOpenBracket && config[bracket].isCloseBracket) {
      if (bracketStack[bracketStack.length - 1] === bracket) {
        bracketStack.pop();
      } else {
        bracketStack.push(bracket);
      }
    } else if (config[bracket].isOpenBracket) {
      bracketStack.push(bracket);
    } else if (config[bracket].isCloseBracket) {
      if (bracketStack.length === 0) return false;
      if (config[bracketStack.pop()].closingBracket !== bracket) return false;
    }
  }
  return bracketStack.length === 0;
}

