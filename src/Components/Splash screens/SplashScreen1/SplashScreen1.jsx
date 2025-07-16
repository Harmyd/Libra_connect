import "./SplashScreen1.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen1 = () => {
  const navigate = useNavigate();
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    // Trigger exit animation after delay
    const timer = setTimeout(() => {
      setStartExit(true);
    }, 1500); // wait before swiping

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startExit) {
      // Wait for animation before navigating
      const navTimer = setTimeout(() => {
        navigate("/splashScreen2");
      }, 5000); // must match exit transition duration

      return () => clearTimeout(navTimer);
    }
  }, [startExit, navigate]);

  return (
    <AnimatePresence>
      {!startExit && (
        <motion.section
          className="splash-screen1-sec"
          initial={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <div>
            <img src="./Images/logo.png" alt="logo" />
          </div>
          <h1>LibraConnect</h1>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen1;
