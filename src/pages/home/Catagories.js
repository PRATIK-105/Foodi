import React from "react";

function Categories() {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC] py-20">
      <div>
        <p className="text-red-500 text-center mt-10 tracking-widest uppercase">
          Customer Favorites
        </p>
        <p className="mt-3 text-4xl font-bold text-center">
          Popular Categories
        </p>
      </div>
      <div className="flex flex-wrap gap-10 justify-evenly mt-20">
        {[
          { img: "img1.png", title: "Main Dish", count: " (86 Dishes)" },
          { img: "img2.png", title: "Break Fast", count: "(12 break fast)" },
          { img: "img3.png", title: "Dessert", count: "(22 dessert)" },
          { img: "img4.png", title: "Browse All", count: "(255 items)" },
        ].map((category, index) => (
          <div
            key={index}
            className="flex flex-col  items-center bg-white shadow-md rounded-2xl py-5 px-12 transition-transform transform hover:scale-105"
          >
            <div className="rounded-full w-32 h-32 bg-green-200 flex items-center justify-center ">
              <img src={`./images/home/category/${category.img}`} alt={`${category.title} `} className="w-24 h-24 object-contain" />
            </div>
            <h1 className="text-xl font-semibold mt-3">{category.title}</h1>
            <h1 className="text-gray-500 mt-1">{category.count}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
