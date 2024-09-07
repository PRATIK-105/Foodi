import React from 'react';
import { FaPlay } from 'react-icons/fa6';

function Hero() {
  return (
    <div className=" max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC]">
      <div className="py-12 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="md:w-1/2 space-y-10 px-4">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug md:leading-snug w-4/5">
            Dive into Delights Of Delectable
            <span className="text-greenish"> Food</span>
          </h2>

          <p className="text-blue-950 font-medium w-2/3">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>

          <button className="bg-greenish rounded-full text-white font-semibold px-7 py-3">
            <a href='/menu'>
            Order Now
            </a>
          </button>
        </div>

        <div className="md:w-1/2">
          <img src="./images/home/banner.png" alt="" />

          <div className="-mt-16">
            <div
              className="absolute flex flex-col md:flex-row 
            items-center justify-around w-64 shadow-lg rounded-2xl px-2 py-2 bg-white"
            >
              <img
                className="rounded-2xl"
                src="/images/home/b-food1.png"
                alt="Spicy noodles"
              />
              <div className="ml-4 ">
                <p className="font-semibold">Spicy noodles</p>
                <div className="rating md:rating-sm ">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p className=" text-red-500">$18.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
