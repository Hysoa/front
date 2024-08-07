import { useState } from "react";
import { motion } from "framer-motion";
import "./shop.css";

import bg from "./../../assets/images/menu/FOND VIDE.png";
import sleepwel from "./../../assets/images/album/sleepwell.jpg";
import itcould from "./../../assets/images/album/itcould.jpg";
import detailSleep from "./../../assets/images/album/details/sleepwell.png";
import detailIt from "./../../assets/images/album/details/itcould.png";
import fleche from "./../../assets/images/buttons/fleche.png";

export default function Shop() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleReturn = () => {
    setSelectedAlbum(null);
  };

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Shop"
    >
      {!selectedAlbum && (
        <section className="relative">
          <img className="bg-album" src={bg} />
          <img
            src={sleepwel}
            onClick={() => handleAlbumClick("sleepwel")}
            alt="Sleepwell Album"
            className="album__img"
          />
          <img
            src={itcould}
            onClick={() => handleAlbumClick("itcould")}
            alt="It Could Album"
            className="album__img"
          />
        </section>
      )}

      {selectedAlbum && (
        <section className="album__details-container">
          {selectedAlbum === "sleepwel" && (
            <section className="album__details">
              <img
                className="detail-img"
                src={detailSleep}
                alt="Sleepwell Details"
              />
              <div className="album__navigation">
                <img onClick={handleReturn} src={fleche} alt="Arrow" />
                <div>
                  <p>Ecouter</p>
                  <p>Acheter</p>
                </div>
              </div>
            </section>
          )}
          {selectedAlbum === "itcould" && (
            <section className="album__details">
              <img
                className="detail-img"
                src={detailIt}
                alt="It Could Details"
              />
              <div className="album__navigation">
                <img onClick={handleReturn} src={fleche} alt="Arrow" />
                <div>
                  <p>Ecouter</p>
                  <p>Acheter</p>
                </div>
              </div>
            </section>
          )}
        </section>
      )}
    </motion.div>
  );
}
