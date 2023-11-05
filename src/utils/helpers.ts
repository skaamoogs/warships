export const getUniqueValues = <T>(arr: T[], sort?: boolean) => {
  const unique = arr.filter((v, i, array) => array.indexOf(v) === i);
  if (sort) {
    unique.sort((a, b) => (a < b ? -1 : 1));
  }
  return unique;
};

/**
 * Возвращает массив чисел из заданного диапазона с заданным шагом увеличения/уменьшения.
 * Для вывода значений в порядке уменьшения должен быть задан отрицательный step
 * @param {number} start - Начало диапазона
 * @param {number} end - Конец диапазона
 * @param {number} step - Шаг
 * @returns {number[]}
 */
export const getArrayFromNumRange = (
  start: number,
  end: number,
  step?: number
): number[] => {
  if (!step || step === 0) {
    step = 1;
  }
  if (isNaN(start) || isNaN(end) || isNaN(step)) {
    throw new Error("start, end, and step must be a number");
  }
  const arr = [];

  if (step > 0) {
    [start, end] = [Math.min(start, end), Math.max(start, end)];
    for (let i = start; i < end; i += step) {
      arr.push(i);
    }
  }

  if (step < 0) {
    [start, end] = [Math.max(start, end), Math.min(start, end)];
    for (let i = start; i > end; i += step) {
      arr.push(i);
    }
  }

  return arr;
};
