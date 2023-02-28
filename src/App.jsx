import { useEffect, useState } from "react";
import Card from "./components/Card";
import Search from "./components/Search";
import logo from "./assets/logo.png";
import logo_darkmode from "./assets/logo_darkmode.png";
import { downloadImage } from "./utils/index";
import searchlogo from "./assets/search.png";
import darkmood from "./assets/darkmood.png";
import lightmood from "./assets/lightmood.png";
import banner from "./assets/banner.png";

const UNPLUS_API_URL =
  "https://api.unsplash.com/photos?landscape&client_id=FpUwErhBQNUwgh2ek0x-p0xsQANgmQ_i-SOlN5Rd_X8";

function App() {
  const [image, setImage] = useState([]);
  const [darkmode, setDarkmode] = useState(false);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");
  const [searchvalue, setSearchvalue] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const [results, setResults] = useState("");
  const singleImage = image.filter((item) => item.id === id);
  const insta_url = `https://www.instagram.com/${singleImage[0]?.user?.social?.instagram_username}`;
  const photo = singleImage[0]?.urls?.full;
  const _id = singleImage[0]?.id;
  const images = () => {
    fetch(UNPLUS_API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImage(data);
      });
  };

  useEffect(() => {
    images();
  }, []);

  const handleChange = (e) => {
    setSearchvalue(e.target.value);
    setResults(e.target.value);
  };
  const handleKeydown = (event) => {
    if (event.keycode === 13 || event.key === "enter") {
      event.preventDefault();
      if (searchvalue.length > 0) {
        setImage(searchdata);
        setSearchvalue("");
      }
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchvalue.length > 0) {
      setImage(searchdata);
      setSearchvalue("");
    }
  };
  // console.log(singleImage);

  return (
    <div className={darkmode ? "dark" : ""}>
      <div className=" w-full auto  bg-white dark:bg-slate-800 h-auto relative">
        <div className="relative w-full flex justify-between gap-10 items-center h-20 p-5 shadow-lg">
          <img
            className="md:w-[170px] w-[80px] h-5 md:h-[42px] ml-0 sm:ml-10"
            src={darkmode ? logo_darkmode : logo}
            alt="img"
          />
          <div
            className=" bg-gray-200 p-2 flex items-center h-[45px]
                     w-[200px] hover:ring-1 rounded-md md:w-[420px]"
          >
            <img
              onClick={handleSearch}
              onKeyDown={() => handleKeydown()}
              src={searchlogo}
              alt="search"
              className="w-[20px] h-[20px] "
            />
            <input
              className="bg-transparent ml-2 w-full h-full outline-none p-3 ]"
              type="text"
              placeholder="Search Images Here"
              value={searchvalue}
              onChange={handleChange}
            />
          </div>
          <div className={searchvalue ? " autocomplete" : "hidden"}>
            <Search
              setImage={setImage}
              searchvalue={searchvalue}
              setSearchvalue={setSearchvalue}
              setSearchdata={setSearchdata}
              searchdata={searchdata}
            />
          </div>

          <img
            onClick={() => setDarkmode(!darkmode)}
            className="w-[10] h-5 md:mr-5 mr-0"
            src={darkmode ? lightmood : darkmood}
            alt="darkmode"
          />
        </div>
        <div className="w-full h-auto relative  ">
          <img className="w-full h-60 object-cover" src={banner} alt="img" />
          <h1 className="text-xl lg:text-3xl w-full text-white font-bold font-serif translat">
            Search Your Favourite Images & Download
          </h1>
        </div>
        <div
          className={
            results
              ? "p-5 ml-3 mt-3 font-serif text-2xl font-bold dark:text-white"
              : "hidden"
          }
        >
          showing results of: {results}
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full p-5">
          {image.map((img) => (
            <Card
              key={img?.id}
              links={img?.urls?.small}
              owner={img?.user?.name}
              profile={img?.user?.profile_image?.small}
              likes={img?.likes}
              setHide={setHide}
              id={img?.id}
              setId={setId}
            />
          ))}
          ;
        </div>
        {/* popup card */}
        <div className={hide ? "hidden" : "modal"}>
          <div
            className="relative w-[80%] h-auto mx-auto mt-8 p-5 rounded-xl 
           bg-white dark:bg-slate-700 text-black dark:text-white"
          >
            <div className="relative">
              <img
                className="w-full h-[400px] object-cover  mx-auto "
                src={singleImage[0]?.urls?.full}
                alt="image"
              />

              <button
                type="button"
                onClick={() => downloadImage(photo, _id)}
                className="absolute w-40 h-10 rounded-md text-white bg-green-500 bottom-1 right-2 "
              >
                Download
              </button>
            </div>
            <div
              onClick={() => setHide(true)}
              className="absolute -top-3 -right-2 w-10 h-10 rounded-full bg-gray-300 flex justify-center"
            >
              <span className="text-white hover:text-red-500 text-2xl">
                &#10540;
              </span>
            </div>
            <h2 className="text-2xl text-gray-700 dark:text-white  font-semibold mt-2  px-1 md:px-12 font-serif">
              {singleImage[0]?.alt_description}
            </h2>
            <div className="flex items-center justify-between px-0 md:px-9 ">
              <div className="flex gap-2 items-center w-[300px] md:w-full overflow-auto p-2 ">
                <img
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  src={singleImage[0]?.user?.profile_image?.small}
                />
                <h2 className="text-lg font-bold">
                  {singleImage[0]?.user?.name}
                </h2>
                <div className="flex md:flex-row gap-1 flex-col">
                  <h2 className="ml-2 text-lg font-semibold text-gray-500 italic">
                    <a
                      target="blank"
                      href={singleImage[0]?.user?.social?.portfolio_url}
                    >
                      //Portfolio
                    </a>
                  </h2>
                  <h2 className="ml-2 text-lg font-semibold text-gray-500 italic">
                    <a target="blank" href={insta_url}>
                      //instagram
                    </a>
                  </h2>
                </div>
              </div>
              <div className="flex gap-5 md:w-[300px]">
                <h2 className="md:block hidden text-md font-semibold text-gray-500 dark:text-white">
                  Total photos: {singleImage[0]?.user?.total_photos}
                </h2>
                <h2 className="text-md font-semibold text-gray-500 dark:text-white">
                  &#9825; {singleImage[0]?.likes}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* popup card */}
      </div>
    </div>
  );
}

export default App;
