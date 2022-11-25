import { useState } from "react";

import NextButton from "../NextButton";
import Question from "../Question";
import OptionBtn from "../OptionBtn";

const SingleQuestion = ({
  data,
  current,
  setCurrent,
  setCorrectAnswers,
  handleProgressBarChange,
}) => {
  const [generateResult, setGenerateResult] = useState({
    showStyles: false,
    disabled: false,
    showNext: false,
  });
  const answer = data?.answers[current]?.answer;

  const handleDetectClick = (value) => {
    if (value.at(-1) === answer.toString()) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setGenerateResult((prev) => {
      return {
        ...prev,
        showStyles: true,
        disabled: true,
        showNext: true,
      };
    });

    handleProgressBarChange();
  };

  const { showStyles, disabled, showNext } = generateResult;
  return (
    <>
      <Question
        question={data.questions[current].question}
        number={current + 1}
        total={data.questions.length}
      />
      <div className="answers">
        {data.questions[current].options?.map((item, i) => (
          <OptionBtn
            key={i}
            item={item}
            disabled={disabled}
            handleDetectClick={handleDetectClick}
            answer={answer}
            showStyles={showStyles}
          />
        ))}
      </div>
      {showNext && (
        <NextButton data={data} current={current} setCurrent={setCurrent} />
      )}
    </>
  );
};

export default SingleQuestion;
