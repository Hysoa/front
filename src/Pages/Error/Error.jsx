import "./error.css";

import { motion } from "framer-motion";

import bg from "./../../assets/images/background/ERROR.webp";

export default function Error() {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Error"
    >
      <img src={bg} alt="" />
    </motion.div>
  );
}
