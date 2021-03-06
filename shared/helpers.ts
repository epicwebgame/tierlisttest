export const muuris: any = {};

export const MAX_CHAR_COUNT = 32;

export const withToggle = async (
  state: () => any,
  func: (b: boolean) => any
) => {
  func(true);
  const result = await state();
  func(false);
  return result;
};

export const extractAnimeId = (text: string) => text.split("/").reverse()[0];

export const filterOne = <T>(
  pred: (item: T) => boolean,
  [head, ...tail]: T[]
): T[] => {
  if (pred(head)) {
    return [head, ...filterOne(pred, tail)];
  } else {
    return tail;
  }
};

export const mapObject = <V, R>(
  f: (value: V) => R,
  obj: Record<string, V>
): Record<string, R> => {
  return Object.entries(obj).reduce((previous, [key, value]) => {
    const newValue = f(value);
    return {
      ...previous,
      [key]: newValue
    };
  }, {});
};
