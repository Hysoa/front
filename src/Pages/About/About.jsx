import "./about.css";

import { motion } from "framer-motion";

import bg from "./../../assets/images/menu/BIO.png";

export default function About() {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="About"
    >
      <img src={bg} alt="" />
    </motion.div>
  );
}
