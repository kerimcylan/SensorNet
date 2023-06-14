import mockData from "@/helpers/mockData";
import MapPointer from "@/components/MapPointer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { NextPage } from "next";


export async function getStaticProps({
  locale,
}: {
  locale: any;
}) {
  const res = await fetch("http://164.90.233.32/api/boxes/latest");
  const boxdata = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      boxdata,
    },
  };
}

const boxesPage = ({props}: {props:any}) => {
    const mockd = mockData[0];
    /*
  const boxes = props.boxdata.map((i: any) => {
    return (
      <div className="bg-blue-light p-3 rounded-xl">
        <div>
          <div className="text-black font-medium mb-3">Box Name:</div>
          <div className="text-3xl font-semibold">{mockd.name}</div>
        </div>
        <div className="flex">
          <div className="text-black font-medium mr-4">Location:</div>
          <div>
            <MapPointer location={mockd.location} />
          </div>
        </div>
      </div>
    );
  });
  */
    return (
      <>
        <div className="container grid grid-cols-3">
          {boxes}
        </div>
      </>
    );
}

export default boxesPage;