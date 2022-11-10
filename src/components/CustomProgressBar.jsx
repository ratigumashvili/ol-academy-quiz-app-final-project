const CustomProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <span
        style={{ width: `${progress}%`, transition: `all 0.25s ease 0s` }}
      ></span>
    </div>
  );
};

export default CustomProgressBar;
