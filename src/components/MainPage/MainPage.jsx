import { useState, useEffect, useRef } from "react";
import "./main-page.css";

import cup from "./../../assets/images/cup/TASSE 1.png";
import backgroundImg from "../../assets/images/background/JOUR DEFFINITIF.jpg";

export default function MainPage() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Ces valeurs représentent les coordonnées exactes où vous voulez placer la tasse sur l'image de fond
  // const cupPosition = { x: 0.1641, y: 0.3791 }; // 40% depuis la gauche, 30% depuis le haut

  // const cupStyle = {
  //   position: 'absolute',
  //   left: `${cupPosition.x * 100}%`,
  //   top: `${cupPosition.y * 100}%`,
  //   width: `${15 * containerSize.width / 100}px`,
  //   maxWidth: '330px',
  //   height: 'auto',
  //   transform: 'translate(-50%, -50%)',
  //    // Centre l'image par rapport à son point de référence
  // };

  return (
    <div className="contain" ref={containerRef}>
      <img className="background" src={backgroundImg} alt="Background" />
      <img className="cup" src={cup}  alt="Cup" />
    </div>
  );
}