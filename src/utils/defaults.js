import { Rules } from "../consts";

export const constructScore = () => {
  return {
    [Rules.one]: null,
    [Rules.two]: null,
    [Rules.three]: null,
    [Rules.four]: null,
    [Rules.five]: null,
    [Rules.six]: null,
    [Rules.min]: null,
    [Rules.max]: null,
    [Rules.flush]: null,
    [Rules.twoPairs]: null,
    [Rules.fullHouse]: null,
    [Rules.poker]: null,
    [Rules.yamb]: null,
  };
};

export const constructDice = () => {
  return [
    {
      value: null,
      isSelected: false,
    },
    {
      value: null,
      isSelected: false,
    },
    {
      value: null,
      isSelected: false,
    },
    {
      value: null,
      isSelected: false,
    },
    {
      value: null,
      isSelected: false,
    },
  ];
};
