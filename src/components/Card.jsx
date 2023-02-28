import React, { useState } from "react";

const Card = ({ links, owner, likes, profile, setHide, id, setId }) => {
  const handleClick = () => {
    setId(id);
    setHide(false);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      className="bg-white dark:bg-slate-700 m-2 md:m-2 p-5 
      w-[96%] lg:w-[300px] md:w-[250px] min-h-max sm:w-[300px] shadow-xl"
    >
      <img
        onClick={handleClick}
        data-aos="slide-right"
        className="w-[96%] md:w-full sm:h-[300px] h-auto rounded-md shadow-md  object-cover mx-auto"
        src={links}
        alt="image"
      />

      <div className="mt-3 flex justify-between items-center w-full h-auto">
        <div className=" flex justify-start items-center">
          <span>
            <img
              className="w-10 h-10 ring-1 rounded-full object-cover shadow-md"
              src={profile}
              alt="image"
            />
          </span>
          <span className="text-gray-800 dark:text-white  font-mono ml-2 w-auto md:w-[150px] overflow-auto">
            {owner}
          </span>
        </div>
        <span className="font-semibold text-md text-gray-700 dark:text-white">
          &#9825; {likes}
        </span>
      </div>
    </div>
  );
};

export default Card;
