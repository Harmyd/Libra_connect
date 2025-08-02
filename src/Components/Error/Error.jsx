import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <div className="Error-div">
      {/* <p>Not Found</p> */}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Error;
