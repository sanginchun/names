import ROOT_DATA from '../data';
import { START_YEAR, CURRENT_YEAR } from '../configs';

interface GetStatByPeriodParams {
  startYear: number;
  endYear: number;
}

const GENDER: Gender[] = ['M', 'F'];

export const getStatByPeriod = ({
  startYear,
  endYear,
}: GetStatByPeriodParams): StatData => {
  const stats: StatData = { M: [], F: [] };

  GENDER.forEach((gender) => {
    const total: { [key: string]: NameInfo } = {};

    for (let year = startYear; year <= endYear; year++) {
      ROOT_DATA[gender][year].forEach((info) => {
        if (total[info.name]) {
          total[info.name].count += info.count;
        } else {
          total[info.name] = { ...info };
        }
      });
    }

    stats[gender] = Object.keys(total)
      .sort((a, b) => {
        return total[b].count - total[a].count;
      })
      .map((name, index) => ({ ...total[name], rank: index + 1 }));
  });

  return stats;
};

interface GetStatByNameParams {
  name: string;
  gender: Gender;
}

export const getStatByName = ({ name, gender }: GetStatByNameParams) => {
  const data: Array<{
    year: number;
    name: string;
    count: number;
    rank: number | null;
  }> = [];

  for (let year = CURRENT_YEAR; year >= START_YEAR; year--) {
    const foundData = ROOT_DATA[gender][year].find((v) => v.name === name);

    if (foundData) {
      data.push({ year, name, count: foundData.count, rank: foundData.rank });
    }
  }

  return data;
};

interface GetStatByYearParams {
  year: number;
  gender: Gender;
}

export const getStatByYear = ({ year, gender }: GetStatByYearParams) => {
  return ROOT_DATA[gender][year];
};
