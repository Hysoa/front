import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./shop.css";

import bg from "./../../assets/images/menu/FOND VIDE.png";
import sleepwel from "./../../assets/images/album/sleepwell.jpg";
import itcould from "./../../assets/images/album/itcould.jpg";
import detailSleep from "./../../assets/images/album/details/sleepwell.png";
import detailIt from "./../../assets/images/album/details/itcould.png";
import fleche from "./../../assets/images/buttons/fleche.png";

const albums = {
  sleepwell: "Sleep Well",
  itcould: "It Could Be Worse",
};

export default function Shop() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [cover, setCover] = useState(null);
  const [linkToListen, setLinkToListen] = useState(null);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleReturn = () => {
    setSelectedAlbum(null);
  };

  useEffect(() => {
    switch (selectedAlbum) {
      case "sleepwell":
        setCover(detailSleep);
        setLinkToListen("https://youtu.be/3PL75Iz0oR8?si=gtvTG0bsw7AyxQzN");
        break;
      case "itcould":
        setCover(detailIt);
        setLinkToListen("https://youtu.be/0fuO1YpuT4M?si=CI-pAle5dAtwelsp");
        break;
      default:
        setCover(null);
    }
  }, [selectedAlbum]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      const sessionId = query.get("session_id");
      fetch(`${import.meta.env.VITE_API_URL}/checkout/getSharedLink/${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(({ sharedLink }) => {
          const encodedURL = encodeURI(sharedLink);
          const handleDownload = () => {
            window.location.href = encodedURL;
          };
          handleDownload();
          setTimeout(() => {
            window.location.href = "/shop";
          }, 1000)
        });
    }

    if (query.get("canceled")) {
      alert(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [selectedAlbum]);

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
            src={itcould}
            onClick={() => handleAlbumClick("itcould")}
            alt="It Could Album"
            className="album__img"
          />
          <img
            src={sleepwel}
            onClick={() => handleAlbumClick("sleepwell")}
            alt="Sleepwell Album"
            className="album__img"
          />
        </section>
      )}

      {selectedAlbum && (
        <section className="album__details-container">
          <section className="album__details relative">
            <img className="detail-img" src={cover} alt="Sleepwell Details" />
            <div className="album__navigation">
              <img onClick={handleReturn} src={fleche} alt="Arrow" />
              <form
                action={`${
                  import.meta.env.VITE_API_URL
                }/checkout/createSession?album=${albums[selectedAlbum]}`}
                method="POST"
                className="absolute flex text-white left-[-3vw] top-[32vw] w-[7vw] px-3 py-2 text-2xl bg-black/50 justify-between rounded-xl"
              >
                <p
                  onClick={() => window.open(linkToListen, "_blank")}
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                >
                  Ecouter
                </p>
                <button
                  type="submit"
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                >
                  Acheter
                </button>
              </form>
            </div>
          </section>
        </section>
      )}
    </motion.div>
  );
}
