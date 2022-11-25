import { useRef } from "react";
import { Link } from "react-router-dom";

import ContextMenu from "../components/ContextMenu";
import useContextMenu from "../hooks/useContextMenu";
import { setDataToLS } from "../helpers/getLocalStorage";

const History = ({ attemptsHistory, setAttemptsHistory }) => {
  const handleRemoveItem = (id) => {
    const updatedArry = attemptsHistory.filter((item) => item.id !== id);
    setAttemptsHistory(updatedArry);
    setDataToLS("past-attempts-v1", updatedArry);
  };

  const historyList = useRef();
  const menuRef = useRef();

  const { anchor, contextBlock, grabbedId, setContextBlock } = useContextMenu(
    historyList,
    menuRef
  );

  const sortRecors = (a, b) => {
    return b.score !== a.score
      ? b.score > a.score
        ? 1
        : -1
      : b.time > a.time
      ? 1
      : -1;
  };
  return (
    <>
      <h2>History</h2>
      {attemptsHistory && (
        <ul className="history-list" ref={historyList}>
          {attemptsHistory.sort(sortRecors).map(({ id, time, score }) => (
            <li key={id}>
              <div id={id}>Time: {time}</div>{" "}
              <div>
                Score: {score}{" "}
                <button
                  onClick={() => handleRemoveItem(id)}
                  className="common-btn remove-btn ml-1"
                >
                  x
                </button>
              </div>
            </li>
          ))}
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
