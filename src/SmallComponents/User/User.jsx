import "./User.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const User = ({ closeUserProfile, showConfirmFunc, userDetails }) => {
  // let displayUserDetails = userDetails?.User || [];

  // const names = displayUserDetails.Full_name.split(" ").slice(0, 2).join(" ");

  return (
    <main className="user-main">
      <section>
        <button className="user-close-btn" onClick={closeUserProfile}>
          <img src="./Images/remove.png" alt="" />
        </button>
        <div className="user-first-div">
          <LazyLoadImage
            // src={
            //   displayUserDetails.profile_image
            //     ? displayUserDetails.profile_image
            //     : "./Images/user.png"
            // }
            alt="User"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
          />
        </div>
        <h4></h4>
        <p></p>
        <Link to="/userProfile">View full profile</Link>

        <span className="user-log-out-btn" onClick={showConfirmFunc}>
          <img src="./Images/logOut.png" alt="" />
          Log out
        </span>
      </section>
    </main>
  );
};

export default User;