import { useState } from "react";
import Modal from "../components/Modal";

const Results = ({
  data,
  correctAnswers,
  attemptsHistory,
  setAttemptsHistory,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <h2>Results</h2>
      <p className="resuls-score">
        You scored: <b>{correctAnswers}</b> out of{" "}
        <b>{data?.questions?.length}</b>
      </p>

      <button className="common-btn" onClick={handleModalToggle}>
        Try Again
      </button>
      {showModal && (
        <Modal
          correctAnswers={correctAnswers}
          handleModalToggle={handleModalToggle}
          attemptsHistory={attemptsHistory}
          setAttemptsHistory={setAttemptsHistory}
        />
      )}
    </>
  );
};

export default Results;
