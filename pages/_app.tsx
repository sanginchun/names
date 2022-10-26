import 'semantic-ui-css/semantic.min.css';
import type { AppProps } from 'next/app';
import './style.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-XNR6HNV6K6" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XNR6HNV6K6');
        `}
      </Script>
      <Component {...pageProps} />
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
    </>
  );
}

export default MyApp;
