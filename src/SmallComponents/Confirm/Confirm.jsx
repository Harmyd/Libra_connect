import "./Confirm.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Form } from "react-router-dom";

const Confirm = ({
  confirmImg,
  confirmBtn1,
  confirmBtn2,
  confirmText,
  confirmBtnText = "Confirm",
}) => {
  return (
    <main className="confirm-main">
      <section>
        <div className="confirm-img-div">
          <LazyLoadImage
            src={`./Images/${confirmImg}.png`}
            alt="Icon"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "2s" } }}
            placeholderSrc="User"
          />
        </div>

        <p>{confirmText}</p>
        <div children className="confirm-btn-div">
          <Form>
            <button className="confirm-btn-1" onClick={confirmBtn1}>
              <img src="./Images/cancel-01.png" alt="" />
              Cancel
            </button>
          </Form>

          <Form onSubmit={confirmBtn2}>
            <button className="confirm-btn-2">
              <img src="./Images/tick-01.png" alt="" />
              {confirmBtnText}
            </button>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Confirm;
