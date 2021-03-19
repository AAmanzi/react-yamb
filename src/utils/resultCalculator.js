import { Rules } from "../consts";

const rulesToSum = [
  Rules.one,
  Rules.two,
  Rules.three,
  Rules.four,
  Rules.five,
  Rules.six,
  Rules.flush,
  Rules.twoPairs,
  Rules.fullHouse,
  Rules.poker,
  Rules.yamb,
];

export const calculateResult = (score) => {
  let result = 0;

  Object.keys(score).forEach((rule) => {
    const scoreValue = score[rule];

    if (rulesToSum.includes(rule)) {
      result += scoreValue;
    }
  });

  const minMaxResult = (score[Rules.max] - score[Rules.min]) * score[Rules.one];

  result += minMaxResult;

  return result;
};
