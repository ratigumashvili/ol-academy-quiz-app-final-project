import { useRef } from "react";
import { Link } from "react-router-dom";

import ContextMenu from "../components/ContextMenu";
import useContextMenu from "../hooks/useContextMenu";

const History = ({ attemptsHistory, setAttemptsHistory }) => {
  const handleRemoveItem = (id) => {
    const updatedArry = attemptsHistory.filter((item) => item.id !== id);
    setAttemptsHistory(updatedArry);
    localStorage.setItem("past-attempts-v1", JSON.stringify(updatedArry));
  };

  const historyList = useRef();
  const menuRef = useRef();

  const { anchor, contextBlock, grabbedId, setContextBlock } = useContextMenu(
    historyList,
    menuRef
  );

  return (
    <>
      <h2>History</h2>
      {attemptsHistory && (
        <ul className="history-list" ref={historyList}>
          {attemptsHistory
            .sort((a, b) =>
              b.score !== a.score
                ? b.score > a.score
                  ? 1
                  : -1
                : b.time > a.time
                ? 1
                : -1
            )
            .map((item) => {
              const { id, time, score } = item;
              return (
                <li key={id}>
                  <div id={id}>Time: {time}</div>{" "}
                  <div>
                    Score: {score}{" "}
                    <button
                      onClick={() => handleRemoveItem(id)}
                      className="common-btn remove-btn"
                      style={{ marginLeft: "15px" }}
                    >
                      x
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      {contextBlock && (
        <ContextMenu
          anchor={anchor}
          menuRef={menuRef}
          setContextBlock={setContextBlock}
          grabbedId={grabbedId}
          handleRemoveItem={handleRemoveItem}
        />
      )}
      <Link to="/" className="common-btn">
        Home
      </Link>
    </>
  );
};

export default History;
