import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "../../SmallComponents/Loading/Loading";
import Error from "../Error/Error";
import "./UserProfile.css";
import axios from "axios";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const token =
    sessionStorage.getItem("loginToken") ||
    sessionStorage.getItem("signUpToken");

  useEffect(() => {
    const getUserDetails = async () => {
      if (!token) return; // Don't call if token isn't ready
      setLoading(true);
      try {
        const res = await axios.get(
          "https://student-complaint-system.onrender.com/users/get_user_detail",

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(res.data);
      } catch (err) {
        if (!err.response) {
          // No response from server = likely network error
          // console.log(err);
        } else {
          // Backend responded with error (like 400, 500)
          // setLoading(false);
          // console.log(err.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, [token]);

  let displayUserDetails = userDetails?.User || {};

  return token ? (
    <main className="user-profile-main">
      {loading && <Loading />}
      <Form action="/home">
        <button className="arrow-left-btn">
          <img src="./Images/arrow-left.png" alt="arrow-left" />
        </button>
      </Form>

      <section className="user-profile-first-sec">
        <div className="user-profile-user-div">
          <LazyLoadImage
            src={
              displayUserDetails.profile_image
                ? displayUserDetails.profile_image
                : "./Images/user.png"
            }
            // alt="User"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
          />
        </div>

        <h3>
          {displayUserDetails?.Full_name?.split(" ").slice(0, 2).join(" ")}
        </h3>
        <p>{displayUserDetails.Email}</p>
        <span className="user-profile-span">User</span>
      </section>

      <section className="user-profile-second-sec">
        <Link to="/personalInfo">
          Personal Information
          <img src="./Images/arrow-down-01.png" alt="arrow" />
        </Link>

        <Link to="/complaintsPage">
          My Complaints
          <img src="./Images/arrow-down-01.png" alt="arrow" />
        </Link>

        <Link>
          Notifications
          <img src="./Images/arrow-down-01.png" alt="arrow" />
        </Link>
      </section>
    </main>
  ) : (
    <Error />
  );
};

export default UserProfile;