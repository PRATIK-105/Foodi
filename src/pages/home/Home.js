import React from "react";
import Hero from "../../components/Hero";
import Catagories from "./Catagories";
import Dishes from "./Dishes";
import Testimonials from "./Testimonials";
import OurStory from "./OurStory";

function Home() {
  return (
    <div>
      <Hero/>
      <Catagories/>
      <Dishes/>
      <Testimonials/>
      <OurStory/>
    </div>
  )
}
export default Home;
