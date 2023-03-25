import { useState, useEffect } from "react";
import Die from "./Die";
import { constructDice, generateRandomDieNumber } from "../utils";

const Hud = ({ onSubmit, isSubmitDisabled, isGameOver, onRestartGame }) => {
  const [dice, setDice] = useState(constructDice());
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    if (rollCount === 3) {
      setDice((prev) =>
        prev.map((die) => ({
          ...die,
          isSelected: true,
        }))
      );
    }
  }, [rollCount]);

  const handleRoll = () => {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        value: die.isSelected ? die.value : generateRandomDieNumber(),
      }))
    );
    setRollCount((prev) => prev + 1);
  };

  const handleSelectDie = (index) => {
    setDice((prev) => {
      const newDice = [...prev];

      newDice[index] = {
        ...newDice[index],
        isSelected: !newDice[index].isSelected,
      };

      return newDice;
    });
  };

  const handleSubmit = () => {
    const diceValues = dice.map((die) => die.value);

    onSubmit(diceValues);

    setDice(constructDice());
    setRollCount(0);
  };

  return (
    <div>
      <h2>Roll count: {rollCount}/3</h2>
      <div className="diceWrapper">
        {dice.map((die, index) => (
          <Die
            key={index}
            die={die}
            onClick={() => handleSelectDie(index)}
            disabled={rollCount === 0 || rollCount === 3}
          />
        ))}
      </div>
      <div className="buttonWrapper">
        <button
          className="button"
          onClick={handleRoll}
          disabled={isGameOver || rollCount === 3}
        >
          Roll
        </button>
        <button
          className="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled || rollCount === 0}
        >
          Submit
        </button>
        {isGameOver && (
          <button className="button" onClick={onRestartGame}>
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default Hud;
