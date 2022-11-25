import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ attemptsHistory }) => {
  const [lastRecord, setLastRecord] = useState(null);

  useEffect(() => {
    if (attemptsHistory.length !== 0) {
      setLastRecord(attemptsHistory.slice(-1)[0]);
    }
  }, [attemptsHistory]);

  return (
    <div className="home">
      <Link to="/quiz" className="start-btn">
        Start Quiz
      </Link>

      {lastRecord && (
        <div className="home-footer">
          <h2>Last attempt: </h2>
          <Link to="/history">
            Score: {lastRecord.score} Time: {lastRecord.time}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
