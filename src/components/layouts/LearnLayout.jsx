import { useState } from "react";
import LearnTurkeyProvinceMap from "../learn/learnTurkeyProvinceMap";
import LearnNeighborCountriesMap from "../learn/LearnNeighborCountriesMap";

const LearnLayout = () => {
  const [content, setContent] = useState("turkey-province");

  const contentHandler = () => {
    switch (content) {
      case "turkey-province":
        return <LearnTurkeyProvinceMap />;
      case "neighbor-countries":
        return <LearnNeighborCountriesMap />;
      case "contact":
        return <div>Contact</div>;
      default:
        return <div>404 Not Found</div>;
    }
  };

  return (
    <div className="h-screen p-5 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={() => setContent("turkey-province")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Türkiye İl Haritası
        </button>
        <button
          onClick={() => setContent("neighbor-countries")}
          className="px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer"
        >
          Komşu Ülkeler
        </button>
      </div>
      <div className="w-full lg:max-h-[30rem] lg:w-[70rem] p-10 bg-white/20 rounded-3xl shadow-2xl backdrop-blur-2xl">
        {contentHandler()}
      </div>
    </div>
  );
};
export default LearnLayout;
