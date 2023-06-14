import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeatMapWrapper from "@/components/Heatmap/heatmapWrapper";
import mockData from "@/helpers/mockData";


const Home: NextPage = () => {

  const heatmapData = mockData
  const field = {
    Temperature: { min: 10, max: 20, aqiWeight: 0.5 },
    Humidity: { min: -100, max: 10, aqiWeight: 0.5 },
    "Air Quality": { min: -100, max: 50, aqiWeight: 0.5 },
  };


  return (
    <>
      <div className="container">
        <HeatMapWrapper
          data={heatmapData}
          fieldData={field}
        />
      </div>
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
