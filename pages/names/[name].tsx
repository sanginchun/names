import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Link from 'next/link';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { Segment, Table } from 'semantic-ui-react';
import { getStatByName } from '../../utils';

interface NamePageProps {
  data: ReturnType<typeof getStatByName>;
}

const NamePage = ({ data }: NamePageProps) => {
  const router = useRouter();
  const { name, gender } = router.query;

  const Stats = (
    <Table singleLine unstackable>
      <Table.Body>
        {data.map((v) => {
          const href = `/years/${v.year}?gender=${gender}`;

          return (
            <Table.Row key={v.year} className="link-row">
              <Table.Cell width={2} className="link-cell">
                <Link href={href}>
                  <a>{`${v.year} 년`}</a>
                </Link>
              </Table.Cell>
              <Table.Cell width={4} className="link-cell">
                <Link href={href}>
                  <a>{`${v.count.toLocaleString()} 명`}</a>
                </Link>
              </Table.Cell>
              <Table.Cell width={4} className="link-cell">
                <Link href={href}>
                  <a>{`${v.rank} 위`}</a>
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
      <Head title={`인기 이름 - ${name}`} />
      <Layout>
        <Segment size="large">{name}</Segment>
        {Stats}
        <Segment>상위에 들었던 연도만 표시됩니다</Segment>
      </Layout>
    </>
  );
};

export default NamePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name, gender } = context.query;

  if (gender !== 'M' && gender !== 'F') {
    return {
      notFound: true,
    };
  }

  const data = getStatByName({
    name: name as string,
    gender: gender as Gender,
  });

  return {
    props: {
      data,
    },
  };
};
