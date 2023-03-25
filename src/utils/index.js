export const rules = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "min",
  "max",
  "flush",
  "twoPairs",
  "fullHouse",
  "poker",
  "yamb",
];

export const constructInitialScore = () => ({
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  min: null,
  max: null,
  flush: null,
  twoPairs: null,
  fullHouse: null,
  poker: null,
  yamb: null,
});

export const constructDice = () => [
  { isSelected: false, value: null },
  { isSelected: false, value: null },
  { isSelected: false, value: null },
  { isSelected: false, value: null },
  { isSelected: false, value: null },
];

export const generateRandomDieNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export const calculateResult = (playerScore) => {
  let result = 0;

  Object.keys(playerScore).forEach((rule) => {
    const scoreValue = playerScore[rule];

    if (rule !== "min" && rule !== "max") {
      result += scoreValue;
    }
  });

  const minMaxResult = (playerScore.max - playerScore.min) * playerScore.one;

  result += minMaxResult;

  return result;
};
