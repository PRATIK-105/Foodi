import React from "react";

function OurStory() {
  const serviceLists = [
    {
      id: 1,
      title: "Catering",
      des: "Delight your guests with our flavors and presentation",
      img: "/images/home/services/icon1.png",
    },
    {
      id: 2,
      title: "Fast delivery",
      des: "We deliver your order promptly to your door",
      img: "/images/home/services/icon2.png",
    },
    {
      id: 3,
      title: "Online Ordering",
      des: "Explore menu & order with ease using our Online Ordering",
      img: "/images/home/services/icon3.png",
    },
    {
      id: 4,
      title: "Gift Cards",
      des: "Give the gift of exceptional dining with Foodi Gift Cards",
      img: "/images/home/services/icon4.png",
    },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-[#FCFCFC] pb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
      <div className="w-full md:w-1/2">
        <div className="mt-20">
          <p className="text-red-500 pt-10 tracking-widest uppercase">
            OUR STORY & SERVICES
          </p>
          <p className="mt-10 text-4xl font-bold md:w-4/5">
            Our Culinary Journey And Services
          </p>

          <p className="pt-10 leading-[25px] md:w-4/5 text-gray-500">
            Rooted in passion, we curate unforgettable dining experiences and
            offer exceptional services, blending culinary artistry with warm
            hospitality.
          </p>
          <button className="bg-greenish rounded-full text-white font-semibold px-8 py-3 mt-10">
            Explore
          </button>
        </div>
      </div>

      <div className="md:w-1/2 mt-16">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 pt-16 items-center text-greenish">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-xl py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold text-green-700"> {service.title}</h5>
                            <p>{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  );
}

export default OurStory;
