import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-XNR6HNV6K6" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XNR6HNV6K6');
        `}
      </Script>
      <Script type="text/javascript" src="//wcs.naver.net/wcslog.js" />
      <Script type="text/javascript" id="naver-analytics">
        {`
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "d8c2b754ec3988";
          if(window.wcs) {
            wcs_do();
          }
        `}
      </Script>
      <Analytics />
    </>
  );
}

export default MyApp;
