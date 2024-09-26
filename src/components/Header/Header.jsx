import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./header.css";

import logo from "./../../assets/images/logo/TITRE 2.png";

import perso1 from "./../../assets/images/perso/PERSO 1.png";
import perso2 from "./../../assets/images/perso/PERSO 2.png";
import perso3 from "./../../assets/images/perso/PERSO 3.png";
import perso4 from "./../../assets/images/perso/PERSO 4.png";
import perso5 from "./../../assets/images/perso/PERSO 5.png";
import perso6 from "./../../assets/images/perso/PERSO 6.png";
import perso7 from "./../../assets/images/perso/PERSO 7.png";

export default function Header() {
  const perso = [perso1, perso2, perso3, perso4, perso5, perso6, perso7];

  const location = useLocation();
  const [selectedPerso, setSelectedPerso] = useState(0);

  useEffect(() => {
    // Assume you have 7 predefined paths and each path corresponds to an index from 0 to 6
    const pathIndex = {
      "/bio": 1,
      "/livre": 2,
      "/concert": 3,
      "/shop": 4,
      "/join": 5,
      "/clip": 6,
    };

    const index = pathIndex[location.pathname];
    if (index !== undefined) {
      setSelectedPerso(index);
    } else {
      setSelectedPerso(1);
    }
  }, [location]);

  return (
    <header className="Header relative w-96">
      <img src={logo} className="logo" alt="Logo" />
      <img
        key={selectedPerso}
        src={perso[selectedPerso]}
        alt={`Perso ${selectedPerso + 1}`}
        className={`img-perso perso-${selectedPerso} absolute  w-60`}
      />
    </header>
  );
}
