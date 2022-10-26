import Head from 'next/head';

interface Props {
  title: string;
}

const PageHead = ({ title }: Props) => {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta property="og:title" key="og:title" content={title} />
    </Head>
  );
};

export default PageHead;
