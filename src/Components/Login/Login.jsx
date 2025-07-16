import { Form, Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "../../SmallComponents/Loading/Loading";
import Message from "../../SmallComponents/Message/Message";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    Email: "",
    Password: "",
  });

  const [msg, setMsg] = useState("");
  const [viewMsg, setViewMsg] = useState(false);
  const [msgKey, setMsgKey] = useState(0);

  const navigate = useNavigate();

  const loginSummit = async (e) => {
    e.preventDefault();

    const isValid = false;
    if (!isValid) {
      setViewMsg(true);
      setMsgKey((prev) => prev + 1);
    }

    setLoading(true);
    setViewMsg(false);
    try {
      const response = await axios.post(
        "https://library-management-system-9v95.onrender.com/auth/login",
        userData
      );

      const { message, Token } = response.data;
      sessionStorage.setItem("loginMsg", message);
      sessionStorage.setItem("loginToken", Token);
      sessionStorage.setItem("authSource", "login");
      navigate("/home");
    } catch (err) {
      if (!err.response) {
        // No response from server = likely network error
        setMsg("Please check your network.");
      } else {
        // Backend responded with error (like 400, 500)
        setLoading(false);
        setMsg(err.response.data.message);
        console.log(err.response.data.message);
      }
    } finally {
      setLoading(false);
      setViewMsg(true);
    }
  };

  return (
    <main className="login-main">
      {loading && <Loading />}
      {viewMsg && (
        <Message
          key={msgKey}
          message={msg}
          imgMessage="cancel-01"
          imgClassname="cancel"
        />
      )}

      <Form action="/splashScreen3">
        <button className="login-arrow-left-btn">
          <img src="./Images/arrow-left.png" alt="arrow-left" />
        </button>
      </Form>

      <section className="login-first-sec">
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

      {/*  Login Section*/}
      <section className="login-second-sec">
        <h1>Welcome back!</h1>
        <Form onSubmit={loginSummit}>
          <div className="login-input-email-div">
            <img
              src="./Images/mail.png"
              alt="email"
              className="login-input-img"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setUserData({ ...userData, Email: e.target.value })
              }
            />
            {/* <small className="login-wrong-username">Invalid Email</small> */}
          </div>

          <div className="login-input-div-password">
            <img
              src="./Images/lock-password.png"
              alt="Password"
              className="login-input-img"
            />

            <input
              type={eye ? "password" : "text"}
              placeholder="Password"
              onChange={(e) =>
                setUserData({ ...userData, Password: e.target.value })
              }
            />
            <div className="login-password-div">
              {/* <small>Wrong Password</small> */}
              <Link to="/resetPassword1" className="login-forget-password">
                Forget Password?
              </Link>
            </div>
            <div onClick={() => setEye(!eye)} className="login-toggle-eye">
              <img src={`./Images/${eye ? "view" : "hide"}.png`} alt="" />
            </div>
          </div>
          <button className="login-btn">Log in</button>
        </Form>
        <div className="login-last-div">
          <h5>Don't have an account?</h5>
          <Link to="/signUp">Sign up</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
