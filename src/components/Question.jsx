import React from "react";

const Question = ({ question, number, total }) => {
  return (
    <div className="question-heading">
      <h2>{question}</h2> Question {number} of {total}
    </div>
  );
};

export default Question;
