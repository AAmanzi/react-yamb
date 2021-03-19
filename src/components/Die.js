import React from "react";

const Die = ({ die, onClick, disabled }) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`die ${die.isSelected ? "selected" : ""}`}
    >
      <h2 className="dieValue">{die.value || "?"}</h2>
    </div>
  );
};

export default Die;
