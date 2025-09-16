import "./BorrowedBook.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import Confirm from "../../../SmallComponents/Confirm/Confirm";
import Loading from "../../../SmallComponents/Loading/Loading";
import axios from "axios";

const BorrowedBook = ({ borrowedBookTitle, bookId, title, dueDate }) => {
  const [viewConfirm, setViewConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  let token =
    sessionStorage.getItem("loginToken") ||
    sessionStorage.getItem("signUpToken");

  const navigate = useNavigate();

  const confirmBtn1 = () => {
    setViewConfirm(false);
  };

  const confirmBtn2 = async (e) => {
    e.preventDefault();
    setViewConfirm(false);

    try {
      const res = await axios.post(
        "https://library-management-system-9v95.onrender.com/books/return_book",
        {
          Google_id: bookId,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // navigate("/success", { state: res.data });

      console.log(res.data);
    } catch (err) {
      if (!err.response) {
        // No response from server = likely network error
        console.log(err);
      } else {
        // Backend responded with error (like 400, 500)
        setLoading(false);
        console.log(err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const date = new Date(dueDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {loading && <Loading />}
      {viewConfirm && (
        <Confirm
          confirmImg="book-01"
          confirmText={`Are you sure you want to return ${title}?
           Once returned, you will no longer have access to this book, and you may need to borrow it again if required.`}
          confirmBtn1={confirmBtn1}
          confirmBtn2={confirmBtn2}
        />
      )}
      <section className="borrowed-book-sec">
        <span>
          <LazyLoadImage
            src="./Images/book1.png"
            alt="Book"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "1s" } }}
          />
        </span>
        <div>
          <h4>{borrowedBookTitle}</h4>

          <small style={{ color: "#FFB300" }}>Due in {formattedDate} </small>

          <div className="borrowed-book-btn-div">
            <button>Renew</button>
            <button onClick={() => setViewConfirm(true)}>Return</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BorrowedBook;
