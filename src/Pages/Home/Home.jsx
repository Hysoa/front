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
        if (isMobileDevice()) {
          document.documentElement.requestFullscreen?.();
        }
      }, 7000);
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [isHeld, navigate]);

  const handleInteractionStart = () => {
    setIsHeld(true);
    setHoldTime(Date.now());
  };

  const handleInteractionEnd = () => {
    setIsHeld(false);
    const timeHeld = Date.now() - holdTime;
    if (timeHeld < 7000) {
      if (isMobileDevice()) {
        document.documentElement.requestFullscreen?.();
      }
      navigate("/home");
    }
  };

  return (
    <div className="overflow-hidden relative h-screen flex flex-col justify-center items-center">
      <img
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        className="transition-transform duration-500 transform hover:scale-110 sm:h-96 lg:h-full"
        src={homeImage}
        alt="Home Logo"
      />
    </div>
  );
}
