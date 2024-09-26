import "./clip.css";
import { useState } from "react";
import { motion } from "framer-motion";

import bg from "../../assets/images/menu/FOND VIDE.png";

const clips = [
  {
    title: "DIRTY SHOCK",
    url: "https://www.youtube.com/embed/hMlYhr_8pI0"
  },
  {
    title: "JUNE",
    url: "https://www.youtube.com/embed/xyko7vWflAs",
  },
  {
    title: "BLUELIGHT",
    url: "https://www.youtube.com/embed/RymOqLXujtw",
  },
  {
    title: "SLEEP WELL",
    url: "https://www.youtube.com/embed/LBUcByh-G7s",
  },
  {
    title: "DUST",
    url: "https://www.youtube.com/embed/z5Zy5D0lF7g",
  },
  {
    title: "COLDSHOWER",
    url: "https://www.youtube.com/embed/V6so-hlqJvg",
  },
  {
    title: "FIVE YEARS LATER",
    url: "https://www.youtube.com/embed/iKlk0fjMvrU",
  },
  {
    title: "PINKY SWEAR",
    url: "https://www.youtube.com/embed/6ifm9uUAAyc",
  },
  {
    title: "DREAMCATCHER",
    url: "https://www.youtube.com/embed/4cR2H3Eu-44",
  },
];

export default function Clip() {
  const [selectedClip, setSelectedClip] = useState(clips[0].url);
  const [selectedTitle, setSelectedTitle] = useState(clips[0].title);
  const [activeIndex, setActiveIndex] = useState(0); // Ajouté pour gérer l'état actif
  const [fadeClass, setFadeClass] = useState("fade-in"); // Ajouté pour gérer l'animation

  const handleChoice = (clip, index) => {
    setSelectedClip(clip.url);
    setSelectedTitle(clip.title);
    setActiveIndex(index); // Définir l'index actif
    setFadeClass(""); // Réinitialiser l'animation

    // Forcer le rechargement de l'animation en mettant une petite pause
    setTimeout(() => {
      setFadeClass("fade-in");
    }, 10);
  };

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
        <div className="buttons flex flex-wrap gap-y-5 2xl:gap-5 pt-[7vw] px-[10vw] text-4xl 4xl:text-6xl">
          {clips.map((clip, index) => (
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
