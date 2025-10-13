import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import "./shop.css";

import bg from "./../../assets/images/menu/FOND VIDE.png";
import sleepwel from "./../../assets/images/album/sleepwell.jpg";
import itcould from "./../../assets/images/album/itcould.jpg";
import itwill from "./../../assets/images/album/itwill.png";
import detailSleep from "./../../assets/images/album/details/sleepwell.png";
import detailItCould from "./../../assets/images/album/details/itcould.png";
import detailItWill from "./../../assets/images/album/details/itwill.png";
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
    setCover(null);
    setLinkToListen(null);
  };

  const handleBuy = (purshaseType) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/checkout/createSession`, {
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

  const handleDownload = useCallback((encodedUri, downloadAlbums) => {
    setPurshaseValidationMessage(`
      Merci pour votre achat ! Le téléchargement va bientôt démarrer.<br />
      (Si le téléchargement ne démarre pas, téléchargez manuellement le contenu de votre achat:&nbsp;
      ${downloadAlbums
        .map(
          (album, index) =>
            `<a class="underline" href="${encodedUri[index]}" target="_blank">${
              album.name
            }</a>${index !== downloadAlbums.length - 1 ? ", " : ")"}`
        )
        .join("")}
    `);

    encodedUri.forEach((link) => {
      window.open(link, "_blank");
    });
    setReceivedLinks(true);
  }, []);

  useEffect(() => {
    switch (selectedAlbum) {
      case "sleepwell":
        setCover(detailSleep);
        setLinkToListen("https://youtu.be/3PL75Iz0oR8?si=gtvTG0bsw7AyxQzN");
        break;
      case "itcould":
        setCover(detailItCould);
        setLinkToListen("https://youtu.be/5LBdYEu1KhA?si=EPPtMLrEZTTGnuk8");
        break;
      case "itwill":
        setCover(detailItWill);
        setLinkToListen("https://youtu.be/8X2C3NQ0xdU?si=OzExmvNFmn97oDZ3");
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
                handleDownload(encodedUri, downloadAlbums);
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
      } else if (query.get("album")) {
        const album = query.get("album");
        setSelectedAlbum(
          ["sleepwell", "itcould"].includes(album) ? album : null
        );
      }
    }
  }, [receivedLinks, handleDownload]);

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
          <img className="mx-auto w-[60%]" src={bg} />
          {purshaseValidationMessage && (
            <div
              className="absolute top-[6vw] left-[16vw] w-[70vw] text-white text-sm lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl text-center"
              dangerouslySetInnerHTML={{ __html: purshaseValidationMessage }}
            />
          )}
          <div className="absolute flex flex-wrap justify-center top-[14vw] left-[25vw] 4xl:top-[6vw] 4xl:left-[17.5vw] w-[51vw] 4xl:w-[20vw] gap-[.2em] md:gap-[.5em] xl:gap-[1em]">
            <img
              src={sleepwel}
              onClick={() => handleAlbumClick("sleepwell")}
              alt="Sleepwell Album"
              className="h-[16vw] w-[16vw] 4xl:w-[16vw] 4xl:h-[16vw] hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
            />
            <img
              src={itcould}
              onClick={() => handleAlbumClick("itcould")}
              alt="It Could Album"
              className="h-[16vw] w-[16vw] 4xl:w-[16vw] 4xl:h-[16vw] hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
            />
            <img
              src={itwill}
              onClick={() => handleAlbumClick("itwill")}
              alt="It Could Album"
              className="h-[16vw] w-[16vw] 4xl:w-[16vw] 4xl:h-[16vw] hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
            />
          </div>
        </section>
      )}

      {selectedAlbum && (
        <section className="album__details-container">
          <section className="album__details relative">
            <img
              className="w-[70vw] xl:w-[50vw]"
              src={cover}
              alt="Sleepwell Details"
            />
            <div className="album__navigation top-0">
              <img
                onClick={handleReturn}
                src={fleche}
                alt="Arrow"
                className="absolute top-0 left-[-8vw] xl:top-[-1vw]"
              />
              <div className="absolute flex text-white left-[-6vw] xl:left-[-4vw] top-[41vw] xl:top-[29vw] !p-1 2xl:!p-3 4xl:!p-7 text-lg lg:text-xl 2xl:text-3xl 4xl:text-6xl bg-zinc-900/20 xl:bg-black/50 justify-between">
                <div
                  onClick={() => window.open(linkToListen, "_blank")}
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] !py-1 lg:!py-2"
                >
                  Ecouter
                </div>
                <div className="relative !p-1 lg:!p-2">
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
                      className="absolute bottom-[2.8em] left-[-0.2em] w-[9em] bg-black/50 p-3 4xl:p-6 rounded-xl"
                    >
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
