import { Form } from "react-router-dom";
import "./Home.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Book from "../Book/Book";
import { useNavigate } from "react-router-dom";
import Message from "../../SmallComponents/Message/Message";
import Loading from "../../SmallComponents/Loading/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import { object } from "framer-motion/client";

const Home = () => {
  const [auth, setAuth] = useState("");
  const [token, setToken] = useState("");
  const [books, setBooks] = useState(null);

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
      setToken(signUpToken);
    } else if (loginToken) {
      setAuth(authSource);
      setToken(loginToken);
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const getComplaint = async () => {
      if (!token) return; // Don't call if token isn't ready

      try {
        const res = await axios.get(
          "https://library-management-system-9v95.onrender.com/books/get_book",

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBooks(res.data.Books);
      } catch (err) {
        if (!err.response) {
          // No response from server = likely network error
          console.log(err);
        } else {
          // Backend responded with error (like 400, 500)
          // console.log(err.response?.data);
        }
      }
    };
    getComplaint();
  }, [token]);

  function shuffleArray(arr) {
    const shuffled = [...arr]; // clone the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  let displayBooks = books ? books : {};

  const showBooks = Object.entries(displayBooks).map(([, displayBookArr]) => {
    const shuffleBooks = shuffleArray(displayBookArr);

    return shuffleBooks.map((displayBook) => {
      return (
        <Book
          key={displayBook.Google_book_id}
          title={displayBook.Title}
          department={displayBook.Category}
          availability={displayBook.Availability}
          authors={displayBook.Authors[0]}
        />
      );
    });
  });

  console.log(showBooks);

  return (
    <main className="home-main">
      {/* {loading && <Loading />} */}

      <Message
        message={auth === "signUp" ? "Sign up Successful" : "Login Successful"}
        imgMessage="tick-01"
        imgClassname="check"
      />

      {/* Home First Sec */}
      <section className="home-first-sec">
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

        {showBooks.length === 0 ? <Loading /> : showBooks}
      </section>
    </main>
  );
};

export default Home;
