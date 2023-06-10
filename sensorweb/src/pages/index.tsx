import type { NextPage } from "next";
import Translation from "../components/Translation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeatMap from "@/components/heatmap";


const Home: NextPage = () => {
  return (
    <>
      <Translation />
      <HeatMap
        mapData={[
          { x: 200, y: 200, value: 20 },
          { x: 800, y: 200, value: 10 },
        ]}
      />
      
    </>
  );
};

export default Home;
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
