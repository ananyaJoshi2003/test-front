// Loader.js
import React from "react";
import "./Loader.css"; // Style for the loader

const Loader = () => {
  const mainText = "Karta Lucia";
  // const comingSoon = "(hiring soon)";

  const renderMainText = () => {
    return mainText.split(' ').map((word, i) => (
      <span key={i} className="word">
        {word.split('').map((char, j) => (
          <span key={j} className="letter" style={{ animationDelay: `${(i * word.length + j) * 0.1}s` }}>
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div className="loader-container">
      <div className="site-name-container">
        <div className="site-name">
          {renderMainText()}
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

export default Loader;