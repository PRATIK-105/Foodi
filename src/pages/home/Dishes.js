import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Dishes() {
  const [dish, setDish] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setDish(specials);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC]">
      <p className="text-red-500  pt-10 tracking-widest uppercase">
        SPECIAL DISHES
      </p>
      <div className="flex justify-between mb-10 mr-10">
        <p className="mt-4 text-4xl font-bold w-1/4 ">
          Standout Dishes From Our Menu
        </p>

        <div>
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="btn p-2 rounded-full ml-5"
          >
            {" "}
            <GrFormPrevious className="w-8 h-8 p-1" />{" "}
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="btn p-2 rounded-full bg-greenish ml-1"
          >
            {" "}
            <GrFormNext className="w-8 h-8 p-1" />{" "}
          </button>
        </div>
      </div>

      <Slider ref={slider} {...settings}>
        {dish.map((item, i) => (
          <Cards key={i} item={item} scaleEffect={true} />
        ))}
      </Slider>
    </div>
  );
}

export default Dishes;
