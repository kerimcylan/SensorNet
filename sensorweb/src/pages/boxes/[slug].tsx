import LinechartMount from "@/components/Linechart/LineChartMount";
import mockData from "@/helpers/mockData";
import LineChartBoxShowcase from "@/components/Linechart/LineChartBoxShowcase";
import MapPointer from "@/components/MapPointer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import aqiInjector from "@/helpers/aqiInjector";
import { BoxData } from "@/helpers/dataManipulation";
import { useTranslation } from "next-i18next";

export async function getStaticPaths() {
  const boxes = await fetch("http://164.90.233.32/api/boxes").then((res) =>
    res.json()
  );
  console.log(boxes[0].slug);
  const slugs = boxes.map((i: any) => i.slug);

  const paths: any = [];
  slugs.forEach((i: any) => {
    paths.push({ params: { slug: i }, locale: 'en-us' });
    paths.push({ params: { slug: i }, locale: "tr" });
  })

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }: { params: { slug: string }, locale: any }) {
  //const res = await fetch(`https://.../posts/${params.id}`);
  //const post = await res.json();
  const slug = params.slug;
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        slug
      },
    };

}

const boxesPage = ({ props }: { props: { slug: string } }) => {
  //const mockd = mockData.filter((i) => i.name == params.slug)[0];
  const router = useRouter();
  const injected = aqiInjector(mockData);
  const mockd: BoxData = injected[0] ? injected[0] : mockData[0];

  const [data, setData] = useState(mockd)
  const { t } = useTranslation();
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("http://164.90.233.32/api/boxes/");
        const boxdata = await res.json();
        const injected = aqiInjector(boxdata);
        const newData = typeof injected != undefined ? injected : boxdata;
        const fixedData = newData.find((i: any) => i.slug == router.query.slug);

        setData(fixedData);
      };
      const timeouted = async () => {
        fetchData();
        setTimeout(timeouted, 5000);
      };
      fetchData();
      timeouted();
    }, []);
  
  return (
    <>
      <div className="container flex justify-between bg-blue-light rounded-xl p-6">
        <div>
          <div className="text-black font-medium mb-3">{t("Box Name")}:</div>
          <div className="text-3xl font-semibold">{data.name}</div>
        </div>
        <div className="flex">
          <div className="text-black font-medium mr-4">{t("Location")}:</div>
          <div>
            <MapPointer location={data.location} />
          </div>
        </div>
      </div>
      <div className="container my-20 w-full">
        <LineChartBoxShowcase data={data} />
      </div>
    </>
  );
};

export default boxesPage;