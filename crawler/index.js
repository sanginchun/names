import { rootData } from './data/index.js';
import { API_URL, DEFAULT_CONFIG, buildQuery } from './config/index.js';
import axios from 'axios';
import qs from 'qs';
import fs from 'fs';
import { extractChosung } from './utils/index.js';

const GENDERS = ['M', 'F'];

const TODAY = new Date();
const MONTH = TODAY.getMonth() + 1;
const YEAR = TODAY.getFullYear();

// get 'YYYYMM" string for last month
const LAST_YEAR_MONTH =
  MONTH === 1 ? `${YEAR - 1}12` : `${YEAR}${`${MONTH - 1}`.padStart(2, '0')}`;

GENDERS.forEach(async (gender) => {
  const currentYear = +LAST_YEAR_MONTH.slice(0, 4);
  const currentYearData = rootData[gender][currentYear];
  const nameCount = {};

  if (currentYearData !== undefined) {
    currentYearData.forEach((v) => {
      nameCount[v.name] = v.count;
    });
  }

  // fetch Data
  try {
    const query = buildQuery(LAST_YEAR_MONTH, gender);
    const res = await axios.post(
      API_URL,
      qs.stringify({ ...DEFAULT_CONFIG, params: JSON.stringify(query) }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const { data } = res.data;

    // update name count
    data.forEach((v) => {
      if (nameCount[v.이름] === undefined) {
        nameCount[v.이름] = v.건수;
      } else {
        nameCount[v.이름] += v.건수;
      }
    });

    // sort
    const sortedNameCount = Object.keys(nameCount)
      .sort((a, b) => {
        return nameCount[b] - nameCount[a];
      })
      .map((key, index) => ({
        name: key,
        count: nameCount[key],
        rank: index + 1,
        chosung: extractChosung(key),
      }));

    // update root data
    rootData[gender][currentYear] = sortedNameCount;

    // write to file
    if (gender === GENDERS[GENDERS.length - 1]) {
      const DATA_AS_STRING = JSON.stringify(rootData);

      fs.writeFile('../data/data.json', DATA_AS_STRING, (err) => {
        if (err) {
          console.error(err);
        }
      });

      fs.writeFile(
        './data/index.js',
        `export const rootData = ${DATA_AS_STRING}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
});
