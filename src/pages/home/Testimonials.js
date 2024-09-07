import React from "react";
import { FaStar } from "react-icons/fa6";

function Testimonials() {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 pt-10 md:pt-24">
          <img
            className="h-[650px] ml-20"
            src="./images/home/testimonials/testimonials.png"
            alt=""
          />
        </div>
        
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <p className="text-red-500 tracking-widest uppercase text-center md:text-left">TESTIMONIALS</p>
          <p className="mt-10 text-4xl font-bold w-full md:w-4/5 text-center md:text-left">
            What Our Customers Say About Us
          </p>
          <p className="pt-10 leading-[25px] text-gray-500 w-full md:w-4/5 text-center md:text-left">
            “I had the pleasure of dining at Foodi last night, and I'm still raving about the experience! The attention to detail in presentation and service was impeccable.”
          </p>
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-4 pt-10 md:pt-16">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-16 md:w-20">
                    <img src="./images/home/testimonials/testimonial1.png" alt="" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-16 md:w-20">
                    <img src="./images/home/testimonials/testimonial2.png" alt="" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-16 md:w-20">
                    <img src="./images/home/testimonials/testimonial3.png" alt="" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="font-bold">Customer Feedback</h1>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400"/>
                  <span>4.9</span> <span className="text-gray-500">(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
