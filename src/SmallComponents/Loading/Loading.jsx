import { useState } from "react";
import { main } from "framer-motion/client";
import "./Loading.css";

const Loading = () => {
  // const [delay, setDelay] = useState(false);

  return (
    <main className="loading-main">
      <div className="spinner"></div>
      {/* <p>Please wait...</p> */}
    </main>
  );
};

export default Loading;
