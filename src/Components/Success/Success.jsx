import "./Success.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLocation } from "react-router-dom";
import Error from "../Error/Error";

const Success = () => {
  const location = useLocation().state;

  const isoDate = location.due_date;
  const date = new Date(isoDate);

  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const token =
    sessionStorage.getItem("signUpToken") ||
    sessionStorage.getItem("loginToken");

  return token ? (
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
        You have successfully borrowed {location.title}, it is available in
        dashboard under borrowed books. Kindly return this book on or before{" "}
        {formattedDate}
      </p>
      <Form action="/home">
        <button>Back to Homepage </button>
      </Form>
    </section>
  ) : (
    <Error />
  );
};

export default Success;
