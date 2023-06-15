import LinechartMount from "@/components/Linechart/LineChartMount";
import mockData from "@/helpers/mockData";
import LineChartSensorShowcase from "@/components/Linechart/LineChartSensorShowcase";
import MapPointer from "@/components/MapPointer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFields } from "@/helpers/dataManipulation";
import { FullData } from "@/helpers/dataManipulation";

export async function getStaticPaths() {
  const boxes = await fetch("http://164.90.233.32/api/boxes").then((res) =>
    res.json()
  );

  const slugs = getFields(boxes).map((i: any) => i._id);

  const paths: any = [];
  slugs.forEach((i: any) => {
    paths.push({ params: { id: i }, locale: "en-us" });
    paths.push({ params: { id: i }, locale: "tr" });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  locale,
}: {
  params: { id: string };
  locale: any;
}) {
  //const res = await fetch(`https://.../posts/${params.id}`);
  //const post = await res.json();
  const _id = params.id;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      _id,
    },
  };
}

const sensorsPage = ({ props }: { props: { id: string } }) => {
  //const mockd = mockData.filter((i) => i.name == params.slug)[0];
  const router = useRouter();

    const mockd = mockData
        /*
        .map((i) => {
            console.log(i)
    i.fields = i.fields.filter((j) => {
      return j.field._id == router.query.id;
    });
    return i;
  });
  */
  const mockField = mockData[0].fields[0].field;

  const [data, setData] = useState(mockd);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://164.90.233.32/api/boxes/");
      const boxdata = await res.json();
      const newData = boxdata.map((i: any) => {
        i.fields = i.fields.filter((j: any) => {
          return j.field._id == router.query.id;
        });
        return i;
      });
      setData(newData);
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
          <div className="text-black font-medium mb-3">Sensor:</div>
          <div className="text-3xl font-semibold">{mockField.name}</div>
        </div>
      </div>
      <div className="container my-20 w-full">
        <LineChartSensorShowcase data={data} />
      </div>
    </>
  );
};

export default sensorsPage;
