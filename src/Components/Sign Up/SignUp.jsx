import "./SignUp.css";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import SelectDepartment from "../../SmallComponents/SelectDepartment/SelectDepartment";
import Loading from "../../SmallComponents/Loading/Loading";
import Message from "../../SmallComponents/Message/Message";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [eye, setEye] = useState(true);
  const [userData, setUserData] = useState({
    Fullname: "",
    Phone_number: "",
    Email: "",
    Password: "",
    Department: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [viewMsg, setViewMsg] = useState(false);
  const [msgKey, setMsgKey] = useState(0);

  const signUpSummit = async (e) => {
    e.preventDefault();

    console.log(userData);

    const isValid = false;
    if (!isValid) {
      setViewMsg(true);
      setMsgKey((prev) => prev + 1);
    }

    setLoading(true);
    setViewMsg(false);

    try {
      const response = await axios.post(
        "https://library-management-system-9v95.onrender.com/auth/signup",
        userData
      );

      const { message, Token } = response.data;
      sessionStorage.setItem("signUpMsg", message);
      sessionStorage.setItem("signUpToken", Token);
      sessionStorage.setItem("authSourceSignUp", "signUp");
      navigate("/home");
      console.log(response.data);
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

  const departmentChange = (dept) => {
    setUserData({ ...userData, Department: dept });
  };

  return (
    <main className="sign-up-main">
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
        <button className="sign-up-arrow-left-btn">
          <img src="./Images/arrow-left.png" alt="arrow-left" />
        </button>
      </Form>

      <section className="sign-up-first-sec">
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

      {/* Sign up section */}

      <section className="sign-up-section">
        <h2>Create an account with us </h2>

        <Form onSubmit={signUpSummit}>
          <div className="sign-up-input-div">
            <img src="./Images/name.png" alt="name" />
            <input
              type="text"
              placeholder="Full name "
              onChange={(e) =>
                setUserData({ ...userData, Fullname: e.target.value })
              }
              required
            />
            {/* <small>Hello</small> */}
          </div>

          <div>
            {/* <img src="./Images/department.png" alt="department" /> */}
            {/* <input
              type="text"
              placeholder="Department"
              onChange={(e) =>
                setUserData({ ...userData, Department: e.target.value })
              }
              required
            /> */}
            <SelectDepartment onDepartmentChange={departmentChange} />
          </div>

          {/* <div className="sign-up-input-div">
            <img src="./Images/department.png" alt="department" />
            <input
              type="text"
              placeholder="Department"
              onChange={(e) =>
                setUserData({ ...userData, Department: e.target.value })
              }
              required
            />
          </div> */}

          <div className="sign-up-input-div">
            <img src="./Images/phone.png" alt="phone" />
            <input
              type="text"
              placeholder="Phone number"
              onChange={(e) =>
                setUserData({ ...userData, Phone_number: e.target.value })
              }
              required
            />
            {/* <small>Hello</small> */}
          </div>
          <div className="sign-up-input-div">
            <img src="./Images/mail.png" alt="" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setUserData({ ...userData, Email: e.target.value })
              }
              required
            />
            {/* <small></small> */}
          </div>

          <div className="sign-up-input-div-password">
            <img src="./Images/lock-password.png" alt="lock-password" />
            <input
              type={eye ? "password" : "text"}
              placeholder="Password"
              required
              onChange={(e) =>
                setUserData({ ...userData, Password: e.target.value })
              }
            />
            {/* <small></small> */}
            <div className="sign-up-toggle-eye" onClick={() => setEye(!eye)}>
              <img src={`./Images/${eye ? "view" : "hide"}.png`} alt="eye" />
            </div>
          </div>

          <button className="sign-up-btn">Sign up</button>
        </Form>

        <div className="sign-up-last-div">
          <h5>Already have an account? </h5>
          <Link to="/login">Log in</Link>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
