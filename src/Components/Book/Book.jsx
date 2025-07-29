import "./Book.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import Confirm from "../../SmallComponents/Confirm/Confirm";
import Loading from "../../SmallComponents/Loading/Loading";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Book = ({
  title,
  authors,
  department,
  availability,
  bookId,
  borrowed,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loginToken = sessionStorage.getItem("loginToken");
    const signUpToken = sessionStorage.getItem("signUpToken");

    if (loginToken) {
      setToken(loginToken);
    } else if (signUpToken) {
      setToken(signUpToken);
    } else {
      return null;
    }
  }, []);

  const confirmBtn1 = () => {
    setShowConfirm(false);
  };

  const confirmBtn2 = async (e) => {
    e.preventDefault();
    setShowConfirm(false);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://library-management-system-9v95.onrender.com/books/borrow_book",
        {
          Google_id: bookId,
          Title: title,
          Author: authors,
          Category: department,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/success", { state: res.data });

      console.log(res.data);
    } catch (err) {
      if (!err.response) {
        // No response from server = likely network error
        console.log(err);
      } else {
        // Backend responded with error (like 400, 500)
        // setLoading(false);
        console.log(err.response?.data);
      }
    } finally {
      // setLoading(false);
    }
  };

  return (
    <section className="book-sec">
      {showConfirm && (
        <Confirm
          confirmImg="information"
          confirmBtn1={confirmBtn1}
          confirmBtn2={confirmBtn2}
          confirmText={title}
        />
      )}

      {loading && <Loading />}
      <div className="book-sec-first-div">
        <LazyLoadImage
          src="./Images/book.png"
          alt="Book"
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "1s" } }}
          placeholderSrc="logo1"
        />
      </div>

      <div className="book-sec-second-div">
        <h3 className="book-sec-second-div-space">{title} </h3>
        <p className="boo-k-sec-second-div-space">{authors[0]}</p>
        <h6 className="book-sec-second-div-space">{department} </h6>
        <span className="book-sec-second-div-space book-sec-second-div-available">
          <small>{availability} </small>
        </span>
        <div>
          <Form>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={borrowed && true}
            >
              Borrow
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Book;
