import "./ResetPassword1.css";
import { Form, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import Loading from "../../../SmallComponents/Loading/Loading";
import Message from "../../../SmallComponents/Message/Message";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword1 = () => {
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [viewMsg, setViewMsg] = useState(false);
  const [msgKey, setMsgKey] = useState(0);

  const summitEmail = async (e) => {
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
        "https://library-management-system-9v95.onrender.com/password_reset/send_reset_code",
        {
          Email: Email,
        }
      );
      const res = response.data;
      navigate("/resetPassword2", {
        state: { email: Email },
      });
      sessionStorage.setItem("expiryTime", res.expiry_time);
      console.log(res);
    } catch (err) {
      if (!err.response) {
        // No response from server = likely network error
        setMsg("Please check your network.");
      } else {
        // Backend responded with error (like 400, 500)
        setLoading(false);
        setMsg(err.response.data.message);
      }
    } finally {
      setLoading(false);
      setViewMsg(true);
    }
  };

  return (
    <main className="resetPassword1-main">
      {loading && <Loading />}

      {viewMsg && (
        <Message
          key={msgKey}
          message={msg}
          imgMessage="cancel-01"
          imgClassname="cancel"
        />
      )}
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

      <section className="resetPassword1-second-sec">
        <h1>Forgot password?</h1>
        <p>Enter your registered email, and we will send you a link</p>
        <Form onSubmit={summitEmail}>
          <div className="resetPassword1-input-email-div">
            <img src="./Images/mail.png" alt="email" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="resetPassword1-btn">Reset password </button>
        </Form>
      </section>
      <div className="resetPassword1-last-div">
        <h5>Remember your password ?</h5>
        <Link to="/login">Login</Link>
      </div>
    </main>
  );
};

export default ResetPassword1;
