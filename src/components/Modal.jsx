import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import formatted_date from "../helpers/getDate";

const Modal = ({
  modalRef,
  correctAnswers,
  toggleModal,
  attemptsHistory,
  setAttemptsHistory,
}) => {
  const navigate = useNavigate();

  const handleAddRecord = async () => {
    setAttemptsHistory([
      ...attemptsHistory,
      {
        id: uuid(),
        time: formatted_date(),
        score: correctAnswers,
      },
    ]);
  };

  const handleNavigateHome = async () => {
    await handleAddRecord();
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("past-attempts-v1", JSON.stringify(attemptsHistory));
  }, [attemptsHistory]);

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Do you want to save this attempt?</h2>
          <button className="close" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <button onClick={() => handleNavigateHome()}>Yes</button>
        <button onClick={() => navigate("/")}>No</button>
      </div>
    </div>
  );
};

export default Modal;
