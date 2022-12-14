import { useState, useEffect } from "react";

import NextButton from "../NextButton";
import Question from "../Question";
import OptionBtn from "../OptionBtn";
import depCompare from "../../helpers/depCompare";

const MultipleQuestion = ({
  data,
  current,
  setCurrent,
  setCorrectAnswers,
  handleProgressBarChange,
}) => {
  const answer = data?.answers[current]?.answer;
  const [countClick, setCountClick] = useState(0);
  const [choices, setChoices] = useState([]);

  const [generateResult, setGenerateResult] = useState({
    disabled: false,
    showStyles: false,
    showNext: false,
  });

  const handleDetectClick = (value) => {
    if (!choices.includes(value.at(-1))) {
      setCountClick(countClick + 1);
      setChoices([...choices, +value.at(-1)]);
    }
  };

  useEffect(() => {
    const checkAnswer = () => {
      if (depCompare(answer.sort(), choices.sort())) {
        setCorrectAnswers((prev) => prev + 1);
      }
    };

    if (countClick === answer.length) {
      checkAnswer();

      setGenerateResult((prev) => {
        return {
          ...prev,
          disabled: true,
          showStyles: true,
          showNext: true,
        };
      });

      handleProgressBarChange();
    }
  }, [answer, choices, countClick, setCorrectAnswers, handleProgressBarChange]);

  const { disabled, showStyles, showNext } = generateResult;

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

export default MultipleQuestion;
