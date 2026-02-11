import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shortLogo from "../assets/short_logo.png";
import longLogo from "../assets/Long_logo.png";
import "./Intro.css";

function Intro() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show button after animation
    setTimeout(() => {
      setShowButton(true);
    }, 2500);
  }, []);

  return (
    <div className="intro-container">
      <div className="logo-wrapper">
        <img src={shortLogo} alt="Short Logo" className="logo short" />
        <img src={longLogo} alt="Long Logo" className="logo long" />
      </div>

      {showButton && (
  <>
    <button className="start-btn" onClick={() => navigate("/login")}>
      Get Started
    </button>

    <p className="credit-text">
      Internship Project Developed By <span>Mayur Chaudhari</span>.
    </p>
  </>
)}

    </div>
  );
}

export default Intro;
