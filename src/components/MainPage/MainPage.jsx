import "./main-page.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Lecteur from "./../Lecteur/Lecteur";

import cupConcert from "./../../assets/images/cup/cupConcert.png";
import cupJoin from "./../../assets/images/cup/cupJoin.png";
import cupLivre from "./../../assets/images/cup/cupBooks.png";
import cupClips from "./../../assets/images/cup/cupClips.png";
import cupShop from "./../../assets/images/cup/cupShop.png";
import cupBioL from "./../../assets/images/cup/cupBioL.png";
import cupBio from "./../../assets/images/cup/cupBio.png";

import jour from "../../assets/images/background/jour.webp";
import nuit from "../../assets/images/background/nuit.webp";

export default function MainPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="image-wrapper"
    >
      <div className="image-container">
        <img src={nuit} alt="background" className="background-image night" />
        <img src={jour} alt="background" className="background-image" />
        <div className="cup-container">
          <Lecteur />
          <Link to="/concert">
            <img src={cupConcert} alt="cup" className="cup cup-concert" />
          </Link>
          <Link to="/join">
            <img src={cupJoin} alt="cup" className="cup cup-join" />
          </Link>
          <Link to="/livre">
            <img src={cupLivre} alt="cup" className="cup cup-livre" />
          </Link>
          <Link to="/clip">
            <img src={cupClips} alt="cup" className="cup cup-clip" />
          </Link>
          <Link to="/shop">
            <img src={cupShop} alt="cup" className="cup cup-shop" />
          </Link>
          <Link to="/about">
            <img src={cupBioL} alt="cup" className="cup cup-about-l" />
          </Link>
          <Link to="/about">
            <img src={cupBio} alt="cup" className="cup cup-about-r" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
