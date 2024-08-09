import "./lecteur.css";

import play from "./../../assets/images/lecteur/BOUTON LECTURE.png";
import pause from "./../../assets/images/lecteur/BOUTON PAUSE.png";

export default function Lecteur({ isPlaying, togglePlayPause, audioRef, son }) {
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
