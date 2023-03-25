const groupByValues = (array) => {
  return array.reduce(
    (iterator, value) => ({
      ...iterator,
      [value]: [...(iterator[value] || []), value],
    }),
    {}
  );
};

const sumArray = (array, lengthLimit) => {
  return array.reduce((iterator, value, index) => {
    if (!lengthLimit || index < lengthLimit) {
      iterator += value;
    }

    return iterator;
  }, 0);
};

const sumArrayByNumber = (diceValues, number) => {
  return diceValues.reduce((iterator, value) => {
    if (value === number) {
      iterator += number;
    }

    return iterator;
  }, 0);
};

const calculateFlush = (diceValues) => {
  const groupedDice = groupByValues(diceValues);
  const availableDice = Object.keys(groupedDice);

  if (availableDice.length !== 5) {
    return 0;
  }

  if (availableDice.includes(1)) {
    return 35;
  }

  return 45;
};

const calculateTwoPairs = (diceValues) => {
  const groupedDice = groupByValues(diceValues);
  const groupedDiceArray = Object.values(groupedDice);

  const pairs = groupedDiceArray.filter((array) => array.length >= 2);

  if (pairs.length !== 2) {
    return 0;
  }

  return sumArray(pairs[0], 2) + sumArray(pairs[1], 2) + 20;
};

const calculateFullHouse = (diceValues) => {
  const groupedDice = groupByValues(diceValues);
  const groupedDiceArray = Object.values(groupedDice);

  const pair = groupedDiceArray.find((array) => array.length === 2);
  const triple = groupedDiceArray.find((array) => array.length === 3);

  if (!(pair && triple)) {
    return 0;
  }

  return sumArray(pair) + sumArray(triple) + 30;
};

const calculatePoker = (diceValues) => {
  const groupedDice = groupByValues(diceValues);
  const groupedDiceArray = Object.values(groupedDice);

  const quad = groupedDiceArray.find((array) => array.length >= 4);

  if (!quad) {
    return 0;
  }

  return sumArray(quad, 4) + 40;
};

const calculateYamb = (diceValues) => {
  const isYamb = diceValues.every((value) => value === diceValues[0]);

  if (!isYamb) {
    return 0;
  }

  return sumArray(diceValues) + 50;
};

export const valueCalculator = {
  one: (diceValues) => sumArrayByNumber(diceValues, 1),
  two: (diceValues) => sumArrayByNumber(diceValues, 2),
  three: (diceValues) => sumArrayByNumber(diceValues, 3),
  four: (diceValues) => sumArrayByNumber(diceValues, 4),
  five: (diceValues) => sumArrayByNumber(diceValues, 5),
  six: (diceValues) => sumArrayByNumber(diceValues, 6),
  min: sumArray,
  max: sumArray,
  flush: calculateFlush,
  twoPairs: calculateTwoPairs,
  fullHouse: calculateFullHouse,
  poker: calculatePoker,
  yamb: calculateYamb,
};
