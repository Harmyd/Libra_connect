import "./BorrowedBook.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import Confirm from "../../../SmallComponents/Confirm/Confirm";

const BorrowedBook = () => {
  const [viewConfirm, setViewConfirm] = useState(false);

  const confirmBtn1 = () => {
    setViewConfirm(false);
  };

  return (
    <section className="borrowed-book-sec">
      {viewConfirm && (
        <Confirm
          confirmImg="book-01"
          confirmText="Are you sure you want to return [Book Title]? Once returned, you will no longer have access to this book, and you may need to borrow it again if required."
          confirmBtn1={confirmBtn1}
        />
      )}
      <span>
        <LazyLoadImage
          src="./Images/book1.png"
          alt="Book"
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "1s" } }}
        />
      </span>
      <div>
        <h4>Introduction to cryptography </h4>

        <small>Overdue since July 3, 2025 </small>

        <div className="borrowed-book-btn-div">
          <button>Renew</button>
          <button onClick={() => setViewConfirm(true)}>Return</button>
        </div>
      </div>
    </section>
  );
};

export default BorrowedBook;
