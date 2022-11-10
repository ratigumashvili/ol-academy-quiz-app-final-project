import { useState, useEffect, useCallback } from "react";

import Spinner from "../components/Spinner";
import SingleQuestion from "../components/questionType/SingleQuestion";
import MultipleQuestion from "../components/questionType/MultipleQuestion";
import BooleanQuestion from "../components/questionType/BooleanQuestion";
import CustomProgressBar from "../components/CustomProgressBar";

const Quiz = ({ data, loading, setCorrectAnswers }) => {
  const [type, setType] = useState(null);
  const [current, setCurrent] = useState(0);

  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleProgressBarChange = useCallback(() => {
    setProgress(((currentQuestion / total) * 100).toFixed());
  }, [currentQuestion, total]);

  useEffect(() => {
    if (data.questions) {
      setType(data.questions[current].type);
      setTotal(data.questions.length);
      setCurrentQuestion(data.questions[current].id);
    }
  }, [data, current]);

  useEffect(() => {
    setCorrectAnswers(0);
  }, [setCorrectAnswers]);

  if (loading) return <Spinner />;

  return (
    <>
      <CustomProgressBar progress={progress} />
      {type === "single" && (
        <SingleQuestion
          data={data}
          current={current}
          setCurrent={setCurrent}
          setCorrectAnswers={setCorrectAnswers}
          handleProgressBarChange={handleProgressBarChange}
        />
      )}
      {type === "multiple" && (
        <MultipleQuestion
          data={data}
          current={current}
          setCurrent={setCurrent}
          setCorrectAnswers={setCorrectAnswers}
          handleProgressBarChange={handleProgressBarChange}
        />
      )}
      {type === "boolean" && (
        <BooleanQuestion
          data={data}
          current={current}
          setCurrent={setCurrent}
          setCorrectAnswers={setCorrectAnswers}
          handleProgressBarChange={handleProgressBarChange}
        />
      )}
    </>
  );
};

export default Quiz;
