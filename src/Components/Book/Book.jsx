import "./Book.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Book = ({ title, authors, department, availability }) => {
  return (
    <section className="book-sec">
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
        <p className="book-sec-second-div-space">{authors}</p>
        <h6 className="book-sec-second-div-space">{department} </h6>
        <span className="book-sec-second-div-space book-sec-second-div-available">
          <small>{availability} </small>
        </span>
        <div>
          <Form action="/success">
            <button>Borrow</button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Book;
