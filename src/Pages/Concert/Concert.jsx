import "./concert.css";

import { motion } from "framer-motion";

import bg from "./../../assets/images/menu/CONCERTS.png";

export default function Concert() {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Concert"
    >
      <img src={bg} alt="" />
    </motion.div>
  );
}
