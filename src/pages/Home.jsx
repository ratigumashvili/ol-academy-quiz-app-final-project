import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ attemptsHistory }) => {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    if (attemptsHistory.length !== 0) {
      setTemp(attemptsHistory.slice(-1)[0]);
    }
  }, [attemptsHistory]);
  return (
    <div className="home">
      <Link to="/quiz" className="start-btn">
        Start Quiz
      </Link>
      {temp && (
        <div className="home-footer">
          <h2>Last attempt: </h2>
          <Link to="/history">
            Score: {temp.score} Time: {temp.time}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
