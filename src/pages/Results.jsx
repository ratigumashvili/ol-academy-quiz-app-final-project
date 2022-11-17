import { useRef } from "react";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal";

const Results = ({
  data,
  correctAnswers,
  attemptsHistory,
  setAttemptsHistory,
}) => {
  // const [showModal, setShowModal] = useState(false);

  // const handleModalToggle = () => {
  //   setShowModal((prev) => !prev);
  // };

  const modalRef = useRef();
  const { isShowing, toggle: toggleModal } = useModal(modalRef);

  return (
    <>
      <h2>Results</h2>
      <p className="resuls-score">
        You scored: <b>{correctAnswers}</b> out of{" "}
        <b>{data?.questions?.length}</b>
      </p>

      <button className="common-btn" onClick={toggleModal}>
        Try Again
      </button>
      {isShowing && (
        <Modal
          modalRef={modalRef}
          correctAnswers={correctAnswers}
          toggleModal={toggleModal}
          attemptsHistory={attemptsHistory}
          setAttemptsHistory={setAttemptsHistory}
        />
      )}
    </>
  );
};

export default Results;
