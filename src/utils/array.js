export const sumArray = (array, lengthLimit) => {
  return array.reduce((iterator, value, index) => {
    if (!lengthLimit || index < lengthLimit) {
      iterator += value;
    }

    return iterator;
  }, 0);
};

export const groupByValues = (array) => {
  return array.reduce(
    (iterator, value) => ({
      ...iterator,
      [value]: [...(iterator[value] || []), value],
    }),
    {}
  );
};
