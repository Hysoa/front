import { useState, useEffect, useRef } from "react";
import "./main-page.css";

import cup from "./../../assets/images/cup/TASSE 1.png";
import backgroundImg from "../../assets/images/background/JOUR DEFFINITIF.jpg";

export default function MainPage() {
  return (
    <div className="image-wrapper">
      <div className="image-container">
        <img
          src={backgroundImg}
          alt="background"
          className="background-image"
        />
        {/* <div className="cup-container absolute">
          <img src={cup} alt="cup" className="cup-image" />
        </div> */}
      </div>
    </div>
  );
}
