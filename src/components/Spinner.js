import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div class="spinner ">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <p className=" text-grey-200 pt-28 -ml-12">Loading....</p>
    </div>
  );
}

export default Spinner;
