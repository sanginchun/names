// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { data } from '../../data';

type Data = {
  result: Array<string>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { searchTerm, gender } = req.query;

  if (typeof gender !== 'string' || typeof searchTerm !== 'string') {
    res.end(401);
    return;
  }

  if (gender !== 'M' && gender !== 'F') {
    res.end(401);
    return;
  }

  const dataByGender = Object.values(data[gender]);
  const names: string[] = [];

  if (searchTerm.length === 1) {
    if (searchTerm.match(/[ㄱ-ㅎ]/)) {
      // 1글자 초성
      dataByGender.forEach((nameInfo) => {
        nameInfo.forEach((v) => {
          if (
            v.chosung.startsWith(searchTerm) ||
            v.chosung.endsWith(searchTerm)
          ) {
            names.push(v.name);
          }
        });
      });
    } else {
      // 1글자
      dataByGender.forEach((nameInfo) => {
        nameInfo.forEach((v) => {
          if (v.name.startsWith(searchTerm) || v.name.endsWith(searchTerm)) {
            names.push(v.name);
          }
        });
      });
    }
  } else {
    // 2글자
    if (searchTerm.match(/[ㄱ-ㅎ]{2}/)) {
      dataByGender.forEach((nameInfo) => {
        nameInfo.forEach((v) => {
          if (v.chosung === searchTerm) {
            names.push(v.name);
          }
        });
      });
    } else if (searchTerm.match(/[가-힣]{2}/)) {
      dataByGender.forEach((nameInfo) => {
        nameInfo.forEach((v) => {
          if (v.name === searchTerm) {
            names.push(v.name);
          }
        });
      });
    } else if (searchTerm.match(/[가-힣][ㄱ-ㅎ]/)) {
      dataByGender.forEach((nameInfo) => {
        nameInfo.forEach((v) => {
          if (
            v.name.startsWith(searchTerm[0]) &&
            v.chosung.endsWith(searchTerm[1])
          ) {
            names.push(v.name);
          }
        });
      });
    } else {
      dataByGender.forEach((nameInfo) => {
        nameInfo.forEach((v) => {
          if (
            v.chosung.startsWith(searchTerm[0]) &&
            v.name.endsWith(searchTerm[1])
          ) {
            names.push(v.name);
          }
        });
      });
    }
  }

  const uniqueNames = Array.from(new Set(names));

  res.status(200).json({ result: uniqueNames });
}
