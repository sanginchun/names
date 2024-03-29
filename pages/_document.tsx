import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          key="description"
          content="최근 몇 년간 인기 많았던 아이 이름, 연도별 인기 이름, 이름 검색을 제공합니다."
        />
        <meta
          name="keywords"
          key="keyword"
          content="이름,인기 이름,아기 이름,아이 이름,이름 통계,작명,선호 이름,개명"
        />
        <meta
          property="og:description"
          key="og:description"
          content="최근 몇 년간 인기 많았던 아이 이름, 연도별 인기 이름, 이름 검색을 제공합니다."
        />
        <meta property="og:image" key="og:image" content="/preview.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
