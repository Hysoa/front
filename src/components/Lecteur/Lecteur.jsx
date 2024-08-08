import { useState, useRef } from "react";

import "./lecteur.css";

import son from "./../../assets/son/ZIK BOUCLE JOUR.mp3";
import play from "./../../assets/images/lecteur/BOUTON LECTURE.png";
import pause from "./../../assets/images/lecteur/BOUTON PAUSE.png";

export default function Lecteur() {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <audio ref={audioRef} src={son} loop />
      <div className="controls">
        <button onClick={togglePlayPause}>
          <img src={!isPlaying ? play : pause} alt="" />
        </button>
      </div>
    </div>
  );
}
