import "./BorrowedBooksPage.css";
import { useState } from "react";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BorrowedBook from "../BorrowedBook/BorrowedBook";

const BorrowedBooksPage = () => {
  return (
    <main className="borrowed-books-page-main">
      <Form action="/login">
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
      <section>
        <BorrowedBook />
        <BorrowedBook />
        <BorrowedBook />
        <BorrowedBook />
        <BorrowedBook />
        <BorrowedBook />
      </section>
    </main>
  );
};

export default BorrowedBooksPage;
