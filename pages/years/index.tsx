import type { GetStaticProps } from 'next';

import Link from 'next/link';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { Segment, Table, Dropdown, Button } from 'semantic-ui-react';
import { getStatByYear } from '../../utils';
import { CURRENT_YEAR, START_YEAR } from '../../configs';

import useUrlQuery from '../../hooks/useUrlQuery';

type StatByYear = Record<string, StatData>;

interface YearPageProps {
  data: StatByYear;
}

const YEARS_OPTIONS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }).map(
  (_, i) => `${CURRENT_YEAR - i}`
);
const DEFAULT_YEAR = `${CURRENT_YEAR}`;

const GENDER_TYPES: Gender[] = ['M', 'F'];
const DEFAULT_GENDER: Gender = 'M';

const YearPage = ({ data }: YearPageProps) => {
  const { parsedValues, updateQuery } = useUrlQuery({
    defaultValues: { gender: DEFAULT_GENDER, year: DEFAULT_YEAR },
  });
  const gender = parsedValues['gender'] as Gender;
  const year = parsedValues['year'];

  const getHandleGenderChange = (gender: Gender) => () => {
    updateQuery({ key: 'gender', value: gender });
  };

  const getHandleYearChange = (year: string) => () => {
    updateQuery({ key: 'year', value: year });
  };

  const Years = (
    <Dropdown text={year}>
      <Dropdown.Menu>
        {YEARS_OPTIONS.map((year) => (
          <Dropdown.Item
            key={year}
            text={year}
            value={year}
            onClick={getHandleYearChange(year)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  const Genders = (
    <Button.Group basic size="small">
      {GENDER_TYPES.map((v) => (
        <Button
          key={v}
          active={v === gender}
          onClick={getHandleGenderChange(v)}
        >
          {v === 'M' ? '남자' : '여자'}
        </Button>
      ))}
    </Button.Group>
  );

  let TableRows: JSX.Element[] = [];

  try {
    TableRows = data[year][gender].map((v) => {
      const href = `/names/${gender}/${v.name}`;

      return (
        <Table.Row key={v.name} className="link-row">
          <Table.Cell width={2} className="link-cell">
            <Link href={href}>
              <a>{v.rank}</a>
            </Link>
          </Table.Cell>
          <Table.Cell width={4} className="link-cell">
            <Link href={href}>
              <a>{v.name}</a>
            </Link>
          </Table.Cell>
          <Table.Cell width={4} className="link-cell">
            <Link href={href}>
              <a>{`${v.count.toLocaleString()} 명`}</a>
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  } catch {
    updateQuery([
      { key: 'gender', value: DEFAULT_GENDER },
      { key: 'year', value: DEFAULT_YEAR },
    ]);
  }

  return (
    <>
      <Head title={`${year}년 인기 이름`} />
      <Layout>
        <Segment>{Years}</Segment>
        <Segment size="mini">{Genders}</Segment>
        <Table singleLine unstackable>
          <Table.Body>{TableRows}</Table.Body>
        </Table>
      </Layout>
    </>
  );
};

export default YearPage;

export const getStaticProps: GetStaticProps = async () => {
  const data: StatByYear = {};

  YEARS_OPTIONS.forEach((year) => {
    data[year] = { M: [], F: [] };
    GENDER_TYPES.forEach((gender) => {
      data[year][gender] = getStatByYear({ year: +year, gender });
    });
  });

  return {
    props: {
      data,
    },
  };
};
