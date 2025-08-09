import "./BorrowedBooksPage.css";
import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BorrowedBook from "../BorrowedBook/BorrowedBook";
import Loading from "../../../SmallComponents/Loading/Loading";
import Error from "../../Error/Error";
import axios from "axios";

const BorrowedBooksPage = () => {
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState(null);

  const token =
    sessionStorage.getItem("signUpToken") ||
    sessionStorage.getItem("loginToken");

  useEffect(() => {
    const getBorrowedBooks = async () => {
      if (!token) return; // Don't call if token isn't ready
      setLoading(true);
      try {
        const res = await axios.get(
          "https://library-management-system-9v95.onrender.com/books/get_borrowed_books",

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(res.data);
        setBorrowedBooks(res.data.Books);
      } catch (err) {
        if (!err.response) {
          // No response from server = likely network error
          // console.log(err);
        } else {
          // Backend responded with error (like 400, 500)
          setLoading(false);
          console.log(err.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };
    getBorrowedBooks();
  }, [token]);

  let displayBorrowedBooks = borrowedBooks ? borrowedBooks : [];

  console.log(displayBorrowedBooks);

  return token ? (
    <main className="borrowed-books-page-main">
      <Form action="/home">
        <button className="home-arrow-left-btn">
          <img src="./Images/arrow-left.png" alt="arrow-left" />
        </button>
      </Form>
      <section className="borrowed-books-page-first-sec">
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

      <section className="borrowed-books-page-second-sec">
        <input type="text" placeholder="Search borrowed books" />
        <div className="borrowed-books-page-second-sec-div">
          <p>
            You have borrowed <span>7 out 15 books</span>
          </p>
        </div>
      </section>

      <section className="borrowed-books-page-third-sec">
        {displayBorrowedBooks.length === 0 ? (
          <p>You haven't borrowed any book </p>
        ) : (
          displayBorrowedBooks.map((displayBorrowedBook) => {
            return (
              <BorrowedBook
                key={displayBorrowedBook.Google_book_id}
                borrowedBookTitle={displayBorrowedBook.Title}
                bookId={displayBorrowedBook.Google_book_id}
                title={displayBorrowedBook.Title}
                authors={displayBorrowedBook.Author}
                department={displayBorrowedBook.Category}
                dueDate={displayBorrowedBook.due_date}
              />
            );
          })
        )}
      </section>
    </main>
  ) : (
    <Error />
  );
};

export default BorrowedBooksPage;
