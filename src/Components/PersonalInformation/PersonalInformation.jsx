import "./PersonalInformation.css";
import { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Form } from "react-router-dom";
// import Header from "../../SmallComponents/Header/Header";
import Loading from "../../SmallComponents/Loading/Loading";
import Message from "../../SmallComponents/Message/Message";
// import Error from "../Error/Error";

import axios from "axios";

const PersonalInformation = () => {
  const fileInputRef = useRef(null);

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageKey, setMessageKey] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const token =
    sessionStorage.getItem("loginToken") ||
    sessionStorage.getItem("signUpToken");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const isValid = false;
    if (!isValid) {
      setShowMessage(true);
      setMessageKey((prev) => prev + 1);
    }

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const tempUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(tempUrl);

    const formData = new FormData();
    formData.append("Picture", selectedFile);

    console.log(selectedFile);

    // const token =
    //   sessionStorage.getItem("loginToken") ||
    //   sessionStorage.getItem("signUpToken");

    try {
      const response = await axios.post(
        "https://student-complaint-system.onrender.com/users/upload_profile_pic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update uploaded image URL for display
      // setUploadedImageUrl(`http://localhost:8000/uploads/${response.data.filename}`);

      console.log(response.data);
      // setMsg(response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

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

  console.log(displayUserDetails);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return token ? (
    <main className="personal-info-main">
      {loading && <Loading />}

      {showMessage && (
        <Message
          key={messageKey}
          message="Image Uploaded Successfully"
          imgMessage="check"
          imgClassname="check"
        />
      )}
      {/* <Header visibilityImg="hidden" arrowNav="/userProfile" /> */}

      <div className="personal-info-arr-div">
        <Form action="/home">
          <button className="arrow-left-btn">
            <img src="./Images/arrow-left.png" alt="arrow-left" />
          </button>
        </Form>
      </div>

      <h2>Personal Information </h2>

      <section className="personal-info-first-sec">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className="personal-info-user-div" onClick={handleClick}>
          <LazyLoadImage
            src={
              previewImage
                ? previewImage
                : displayUserDetails?.profile_image || "./Images/user.png"
            }
            alt="User"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
            className="personal-info-user"
          />
          <div className="personal-info-edit-div">
            <img src="./Images/edit.png" alt="" />
          </div>
        </div>
      </section>
      <section className="personal-info-second-sec">
        <div>
          <div>
            <img src="./Images/user-01.png" alt="" />
            <h4>User name: </h4>
          </div>
          <p>
            {displayUserDetails?.Full_name?.split(" ").slice(0, 2).join(" ")}
          </p>
        </div>

        <div>
          <div>
            <img src="./Images/mail-01.png" alt="" />
            <h4>Email:</h4>
          </div>
          <p>{displayUserDetails.Email}</p>
        </div>

        <div>
          <div>
            <img src="./Images/phone-01.png" alt="" />
            <h4>Phone number: </h4>
          </div>
          <p> {displayUserDetails.Level} </p>
        </div>
      </section>

      <Form action="/editPersonalInfo" className="personal-info-form">
        <button>
          <img src="./Images/edit-02.png" alt="" />
          Edit
        </button>
      </Form>
    </main>
  ) : (
    // <Error />
    <h1>Not found</h1>
  );
};

export default PersonalInformation;