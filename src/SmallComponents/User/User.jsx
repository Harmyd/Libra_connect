import "./User.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
const User = () => {
  return (
    <main className="user-main">
      <section>
        <div className="user-first-div">
          <LazyLoadImage
            src="./Images/user.png"
            alt="User"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
          />
        </div>
        <p>brooklyn23 @gmail.complaint</p>
        <Link>View full profile</Link>

        <button>
          <img src="./Images/logOut.png" alt="" />
          Log out
        </button>
      </section>
    </main>
  );
};

export default User;
