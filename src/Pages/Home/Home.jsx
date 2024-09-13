import "./home.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import homeImage from "../../assets/images/logo/LOGO HYSOA DEFINITIF.png";

export default function Home() {
  const navigate = useNavigate();
  const { mainRef } = useContext(AppContext);

  const enterFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const handleClick = () => {
    if (mainRef.current) {
      enterFullscreen(mainRef.current);
    }
    navigate("/home");
  };


  return (
    <div className="overflow-hidden relative h-screen flex justify-center">
      <img
        onClick={handleClick}
        className="transition-transform duration-500 transform hover:scale-110"
        src={homeImage}
        alt=""
      />
    </div>
  );
}
