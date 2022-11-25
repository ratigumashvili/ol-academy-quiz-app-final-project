import { useState } from "react";

import detectStyle from "../helpers/getStyles";

const OptionBtn = ({
  item,
  disabled,
  handleDetectClick,
  answer,
  showStyles,
  value,
}) => {
  const [dataSelected, setDataSelected] = useState("false");

  const handleDataAttribute = () => {
    setDataSelected("true");
  };

  return (
    <button
      disabled={disabled}
      onClick={() => {
        handleDetectClick(item);
        handleDataAttribute();
      }}
      value={value ? item.value : null}
      data-selected={dataSelected}
      className={detectStyle(answer, item, showStyles)}
    >
      {item.name ? item.name : item}
    </button>
  );
};

export default OptionBtn;
