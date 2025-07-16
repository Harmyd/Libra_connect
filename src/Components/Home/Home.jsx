import { Form } from "react-router-dom";
import "./Home.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Book from "../Book/Book";
import { useNavigate } from "react-router-dom";
import Message from "../../SmallComponents/Message/Message";
import { useState, useEffect } from "react";

const Home = () => {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    //  Sign up
    // sessionStorage.getItem("signUpMsg");
    const signUpToken = sessionStorage.getItem("signUpToken");
    const authSourceSignUp = sessionStorage.getItem("authSourceSignUp");

    // Login
    // sessionStorage.getItem("loginMsg");
    const loginToken = sessionStorage.getItem("loginToken");
    const authSource = sessionStorage.getItem("authSource");

    if (signUpToken) {
      setAuth(authSourceSignUp);
    } else if (loginToken) {
      setAuth(authSource);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <main className="home-main">
      <Message
        message={auth === "signUp" ? "Sign up Successful" : "Login Successful"}
        imgMessage="tick-01"
        imgClassname="check"
      />

      {/* <Form action="/login">
        <button className="home-arrow-left-btn">
          <img src="./Images/arrow-left.png" alt="arrow-left" />
        </button>
      </Form> */}
      {/* Home First Sec */}
      <section className="home-first-sec">
        {/* <div className="logo1">
            <LazyLoadImage
              src="./Images/Logo1.png"
              alt="Logo1"
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "1s" } }}
              placeholderSrc="logo1"
            />
          </div> */}
        <h3>Welcome Sophia</h3>
        <div className="home-first-sec-user">
          <LazyLoadImage
            src="./Images/user.png"
            alt="User"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
          />
        </div>
      </section>
      {/* Second sec(Search button sec) */}
      <section className="home-second-sec">
        <div className="home-second-sec-first-div">
          {/* <img src="./Images/search.png" alt="search" /> */}
          <input type="text" placeholder="Search book, authors, Genre   " />
          <span>
            <img src="./Images/edit.png" alt="Edit" />
          </span>
        </div>

        <button onClick={() => navigate("/borrowedBooksPage")}>
          View borrowed books
        </button>

        <div className="home-second-sec-div">
          <p>
            You have borrowed <span>7 out 15 books</span>
          </p>
        </div>
      </section>
      {/* </section> */}

      <section className="home-third-sec">
        <h3>Browse Books </h3>
        <Book />
        <Book />
        <Book />

        <Book />
      </section>
    </main>
  );
};

export default Home;
