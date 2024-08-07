import { motion } from "framer-motion";
import "./join.css";

import bg from "./../../assets/images/menu/FOND VIDE.png";
import deezer from "./../../assets/images/reseaux/DEEZER.png";
import spotify from "./../../assets/images/reseaux/SPOTIFY.png";
import apple from "./../../assets/images/reseaux/ITUNES.png";
import youtube from "./../../assets/images/reseaux/YOUTUBE.png";
import facebook from "./../../assets/images/reseaux/FACEBOOK.png";
import tiktok from "./../../assets/images/reseaux/TIKTOK.png";
import instagram from "./../../assets/images/reseaux/INSTA.png";
import mainlogo from "../../assets/images/logo/LOGO HYSOA DEFINITIF.png";

export default function Join() {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Join"
    >
      <section className="w-full">
        <img className="bg-join" src={bg} />
        <article className="main-container flex flex-col items-center justify-around">
          <h2 className="text-white">JOIN US</h2>
          <div className="logo-top-container flex justify-between">
            <a target="_blank" href="https://www.instagram.com/HysoaMusic">
              <img src={instagram} alt="" />
            </a>
            <a target="_blank" href="https://www.facebook.com/HysoaMusic">
              <img src={facebook} alt="" />
            </a>
            <a target="_blank" href="https://www.youtube.com/@hysoamusic">
              <img src={youtube} alt="" />
            </a>
            <a target="_blank" href="https://www.tiktok.com/@hysoahysoa">
              <img src={tiktok} alt="" />
            </a>
          </div>
          <div className="logo-bottom-container flex justify-around">
            <a
              target="_blank"
              href=" https://www.deezer.com/fr/artist/12057132"
            >
              <img src={deezer} alt="" />
            </a>
            <a
              target="_blank"
              href="https://open.spotify.com/intl-fr/album/415IcfQrWr6mbQk5lIaEQm"
            >
              <img src={spotify} alt="" />
            </a>
            <a
              target="_blank"
              href="http://itunes.apple.com/album/id1738668120?ls=1&app=itunes"
            >
              <img src={apple} alt="" />
            </a>
          </div>
          <h3 className="text-white">Nous Contacter :</h3>
          <img className="bottom-logo" src={mainlogo} alt="" />
        </article>
      </section>
    </motion.div>
  );
}
