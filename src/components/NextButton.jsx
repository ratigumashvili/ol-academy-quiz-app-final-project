import { Link } from "react-router-dom";

const NextButton = ({ data, current, setCurrent }) => {
  const handleClick = () => {
    if (current !== data.questions.length - 1) {
      setCurrent(current + 1);
    }
  };
  return current !== data.questions.length - 1 ? (
    <button className="nex-btn" onClick={handleClick}>
      Next
    </button>
  ) : (
    <Link to="/results" className="nex-btn">
      Results
    </Link>
  );
};

export default NextButton;
