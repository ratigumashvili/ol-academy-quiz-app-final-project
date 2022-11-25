import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import History from "./pages/History";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

import useFetch from "./hooks/useFetch";
import { getDataFromLS } from "./helpers/getLocalStorage";

function App() {
  const { fetchedData: data, loading } = useFetch();

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attemptsHistory, setAttemptsHistory] = useState(
    getDataFromLS("past-attempts-v1") || []
  );

  return (
    <div className="app">
      <div className="wrapper">
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route index element={<Home attemptsHistory={attemptsHistory} />} />
          <Route
            path="/quiz"
            element={
              <Quiz
                data={data}
                loading={loading}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                attemptsHistory={attemptsHistory}
                setAttemptsHistory={setAttemptsHistory}
              />
            }
          />
          <Route
            path="/results"
            element={
              <Results
                data={data}
                correctAnswers={correctAnswers}
                attemptsHistory={attemptsHistory}
                setAttemptsHistory={setAttemptsHistory}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
