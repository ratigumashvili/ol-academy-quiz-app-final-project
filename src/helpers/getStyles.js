const detectStyle = (answer, item, showStyles) => {
  if (typeof answer === "number") {
    return showStyles
      ? item.at(-1) === answer.toString()
        ? "correct"
        : "incorrect"
      : null;
  }
  if (typeof answer === "boolean") {
    return showStyles
      ? item.value === answer.toString()
        ? "correct"
        : "incorrect"
      : null;
  }
  if (typeof answer === "object") {
    return showStyles
      ? answer.includes(+item.at(-1))
        ? "correct"
        : "incorrect"
      : null;
  }
};

export default detectStyle;
