import "./home.css";
import homeImage from "../../assets/images/logo/LOGO HYSOA DEFINITIF.png";

export default function Home() {
  const handleCLick = () => {
    window.location.href = "/home";
  };

  return (
    <div className="home-container">
      <img
        onClick={handleCLick}
        className="home-image"
        src={homeImage}
        alt=""
      />
    </div>
  );
}
