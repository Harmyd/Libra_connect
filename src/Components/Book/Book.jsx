import "./Book.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Book = () => {
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
        <h3 className="book-sec-second-div-space">The Art of Coding </h3>
        <p className="book-sec-second-div-space">Jamie Foxx</p>
        <h6 className="book-sec-second-div-space">Science </h6>
        <span className="book-sec-second-div-space book-sec-second-div-available">
          <small> Available </small>
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
