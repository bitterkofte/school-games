import { useEffect, useState } from "react";
import LearnTurkeyProvinceMap from "../learn/learnTurkeyProvinceMap";
import LearnNeighborCountriesMap from "../learn/LearnNeighborCountriesMap";
import LearnTurkeyProvincesMap from "../learn/LearnTurkeyProvincesMap";
import DisappearingText from "../elements/DisappearingText";

const LearnLayout = () => {
  const [content, setContent] = useState("turkey-province");
  const [isAnimating, setIsAnimating] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "İmleci şehirlerin üzerine getirin"
  );
  const [animatedDistrict, setAnimatedDistrict] = useState(placeholder);

  useEffect(() => {
    if (content === "turkey-province") {
      setPlaceholder("İmleci şehirlerin üzerine getirin");
      setAnimatedDistrict("İmleci şehirlerin üzerine getirin");
    } else if (content === "neighbor-countries") {
      setPlaceholder("İmleci ülkerin üzerine getirin");
      setAnimatedDistrict("İmleci ülkerin üzerine getirin");
    }
  }, [content]);

  const contentHandler = () => {
    switch (content) {
      case "turkey-province":
        return (
          <LearnTurkeyProvincesMap
            handleSVGMouseOut={handleSVGMouseOut}
            handleSVGMouseOver={handleSVGMouseOver}
            placeholder={placeholder}
          />
        );
      // return <LearnTurkeyProvinceMap />;
      case "neighbor-countries":
        return (
          <LearnNeighborCountriesMap
            handleSVGMouseOut={handleSVGMouseOut}
            handleSVGMouseOver={handleSVGMouseOver}
            placeholder={placeholder}
          />
        );
      case "contact":
        return <div>Contact</div>;
      default:
        return <div>404 Not Found</div>;
    }
  };

  const changeProvince = (txt) => {
    // if (isAnimating) return;
    if (isAnimating) {
      setTimeout(() => {
        setAnimatedDistrict(txt);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 500);
      return;
    }

    setIsAnimating(true);

    // After exit animation completes, change text and start enter animation
    setTimeout(() => {
      setAnimatedDistrict(txt);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  const handleSVGMouseOver = (e) => {
    if (e.target.tagName === "path" && e.target.getAttribute("name")) {
      const countryName = e.target.getAttribute("name");
      // console.log("countryName: ", countryName);
      // setSelectedProvince(countryName);
      changeProvince(countryName);
    }
  };
  const handleSVGMouseOut = (e) => {
    if (e.target.tagName === "path" && e.target.getAttribute("name")) {
      // setSelectedProvince(placeholder);
      changeProvince(placeholder);
    }
  };

  return (
    <div className="animate-revive h-screen p-5 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={() => setContent("turkey-province")}
          // className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          className="bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded-lg shadow-lg hover:scale-110 cursor-pointer transition-all duration-300"
        >
          Türkiye İl Haritası
        </button>
        <button
          onClick={() => setContent("neighbor-countries")}
          // className="px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer"
          className="bg-orange-500 hover:bg-orange-400 py-2 px-4 rounded-lg shadow-lg hover:scale-110 cursor-pointer transition-all duration-300"
        >
          Komşu Ülkeler
        </button>
      </div>

      <div className="w-full lg:h-[30rem] lg:w-[70rem] p-10 bg-white/20 rounded-3xl shadow-2xl">
        <div className="h-full w-full flex flex-col">
          <DisappearingText
            district={animatedDistrict}
            isAnimating={isAnimating}
            placeholder={placeholder}
          />
          {contentHandler()}
        </div>
      </div>
    </div>
  );
};
export default LearnLayout;
