import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeatMapWrapper from "@/components/Heatmap/heatmapWrapper";
import mockData from "@/helpers/mockData";
import { useEffect, useState } from "react";


export async function getStaticProps({ locale }: { locale: any }) {
  //const res = await fetch("http://localhost/api/boxes/latest");
  //const boxdata = await res.json();
  console.log(boxdata);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      mydata: boxdata,
    },
  };
}


const Home = () => {
  const [mapData, setMapData] = useState(mockData);

  const field = {
    Temperature: { min: 10, max: 20, aqiWeight: 0.5 },
    Humidity: { min: -100, max: 10, aqiWeight: 0.5 },
    "Air Quality": { min: -100, max: 50, aqiWeight: 0.5 },
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://164.90.233.32/api/boxes/latest");
      const boxdata = await res.json();
      console.log(boxdata);
      setMapData(boxdata);
    }
    const timeouted = async () => {
      fetchData()
      setTimeout(timeouted, 5000);
    }
    fetchData();
    timeouted()
  }, [])
  return (
    <>
      <div className="container">
        <HeatMapWrapper data={mapData} />
      </div>
    </>
  );
};

export default Home;
