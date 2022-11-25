import { useRef } from "react";
import { Link } from "react-router-dom";

import ContextMenu from "../components/ContextMenu";

import useContextMenu from "../hooks/useContextMenu";
import { setDataToLS } from "../helpers/getLocalStorage";

const sortRecors = (a, b) => {
  return b.score !== a.score
    ? b.score > a.score
      ? 1
      : -1
    : b.time > a.time
    ? 1
    : -1;
};

const History = ({ attemptsHistory, setAttemptsHistory }) => {
  const handleRemoveItem = (idToDelete) => {
    const updatedArry = attemptsHistory.filter(({ id }) => id !== idToDelete);
    setAttemptsHistory(updatedArry);
    setDataToLS("past-attempts-v1", updatedArry);
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
          {attemptsHistory.sort(sortRecors).map(({ id, time, score }) => (
            <li key={id} id={id}>
              Time: {time} Score: {score}
              <button
                onClick={() => handleRemoveItem(id)}
                className="common-btn remove-btn ml-1"
              >
                x
              </button>
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
