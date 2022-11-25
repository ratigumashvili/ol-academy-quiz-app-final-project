import { useState } from "react";

import NextButton from "../NextButton";
import Question from "../Question";
import OptionBtn from "../OptionBtn";

const BUTTONS = [
  { name: "True", value: "true" },
  { name: "False", value: "false" },
];

const BooleanQuestion = ({
  data,
  current,
  setCurrent,
  setCorrectAnswers,
  handleProgressBarChange,
}) => {
  const [generateResult, setGenerateResult] = useState({
    disabled: false,
    showStyles: false,
    showNext: false,
  });

  const answer = data?.answers[current]?.answer;

  const handleDetectClick = ({ value }) => {
    setGenerateResult((prev) => {
      return {
        ...prev,
        disabled: true,
        showStyles: true,
        showNext: true,
      };
    });
    handleProgressBarChange();
    if (value === answer.toString()) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const { disabled, showStyles, showNext } = generateResult;
  return (
    <>
      <Question
        question={data.questions[current].question}
        number={current + 1}
        total={data.questions.length}
      />
      <div className="answers">
        {BUTTONS.map((item, i) => (
          <OptionBtn
            key={i}
            item={item}
            value={item.value}
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

export default BooleanQuestion;
