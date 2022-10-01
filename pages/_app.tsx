import 'semantic-ui-css/semantic.min.css';
import type { AppProps } from 'next/app';
import './style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
