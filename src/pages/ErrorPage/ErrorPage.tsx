import { Link } from "react-router";
import "./errorpage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page-header">
        <span className="digit-fade-in digit1">4</span>
        <span className="digit-fade-in digit2">0</span>
        <span className="digit-fade-in digit3">4</span>
      </h1>
      <p className="error-page-subheader">Something went wrong.</p>
      <p className="error-page-text">Sorry, we can't find the page you're looking for.</p>
      <Link to="/" className="error-page-go-back-link">
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
