import type { GetServerSideProps } from 'next';

import Link from 'next/link';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { Segment, Table, Dropdown, Button } from 'semantic-ui-react';
import { getStatByYear } from '../../utils';
import { CURRENT_YEAR, START_YEAR } from '../../configs';

import useUrlQuery from '../../hooks/useUrlQuery';

interface YearPageProps {
  data: ReturnType<typeof getStatByYear>;
}

const YEARS_OPTIONS = Array.from({ length: CURRENT_YEAR - START_YEAR }).map(
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

  const Stats = (
    <Table singleLine unstackable>
      <Table.Body>
        {data.map((v) => {
          const href = `/names/${v.name}?gender=${gender}`;

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
        })}
      </Table.Body>
    </Table>
  );

  return (
    <>
      <Head title={`${year}년 인기 이름`} />
      <Layout>
        <Segment>{Years}</Segment>
        <Segment size="mini">{Genders}</Segment>
        {Stats}
      </Layout>
    </>
  );
};

export default YearPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { year, gender } = context.query;
  const yearString = year as string;

  if (+yearString < START_YEAR || +yearString > CURRENT_YEAR) {
    return {
      notFound: true,
    };
  }

  if (gender !== 'M' && gender !== 'F') {
    return {
      notFound: true,
    };
  }

  const data = getStatByYear({
    year: +yearString,
    gender: gender as Gender,
  });

  return {
    props: {
      data,
    },
  };
};
