import "./home.css";
import { useNavigate } from "react-router-dom";
import homeImage from "../../assets/images/logo/LOGO HYSOA DEFINITIF.png";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
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
