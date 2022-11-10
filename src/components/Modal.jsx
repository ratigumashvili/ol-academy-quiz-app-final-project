import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import formatted_date from "../helpers/getDate";

const Modal = ({
  correctAnswers,
  handleModalToggle,
  attemptsHistory,
  setAttemptsHistory,
}) => {
  const navigate = useNavigate();
  const [locale, setLocale] = useState([]);

  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target === modalRef.current) {
        handleModalToggle();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleModalToggle]);

  const handleNavigate = (value) => {
    value === "no" && navigate("/");
    if (value === "yes") {
      setAttemptsHistory([
        ...attemptsHistory,
        {
          id: uuid(),
          time: formatted_date(),
          score: correctAnswers,
        },
      ]);
      setTimeout(() => {
        navigate("/");
      }, 1);
    }
  };

  useEffect(() => {
    setLocale(attemptsHistory);
    localStorage.setItem("past-attempts-v1", JSON.stringify(locale));
  }, [locale, setLocale, attemptsHistory]);

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Do you want to save this attempt?</h2>
          <button className="close" onClick={handleModalToggle}>
            &times;
          </button>
        </div>
        <button onClick={() => handleNavigate("yes")}>Yes</button>
        <button onClick={() => handleNavigate("no")}>No</button>
      </div>
    </div>
  );
};

export default Modal;
