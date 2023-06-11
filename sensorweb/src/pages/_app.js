import { appWithTranslation } from "next-i18next";
import Head from 'next/head'
import Layout from '@/pages/layout'

const MyApp = ({ Component, pageProps }) => { 
  return (
    <>
      <Head>
        <title>Khas Sensor Network</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Collegiate+One:ital@0;1&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"/>

      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default appWithTranslation(MyApp);
