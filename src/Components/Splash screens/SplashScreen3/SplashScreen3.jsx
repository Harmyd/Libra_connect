import "./SplashScreen3.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SplashScreen3 = () => {
  return (
    <div className="SplashScreen3-div">
      <figure>
        <LazyLoadImage
          src="./Images/People1 logo.png"
          alt="People1 logo"
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "2s" } }}
          placeholderSrc="People1 logo"
        />
      </figure>
      <div>
        <h1>Your personal digital library</h1>
        <p className="SplashScreen3-p">
          Easily borrow, renew, and return books with just a few taps. Stay
          organized and never miss a due date!
        </p>
      </div>
      <div className="SplashScreen3-button-div">
        <Form action="/login">
          <button className="SplashScreen3-button1">Get Started</button>
        </Form>
        <Form action="/login">
          <button className="SplashScreen3-button2">Continue as a guest</button>
        </Form>
      </div>
    </div>
  );
};

export default SplashScreen3;
