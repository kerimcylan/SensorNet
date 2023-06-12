import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeatMapWrapper from "@/components/Heatmap/heatmapWrapper";
import { FullData } from "@/helpers/dataManipulation";


const Home: NextPage = () => {
  const heatmapData: FullData = {
    Starbucks: {
      data: {
        "Temperature": [{ timestamp: 23534, value: 0 }],
        "Humidity": [{ timestamp: 23534, value: 10 }],
        "Air Quality": [{ timestamp: 23534, value: 10 }],
      },
      location: [100, 150],
    },
    "C Blok": {
      data: {
        "Temperature": [{ timestamp: 23534, value: 25 }],
        "Humidity": [{ timestamp: 23534, value: 10 }],
        "Air Quality": [{ timestamp: 23534, value: 10 }],
      },
      location: [200, 150],
    },
  };

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
