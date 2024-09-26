import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import "./shop.css";

import bg from "./../../assets/images/menu/FOND VIDE.png";
import sleepwel from "./../../assets/images/album/sleepwell.jpg";
import itcould from "./../../assets/images/album/itcould.jpg";
import detailSleep from "./../../assets/images/album/details/sleepwell.png";
import detailIt from "./../../assets/images/album/details/itcould.png";
import fleche from "./../../assets/images/buttons/fleche.png";

export default function Shop() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [cover, setCover] = useState(null);
  const [linkToListen, setLinkToListen] = useState(null);
  const [selectPurshase, setSelectPurshase] = useState(false);
  const purshaseSelectRef = useRef(null);
  const [purshaseValidationMessage, setPurshaseValidationMessage] = useState();
  const [receivedLinks, setReceivedLinks] = useState(false);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleReturn = () => {
    setSelectedAlbum(null);
  };

  const handleBuy = (purshaseType) => {
    console.log("là");
    fetch(`${import.meta.env.VITE_API_URL}/checkout/createSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        album: selectedAlbum,
        purshaseType,
      }),
    })
      .then((response) => response.json())
      .then(({ url }) => {
        window.location.href = url;
      });
  };

  const handleClickOutside = (event) => {
    if (
      purshaseSelectRef.current &&
      !purshaseSelectRef.current.contains(event.target) &&
      event.target.id !== "purshase"
    ) {
      setSelectPurshase(false);
    }
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
    if (!receivedLinks) {
      const query = new URLSearchParams(window.location.search);
      if (query.get("success")) {
        const sessionId = query.get("session_id");
        fetch(
          `${import.meta.env.VITE_API_URL}/checkout/getSharedLink/${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(({ purshaseType, downloadAlbums }) => {
            if (purshaseType !== "shipping") {
              if (downloadAlbums) {
                const encodedUri = downloadAlbums.map((album) =>
                  encodeURI(album.link)
                );
                
                setPurshaseValidationMessage(`
                  Merci pour votre achat ! Le téléchargement va bientôt démarrer.<br />
                  (Si le téléchargement ne démarre pas, téléchargez manuellement le contenu de votre achat:&nbsp;
                  ${downloadAlbums.map(
                    (album, index) =>
                      `<a class="underline" href="${
                        encodedUri[index]
                      }" target="_blank">${album.name}</a>${
                        index !== downloadAlbums.length - 1 ? ", " : ")"
                      }`
                  ).join("")}
                `);

                encodedUri.forEach((link) => {
                  window.open(link, "_blank");
                });

                setReceivedLinks(true);
              } else {
                setPurshaseValidationMessage(`
                  Merci pour votre achat, mais une erreur est survenue lors de la récupération du lien de téléchargement...
                  \nVeuillez contacter nous contacter et nous communiquer le numéro de commande suivant: ${sessionId}
                `);
              }
            } else {
              setPurshaseValidationMessage(`
                Merci pour votre achat !<br />
                Votre commande sera traitée dans les plus brefs délais!
              `);
            }
          });
      }
    }
  }, [purshaseValidationMessage, receivedLinks]);

  useEffect(() => {
    if (selectPurshase) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectPurshase]);

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
          {purshaseValidationMessage && (
            <div
              className="absolute top-[5em] left-[20em] w-[40em] text-white text-2xl text-center"
              dangerouslySetInnerHTML={{ __html: purshaseValidationMessage }}
            />
          )}
          <img className="bg-album" src={bg} />
          <img
            src={sleepwel}
            onClick={() => handleAlbumClick("sleepwell")}
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
          <section className="album__details relative">
            <img className="detail-img" src={cover} alt="Sleepwell Details" />
            <div className="album__navigation">
              <img onClick={handleReturn} src={fleche} alt="Arrow" />
              <div className="absolute flex text-white left-[-3vw] top-[32vw] px-3 py-2 text-2xl bg-black/50 justify-between rounded-xl">
                <div
                  onClick={() => window.open(linkToListen, "_blank")}
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                >
                  Ecouter
                </div>
                <div className="relative">
                  <span
                    id="purshase"
                    onClick={() => setSelectPurshase(!selectPurshase)}
                    className={cn(
                      "relative",
                      "hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]",
                      selectPurshase &&
                        "drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                    )}
                  >
                    Acheter
                  </span>

                  {selectPurshase && (
                    <ul
                      ref={purshaseSelectRef}
                      className="absolute bottom-[2.8em] left-[-0.2em] w-[9em] bg-black/50 p-3 rounded-xl"
                    >
                      <li
                        className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                        onClick={() => handleBuy("digital")}
                      >
                        Version numérique
                      </li>
                      <li
                        className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                        onClick={() => handleBuy("shipping-france")}
                      >
                        Livraison (France)
                      </li>
                      <li
                        className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                        onClick={() => handleBuy("shipping-international")}
                      >
                        Livraison (International)
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </motion.div>
  );
}
