import React from "react";
import image from "../../Images/home.jpg";
import "./Homepage.css";
import LightSpeed from "react-reveal/LightSpeed";

const Homepage = () => {
  return (
    <div
      id="home"
      className="bg-image"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LightSpeed top>
        <div className="px-5">
          <h1 className="fw-bold title animate-charcter">
            Assignment Website
          </h1>
          <h5 className="title-bottom">
            This is a demo Work !!!
          </h5>
        </div>
      </LightSpeed>
    </div>
  );
};

export default Homepage;