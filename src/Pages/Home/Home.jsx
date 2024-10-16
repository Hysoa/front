import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../../assets/images/logo/LOGO HYSOA DEFINITIF.png";

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function Home() {
  const navigate = useNavigate();
  const [isHeld, setIsHeld] = useState(false);
  const [holdTime, setHoldTime] = useState(null);

  useEffect(() => {
    let timer;
    if (isHeld) {
      timer = setTimeout(() => {
        navigate("/admin");
        isMobileDevice && document.documentElement.requestFullscreen();
      }, 5000); // 7000 ms = 7 secondes
    } else {
      clearTimeout(timer); // Annule le timer si on relâche le clic avant les 7 secondes
    }

    return () => clearTimeout(timer); // Nettoyage si le composant est démonté ou si l'état change
  }, [isHeld]);

  const handleMouseDown = () => {
    setIsHeld(true);
    setHoldTime(Date.now());
  };

  const handleMouseUp = () => {
    setIsHeld(false);
    const timeHeld = Date.now() - holdTime;
    if (timeHeld < 7000) {
      isMobileDevice() && document.documentElement.requestFullscreen();
      navigate("/home");
    }
  };

  return (
    <div className="overflow-hidden relative h-screen flex flex-col justify-center items-center">
      <img
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="transition-transform duration-500 transform hover:scale-110 sm:h-96 lg:h-full"
        src={homeImage}
        alt=""
      />
    </div>
  );
}
