import React from "react";
import "./Hero.css";
import Logo from "../../Assets/Logos/KL logotype White.png";

const HeroSection = () => {
  return (
    <div className="hero-container" id="home">
      <video className="hero-video" playsInline autoPlay loop muted>
        <source
          // src="https://res.cloudinary.com/dv2w3pig9/video/upload/v1734786212/tcwhgy03wci91qjtgwov.mp4"
          src="https://res.cloudinary.com/dv2w3pig9/video/upload/v1742495071/Hero%20Video/akcuw2cwk8uomye8lka4.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <img src={Logo} alt="" srcset="" />
          {/* Karta Lucia */}
          </h1>
      </div>
    </div>
  );
};

export default HeroSection;
