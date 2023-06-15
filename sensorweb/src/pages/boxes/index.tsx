import mockData from "@/helpers/mockData";
import MapPointer from "@/components/MapPointer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

export async function getStaticProps({
  locale,
}: {
  locale: any;
}) {
  //const res = await fetch("http://164.90.233.32/api/boxes/latest");
  //const boxdata = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),

    },
  };
}

const boxesPage = ({props}: {props:any}) => {
  const mockd = mockData;

  const { t } = useTranslation();

  const [data, setData] = useState(mockd)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://164.90.233.32/api/boxes/latest");
      const boxdata = await res.json();
      setData(boxdata);
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
      <Link href={'/boxes/' + i.slug }>
        <div className="bg-blue-light p-3 rounded-xl">
          <div>
            <div className="text-black font-medium mb-3">{t("Box Name")}:</div>
            <div className="text-3xl font-semibold">{i.name}</div>
          </div>
          <div className="flex">
            <div className="text-black font-medium mr-4">{t("Location")}:</div>
            <div>
              <MapPointer location={i.location} />
            </div>
          </div>
        </div>
      </Link>
    );
  });

    return (
      <>
        <div className="container grid grid-cols-3 gap-3">
        {boxes}
        </div>
      </>
    );
}

export default boxesPage;