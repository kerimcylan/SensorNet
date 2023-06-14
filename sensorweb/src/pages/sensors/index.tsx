import mockData from "@/helpers/mockData";
import MapPointer from "@/components/MapPointer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFields } from "@/helpers/dataManipulation";

export async function getStaticProps({ locale }: { locale: any }) {
  const res = await fetch("http://164.90.233.32/api/boxes/latest");
  const boxdata = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      boxdata,
    },
  };
}

const sensorsPage = ({ props }: { props: any }) => {
  const mockd = getFields(mockData);

  const [data, setData] = useState(mockd);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://164.90.233.32/api/boxes/latest");
        const boxdata = await res.json();
        
        const sensorData = getFields(boxdata);
      setData(sensorData);
    };
    const timeouted = async () => {
      fetchData();
      setTimeout(timeouted, 5000);
    };
    fetchData();
    timeouted();
  }, []);

  const boxes = data.map((i: any) => {
    return (
      <Link href={"/sensors/" + i._id}>
        <div className="bg-blue-light p-3 rounded-xl">
          <div>
            <div className="text-black font-medium mb-3">Sensor Name:</div>
            <div className="text-3xl font-semibold">{i.name}</div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="container grid grid-cols-3 gap-3">{boxes}</div>
    </>
  );
};

export default sensorsPage;
