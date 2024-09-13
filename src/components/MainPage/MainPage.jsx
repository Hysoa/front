import "./main-page.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";

import play from "./../../assets/images/lecteur/BOUTON LECTURE.png";
import pause from "./../../assets/images/lecteur/BOUTON PAUSE.png";
import switchOn from "./../../assets/images/buttons/BOUTON NUIT ON.webp";
import switchOff from "./../../assets/images/buttons/BOUTON NUIT OFF.webp";

import cupConcert from "./../../assets/images/cup/cupConcert.png";
import cupJoin from "./../../assets/images/cup/cupJoin.png";
import cupLivre from "./../../assets/images/cup/cupBooks.png";
import cupClips from "./../../assets/images/cup/cupClips.png";
import cupShop from "./../../assets/images/cup/cupShop.png";
import cupBioL from "./../../assets/images/cup/cupBioL.png";
import cupBio from "./../../assets/images/cup/cupBio.png";

import jour from "../../assets/images/background/jour.webp";
import nuit from "../../assets/images/background/nuit.webp";

import { AppContext } from "../../App";

export default function MainPage() {
  const { isPlaying, setIsPlaying, isDay, setIsDay } = useContext(AppContext);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="image-wrapper relative"
    >
      <div className="image-container">
        {!isDay && (
          <img src={nuit} alt="background" className="background-image" />
        )}
        {isDay && (
          <img src={jour} alt="background" className="background-image" />
        )}
        <div className="flex relative w-full">
          <section className="button-container p-5">
            <button
              className="main-page-play-button"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <img src={!isPlaying ? play : pause} alt="" />
            </button>
            <button
              className="main-page-switch-button"
              onClick={() => setIsDay(!isDay)}
            >
              <img src={!isDay ? switchOff : switchOn} alt="" />
            </button>
          </section>
          <Link to="/concert">
            <img src={cupConcert} alt="cup" className="cup top-[18.2vw] left-[15.9vw]" />
          </Link>
          <Link to="/join">
            <img src={cupJoin} alt="cup" className="cup top-[40.6vw] left-[71.1vw]" />
          </Link>
          <Link to="/livre">
            <img src={cupLivre} alt="cup" className="cup top-[8.3vw] left-[43.1vw]" />
          </Link>
          <Link to="/clip">
            <img src={cupClips} alt="cup" className="cup top-[2.7vw] left-[35.1vw]" />
          </Link>
          <Link to="/shop">
            <img src={cupShop} alt="cup" className="cup top-[21.2vw] left-[73.1vw]" />
          </Link>
          <Link to="/about">
            <img src={cupBioL} alt="cup" className="cup top-[35.3vw] left-[37.8vw]" />
          </Link>
          <Link to="/about">
            <img src={cupBio} alt="cup" className="cup top-[35.1vw] left-[49.73vw]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
