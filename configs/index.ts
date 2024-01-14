import rootData from '../data';

export const START_YEAR = 2008;

let currentYear = new Date().getFullYear();

// find most recent available year
while (currentYear > START_YEAR) {
  if (!!rootData['M'][currentYear]) {
    break;
  }
  currentYear--;
}

export const CURRENT_YEAR = currentYear;
