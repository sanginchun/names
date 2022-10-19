import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { CURRENT_YEAR } from '../configs';
import { getStatByPeriod } from '../utils';

import Head from '../components/Head';
import Layout from '../components/Layout';
import { Segment, Button, Divider, Table } from 'semantic-ui-react';
import useUrlQuery from '../hooks/useUrlQuery';

type StatByPeriod = Record<Period, StatData>;

interface Props {
  data: StatByPeriod;
}

const PERIOD_TYPES: Period[] = ['올해', '최근 3년', '최근 5년', '최근 10년'];
const DEFAULT_PERIOD: Period = '올해';

const GENDER_TYPES: Gender[] = ['M', 'F'];
const DEFAULT_GENDER: Gender = 'M';

const IndexPage: NextPage<Props> = ({ data }) => {
  const { parsedValues, updateQuery } = useUrlQuery({
    defaultValues: { period: DEFAULT_PERIOD, gender: DEFAULT_GENDER },
  });

  const getHandleGenderChange = (gender: Gender) => () => {
    updateQuery({ key: 'gender', value: gender });
  };

  const getHandlePeriodChange = (period: Period) => () => {
    updateQuery({ key: 'period', value: period });
  };

  const period = parsedValues['period'] as Period;
  const gender = parsedValues['gender'] as Gender;

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

  const PeriodButtons = (
    <Button.Group basic size="small">
      {PERIOD_TYPES.map((v) => (
        <Button
          key={v}
          active={v === period}
          onClick={getHandlePeriodChange(v)}
        >
          {v}
        </Button>
      ))}
    </Button.Group>
  );

  // TODO: Period, Gender 에러처리
  const Stats = (
    <Table singleLine unstackable>
      <Table.Body>
        {data[period][gender].map((v) => {
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
      <Head title="인기 많은 아이 이름" />
      <Layout>
        <Segment size="mini">
          {Genders}
          <Divider />
          {PeriodButtons}
        </Segment>
        {Stats}
      </Layout>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const endYear = CURRENT_YEAR;

  const data: StatByPeriod = {
    올해: getStatByPeriod({ startYear: CURRENT_YEAR, endYear }),
    '최근 3년': getStatByPeriod({
      startYear: CURRENT_YEAR - 2,
      endYear,
    }),
    '최근 5년': getStatByPeriod({
      startYear: CURRENT_YEAR - 4,
      endYear,
    }),
    '최근 10년': getStatByPeriod({
      startYear: CURRENT_YEAR - 9,
      endYear,
    }),
  };
  return {
    props: {
      data,
    },
  };
};
