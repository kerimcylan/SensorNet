import LinechartMount from "@/components/Linechart/LineChartMount";
import mockData from "@/helpers/mockData";
import LineChartBoxShowcase from "@/components/Linechart/LineChartBoxShowcase";
import MapPointer from "@/components/MapPointer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  //const posts = await fetch("https://.../posts").then((res) => res.json());
  const slugs = mockData.map((data) => ({
    slug: data.name,
  }));
  return {
    paths: [
      { params: { slug: "starbucks" }, locale: "en-us" },
      { params: { slug: "starbucks" }, locale: "tr" },
      { params: { slug: "d block" }, locale: "en-us" },
      { params: { slug: "d block" }, locale: "tr" },
    ],
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
  console.log(router.query.slug);
  const mockd = mockData[0];
  return (
    <>
      <div className="container flex justify-between bg-blue-light rounded-xl p-6">
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
      <div className="container my-20 w-full">
        <LineChartBoxShowcase data={mockd} />
      </div>
    </>
  );
};

export default boxesPage;