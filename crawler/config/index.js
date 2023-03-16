export const API_URL = 'https://efamily.scourt.go.kr/ds/report/query.do';

export const DEFAULT_CONFIG = {
  pid: '1811',
  uid: '99999',
  dsid: '1261',
  dstype: 'DS',
  sqlid: '1811-1',
};

const GENDER_MAP = {
  M: '1',
  F: '2',
};

const DEFAULT_QUERY = {
  '@MultiCandType': { value: ['YM'], type: 'STRING', defaultValue: '' },
  '@MultiCandStDt': {
    value: [''],
    type: 'STRING',
    defaultValue: '',
  },
  '@MultiCandEdDt': {
    value: [''],
    type: 'STRING',
    defaultValue: '',
  },
  '@SidoCd': {
    value: [
      '11',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '36',
      '41',
      '43',
      '42',
      '44',
      '45',
      '46',
      '47',
      '48',
      '50',
      '22',
      '21',
      '23',
      '24',
      '25',
    ],
    type: 'STRING',
    defaultValue: '[All]',
    whereClause: 'C.SIDO_CD',
  },
  '@CggCd': {
    value: ['_EMPTY_VALUE_'],
    type: 'STRING',
    defaultValue: '[All]',
    whereClause: 'D.CGG_CD',
  },
  '@UmdCd': {
    value: ['_EMPTY_VALUE_'],
    type: 'STRING',
    defaultValue: '[All]',
    whereClause: 'E.UMD_CD',
  },
  '@GenderCd': {
    value: ['1'],
    type: 'STRING',
    defaultValue: '[All]',
    whereClause: 'F.GENDER_CD',
  },
};

export const buildQuery = (dateString, gender) => {
  const dateCd = {
    value: [dateString],
    type: 'STRING',
    defaultValue: '',
  };

  const genderCd = {
    value: [GENDER_MAP[gender]],
    type: 'STRING',
    defaultValue: '[All]',
    whereClause: 'F.GENDER_CD',
  };

  return {
    ...DEFAULT_QUERY,
    '@MultiCandStDt': dateCd,
    '@MultiCandEdDt': dateCd,
    '@GenderCd': genderCd,
  };
};
