const Die = ({ die, onClick, disabled }) => {
  return (
    <button
      className={`die ${die.isSelected ? "selected" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <h2>{die.value || "?"}</h2>
    </button>
  );
};

export default Die;
