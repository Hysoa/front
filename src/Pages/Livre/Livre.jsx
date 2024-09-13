import "./livre.css";

import bg from "./../../assets/images/menu/BOOKS.png";

import { motion } from "framer-motion";

export default function Livre() {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Livre"
    >
      <img src={bg} alt="" />
    </motion.div>
  );
}
