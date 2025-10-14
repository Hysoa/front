import "./clip.css";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import http from "../../utils/http";

import bg from "../../assets/images/menu/FOND VIDE.png";

export default function Clip() {
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState();
  const [activeIndex, setActiveIndex] = useState(0); // Ajouté pour gérer l'état actif
  const [fadeClass, setFadeClass] = useState("fade-in"); // Ajouté pour gérer l'animation

  const getAllClips = useCallback(
    async () =>
      http()
        .get("clip/getAll")
        .then((response) => response.status === 200 && response.data)
        .then(({ clips }) => {
          setClips(clips);
        })
        .catch((error) => console.error(error)),
    [setClips]
  );

  const handleChoice = (clip, index) => {
    setSelectedClip(clip.url);
    setActiveIndex(index); // Définir l'index actif
    setFadeClass(""); // Réinitialiser l'animation

    // Forcer le rechargement de l'animation en mettant une petite pause
    setTimeout(() => {
      setFadeClass("fade-in");
    }, 10);
  };

  useEffect(() => {
    if (clips.length === 0) {
      getAllClips();
    } else {
      console.log(clips[0]);
      setSelectedClip(clips[0].url);
    }
  }, [clips, getAllClips]);

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Shop"
    >
      <section
        className="relative h-[40vw] w-[70vw]"
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="buttons flex flex-wrap gap-y-3 2xl:gap-5 pt-[7vw] px-[10vw] text-xl xl:text-4xl">
          {clips
            .sort((a, b) => a.order > b.order)
            .map((clip, index) => (
              <button
                onClick={() => handleChoice(clip, index)}
                key={index}
                className={index === activeIndex ? "active" : ""}
              >
                {clip.title}
              </button>
            ))}

          
        </div>
        <section className="flex flex-col items-center mt-[1vw] 3xl:mt-[5vw]">
          <div className={`iframe-container ${fadeClass}`}>
            <iframe
              src={selectedClip}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-[32vw] h-[18vw]"
            ></iframe>
          </div>
        </section>
      </section>
    </motion.div>
  );
}
