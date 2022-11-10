const CustomProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <span style={{ width: `${progress}%` }}></span>
    </div>
  );
};

export default CustomProgressBar;
