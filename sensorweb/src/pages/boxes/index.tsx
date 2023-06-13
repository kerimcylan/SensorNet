import LinechartMount from "@/components/Linechart/LineChartMount";
import mockData from "@/helpers/mockData";
import LineChartBoxShowcase from "@/components/Linechart/LineChartBoxShowcase";
import MapPointer from "@/components/MapPointer";

const boxesPage = () => {
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
            <div><MapPointer location={mockd.location} /></div>
          </div>
        </div>
        <div className="container my-20 w-full">
          <LineChartBoxShowcase data={mockd} />
        </div>
      </>
    );
}

export default boxesPage;