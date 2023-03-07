import rootData from './data.json';

export default rootData as RootData;

export const ALL_M_NAMES = Array.from(
  new Set(
    Object.values(rootData['M'])
      .flat()
      .map((v) => v.name)
  )
);

export const ALL_F_NAMES = Array.from(
  new Set(
    Object.values(rootData['F'])
      .flat()
      .map((v) => v.name)
  )
);
