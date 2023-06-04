import { appWithTranslation } from "next-i18next";
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => { 
    return (
      <>
        <Head>
          <title>Khas Sensor Network</title>
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </>
    );
}

export default appWithTranslation(MyApp);
