import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MainPage from "./components/MainPage/MainPage";
import About from "./Pages/About/About";
import Livre from "./Pages/Livre/Livre";
import Concert from "./Pages/Concert/Concert";
import Shop from "./Pages/Shop/Shop";
import Cursor from "./components/Cursor/Cursor";
import Navbar from "./components/NavBar/Navbar";
import Clip from "./Pages/Clip/Clip";
import Header from "./components/Header/Header";
import Join from "./Pages/Join/Join";
import son from "./assets/son/ZIK BOUCLE JOUR.mp3";
import Lecteur from "./components/Lecteur/Lecteur"; // Importer le composant Lecteur

const App = () => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
    console.log(isPlaying, "dans app");
  };

  return (
    <div className="flex flex-col h-[100vh] justify-between items-center">
      {location.pathname === "/" ? <></> : <Header />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <MainPage
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/livre" element={<Livre />} />
          <Route path="/concert" element={<Concert />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/join" element={<Join />} />
          <Route path="/clip" element={<Clip />} />
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>
      </AnimatePresence>

      {location.pathname === "/" ? <></> : <Navbar />}
      <Cursor />
      <Lecteur
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        audioRef={audioRef}
        son={son}
      />
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
