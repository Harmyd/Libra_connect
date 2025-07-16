import "./ResetPassword3.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Message from "../../../SmallComponents/Message/Message";
import Loading from "../../../SmallComponents/Loading/Loading";
import axios from "axios";

const ResetPassword3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [eye, setEye] = useState({
    firstEye: true,
    secondEye: true,
  });
  const [password, setPassword] = useState({
    passwordData: "",
    confirmPasswordData: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageKey, setMessageKey] = useState(0);

  const styles = {
    display:
      password.passwordData === "" &&
      password.confirmPasswordData === "" &&
      "none",
  };

  const email = location.state?.email;
  const res = location.state?.response;

  const summitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = false;

    if (!isValid) {
      setShowMessage(true);
      setMessageKey((prev) => prev + 1);
    }

    if (password.passwordData !== password.confirmPasswordData) {
      setLoading(false);
      setMsg("Passwords does not match");
      return;
    } else {
      try {
        await axios.post(
          "https://library-management-system-9v95.onrender.com/password_reset/change_password",
          {
            Email: email,
            Password: password.confirmPasswordData,
          }
        );

        navigate("/resetPassword4");
      } catch (err) {
        if (!err.response) {
          // No response from server = likely network error
          setMsg("Please check your network.");
        } else {
          // Backend responded with error (like 400, 500)
          // setLoading(false);
          setMsg(err.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    // res.access_token && (
    email && (
      <main className="resetPassword3-main">
        {/* <Message message={res.message} imgMessage="check" imgClassname="check" /> */}

        {showMessage && !loading && (
          <Message
            key={messageKey}
            message={msg}
            imgMessage="cancel-01"
            imgClassname="cancel"
          />
        )}
        {loading && <Loading />}
        <Form action="/login">
          <button className="arrow-left-btn">
            <img src="./Images/arrow-left.png" alt="arrow-left" />
          </button>
        </Form>

        <section className="logo-sec">
          <div className="logo1">
            <LazyLoadImage
              src="./Images/Logo1.png"
              alt="Logo1"
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "1s" } }}
            />
          </div>
          <h2>LibraConnect </h2>
        </section>

        <section className="resetPassword3-first-sec">
          <h2>Reset your password </h2>
          <p>
            Please enter a new password below to complete the password reset
            process and regain access to your account
          </p>
        </section>
        <Form>
          <div className="resetPassword3-input-div">
            <img
              src="./Images/lock-password.png"
              alt="Password"
              className="reset-password3-input-img"
            />

            <input
              type={eye.firstEye ? "password" : "text"}
              placeholder="Password"
              onChange={(e) =>
                setPassword({ ...password, passwordData: e.target.value })
              }
            />
            <span onClick={() => setEye({ ...eye, firstEye: !eye.firstEye })}>
              <img
                src={`./Images/${eye.firstEye ? "view" : "hide"}.png`}
                alt=""
              />
            </span>
          </div>
          <div className="resetPassword3-input-div">
            <img
              src="./Images/lock-password.png"
              alt="Password"
              className="reset-password3-input-img"
            />

            <input
              type={eye.secondEye ? "password" : "text"}
              placeholder="Confirm Password"
              onChange={(e) =>
                setPassword({
                  ...password,
                  confirmPasswordData: e.target.value,
                })
              }
            />
            <span onClick={() => setEye({ ...eye, secondEye: !eye.secondEye })}>
              <img
                src={`./Images/${eye.secondEye ? "view" : "hide"}.png`}
                alt=""
              />
            </span>

            <div style={styles}>
              {password.passwordData !== password.confirmPasswordData ? (
                <small className="resetPassword3-small1">
                  Password does not match
                </small>
              ) : (
                <small className="resetPassword3-small2">Password Match</small>
              )}
            </div>
          </div>
        </Form>
        <Form onSubmit={summitForm}>
          <div className="resetPassword3-btn-div">
            <button>Reset Password </button>
          </div>
        </Form>
      </main>
    )
  );

  // );
};

export default ResetPassword3;
