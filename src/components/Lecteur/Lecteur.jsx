import "./lecteur.css";
import { useRef, useContext, useEffect, useState } from "react";

import play from "../../assets/images/lecteur/BOUTON LECTURE.png";
import pause from "../../assets/images/lecteur/BOUTON PAUSE.png";

import sonDay from "./../../assets/son/ZIK BOUCLE JOUR.mp3";
import sonNight from "./../../assets/son/ZIK NUIT.mp3";

import { AppContext } from "../../App";

export default function Lecteur() {
  const { isPlaying, isDay } = useContext(AppContext);
  const [son, setSon] = useState(null);
  const audioRef = useRef(null);

  const togglePlayPause = (e) => {
    e.preventDefault();
    const audio = audioRef.current;
    isPlaying ? audio.pause() : audio.play();
  };

  useEffect(() => setSon(isDay ? sonDay : sonNight), [isDay]);

  useEffect(() => {
    if (!son) return;
    const audio = audioRef.current;
    audio.src = son;
    audio.load();
    if (isPlaying) {
      audio.play();
    }
  }, [son, isPlaying]);

  return (
    <div className="player">
      <audio ref={audioRef} loop />
      <div className="controls">
        <img src={!isPlaying ? play : pause} alt="" onClick={togglePlayPause} />
      </div>
    </div>
  );
}
