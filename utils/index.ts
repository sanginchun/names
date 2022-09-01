interface GetStatByYearParams {
  startYear: number;
  endYear: number;
  data: RootData;
}

const GENDER: Gender[] = ['M', 'F'];

export const getStatByYear = ({
  startYear,
  endYear,
  data,
}: GetStatByYearParams): StatData => {
  const stats: StatData = { M: [], F: [] };

  GENDER.forEach((gender) => {
    const total: { [key: string]: NameInfo } = {};

    for (let year = startYear; year <= endYear; year++) {
      data[gender][year].forEach((info) => {
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
