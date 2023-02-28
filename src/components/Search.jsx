import React, { useEffect } from "react";

const Search = ({
  setImage,
  searchvalue,
  setSearchvalue,
  searchdata,
  setSearchdata,
}) => {
  const SEARCH_URL = `https://api.unsplash.com/search/photos?page=1?landscape&query=${searchvalue}&client_id=FpUwErhBQNUwgh2ek0x-p0xsQANgmQ_i-SOlN5Rd_X8`;
  const handleClick = (item) => {
    setSearchvalue(item.alt_description);
    setImage(searchdata);
    setSearchvalue("");
  };
  useEffect(() => {
    function images() {
      fetch(SEARCH_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setSearchdata(data.results);
        });
    }
    return images();
  }, [searchvalue]);

  return (
    <div
      className="dark:bg-slate-700 bg-white dark:text-white
   text-black w-full h-auto rounded-md shadow-xl p-5"
    >
      <ul>
        {searchdata?.map((item) => (
          <li
            onClick={() => handleClick(item)}
            className="text-lg font-semibold p-1"
            key={item?.id}
          >
            {item?.alt_description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
