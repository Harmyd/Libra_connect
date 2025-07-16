import "./ResetPassword4.css";
import { Form } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Message from "../../../SmallComponents/Message/Message";

const ResetPassword4 = () => {
  return (
    <main className="resetPassword4-main">
      <Form action="/login">
        <button className="arrow-left-btn">
          <img src="./Images/arrow-left.png" alt="arrow-left" />
        </button>
      </Form>

      <section className="logo-sec">
        <div className="logo1">
          <LazyLoadImage
            src="./Images/Logo1.png"
            alt="Logo1"
            effect="blur"
            wrapperProps={{ style: { transitionDelay: "1s" } }}
          />
        </div>
        <h2>LibraConnect </h2>
      </section>

      <section className="resetPassword4-first-sec">
        <h2>Success!!</h2>
        <p>
          Your password has been reset successfully. You can now return to the
          login page.
        </p>
        <Form action="/login">
          <button>Back to Login </button>
        </Form>
      </section>
      <Message
        message="Complaint submitted successfully"
        imgMessage="check"
        imgClassname="check"
      />
    </main>
  );
};

export default ResetPassword4;
