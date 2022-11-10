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
  const [disabled, setDisabled] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const answer = data?.answers[current]?.answer;
  const handleDetectClick = (item) => {
    setDisabled(true);
    setShowStyles(true);
    setShowNext(true);
    handleProgressBarChange();
    if (item.value === answer.toString()) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };
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
