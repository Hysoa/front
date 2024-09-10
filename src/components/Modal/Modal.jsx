import "./modal.css";

import { Link } from "react-router-dom";

import accueil from "./../../assets/images/etiquettes/accueil.png";
import bio from "./../../assets/images/etiquettes/bio.png";
import concert from "./../../assets/images/etiquettes/concert.png";
import livre from "./../../assets/images/etiquettes/books.png";
import shop from "./../../assets/images/etiquettes/shop.png";
import join from "./../../assets/images/etiquettes/join.png";
import clip from "./../../assets/images/etiquettes/clips.png";

const links = [
  { to: "/", label: "Home", image: accueil },
  { to: "/about", label: "About", image: bio },
  { to: "/livre", label: "Livre", image: livre },
  { to: "/concert", label: "Concert", image: concert },
  { to: "/shop", label: "Shop", image: shop },
  { to: "/join", label: "Join", image: join },
  { to: "/clip", label: "Clip", image: clip },
];

export default function Modal({ modalOn, setModalOn }) {
  return (
    <nav
      className={`nav-bar-lateral flex gap-11 flex-col absolute z-0 top-48 right-20 ${
        modalOn ? "active" : ""
      }`}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={location.pathname === link.to ? "active" : ""}
        >
          {link.image ? <img src={link.image} alt={link.label} /> : link.label}
        </Link>
      ))}
    </nav>
  );
}

// nav-bar flex gap-11 flex-col absolute z-0 top-12 right-0"
