import "./Success.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Success = () => {
  return (
    <section className="success-sec">
      <div>
        <LazyLoadImage
          src="./Images/success.png"
          alt="Book"
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "1s" } }}
          placeholderSrc="logo1"
        />
      </div>
      <h4>Book Borrowed Successfully </h4>
      <p>
        You have successfully borrowed [book title and author], it is available
        in dashboard under borrowed books. Kindly return this book on or before
        july 12, 2025
      </p>
      <Form action="/home">
        <button>Back to Homepage </button>
      </Form>
    </section>
  );
};

export default Success;
