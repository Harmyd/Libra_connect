import "./SplashScreen2.css";
import { Form, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SplashScreen2 = () => {
  return (
    <div className="SplashScreen2-div">
      <Link to="/login">skip</Link>
      <figure>
        <LazyLoadImage
          src="./Images/People logo.png"
          alt="People logo"
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "2s" } }}
          placeholderSrc="People logo"
        />
      </figure>
      <div className="SplashScreen2-centre-div">
        <h2>Access a world of knowledge</h2>
        <p className="SplashScreen2-p">
          Discover, borrow, and manage books seamlessly. Stay informed with due
          date reminders and personalized recommendations.
        </p>
      </div>

      <div className="SplashScreen2-centre-div">
        <div className="SplashScreen2-button-div">
          <Form action="/splashScreen3">
            <button>
              <img src="./Images/arrow-right.png" alt="arrow-right" />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen2;
