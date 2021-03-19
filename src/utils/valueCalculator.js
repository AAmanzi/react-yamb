import { Rules } from "../consts";
import { sumArray, groupByValues } from "./array";

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
  [Rules.one]: (diceValues) => sumArrayByNumber(diceValues, 1),
  [Rules.two]: (diceValues) => sumArrayByNumber(diceValues, 2),
  [Rules.three]: (diceValues) => sumArrayByNumber(diceValues, 3),
  [Rules.four]: (diceValues) => sumArrayByNumber(diceValues, 4),
  [Rules.five]: (diceValues) => sumArrayByNumber(diceValues, 5),
  [Rules.six]: (diceValues) => sumArrayByNumber(diceValues, 6),
  [Rules.min]: sumArray,
  [Rules.max]: sumArray,
  [Rules.flush]: calculateFlush,
  [Rules.twoPairs]: calculateTwoPairs,
  [Rules.fullHouse]: calculateFullHouse,
  [Rules.poker]: calculatePoker,
  [Rules.yamb]: calculateYamb,
};
