import { useState, useEffect, useCallback } from "react";

import Spinner from "../components/Spinner";
import SingleQuestion from "../components/questionType/SingleQuestion";
import MultipleQuestion from "../components/questionType/MultipleQuestion";
import BooleanQuestion from "../components/questionType/BooleanQuestion";
import CustomProgressBar from "../components/CustomProgressBar";

const calculateStep = (current, total) => ((current / total) * 100).toFixed();

const Quiz = ({ data, loading, setCorrectAnswers }) => {
  const [initialQuestions, setInitialQuestions] = useState({
    type: null,
    total: 0,
    currentQuestion: 0,
  });

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const { type, total, currentQuestion } = initialQuestions;

  const handleProgressBarChange = useCallback(() => {
    setProgress(calculateStep(currentQuestion, total));
  }, [currentQuestion, total]);

  useEffect(() => {
    if (data.questions) {
      setInitialQuestions((prev) => {
        return {
          ...prev,
          type: data.questions[current].type,
          total: data.questions.length,
          currentQuestion: data.questions[current].id,
        };
      });
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
