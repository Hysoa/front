import { useState, useEffect, useRef } from "react";
import "./main-page.css";

import cupConcert from "./../../assets/images/cup/cupConcert.png";
import cupJoin from "./../../assets/images/cup/cupJoin.png";
import cupLivre from "./../../assets/images/cup/cupBooks.png";
import cupClips from "./../../assets/images/cup/cupClips.png";
import cupShop from "./../../assets/images/cup/cupShop.png";
import cupBioL from "./../../assets/images/cup/cupBioL.png";
import cupBio from "./../../assets/images/cup/cupBio.png";

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
        <div className="cup-container">
          <a href="/concert">
            <img src={cupConcert} alt="cup" className="cup cup-concert" />
          </a>
          <a href="/join">
            <img src={cupJoin} alt="cup" className="cup cup-join" />
          </a>
          <a href="/livre">
            <img src={cupLivre} alt="cup" className="cup cup-livre" />
          </a>
          <a href="/clip">
            <img src={cupClips} alt="cup" className="cup cup-clip" />
          </a>
          <a href="/shop">
            <img src={cupShop} alt="cup" className="cup cup-shop" />
          </a>
          <a href="/about">
            <img src={cupBioL} alt="cup" className="cup cup-about-l" />
          </a>
          <a href="/about">
            <img src={cupBio} alt="cup" className="cup cup-about-r" />
          </a>
        </div>
      </div>
    </div>
  );
}
