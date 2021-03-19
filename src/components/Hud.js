import React, { useEffect, useState } from "react";

import { constructDice } from "../utils/defaults";
import { roll } from "../utils/roll";
import Die from "./Die";

const initialState = {
  dice: constructDice(),
};

const Hud = ({ onSubmit, isCellSelected, isGameOver, onRestartGame }) => {
  const [dice, setDice] = useState(initialState.dice);
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    if (rollCount === 3) {
      setDice((prev) => {
        const updatedDice = prev.map((die) => ({ ...die, isSelected: true }));

        return updatedDice;
      });
    }
  }, [rollCount]);

  const handleRerollDice = () => {
    setDice((prev) => {
      const updatedDice = prev.map((die) => {
        return {
          ...die,
          value: die.isSelected ? die.value : roll(),
        };
      });

      return updatedDice;
    });

    setRollCount((prev) => prev + 1);
  };

  const handleToggleDie = (index) => {
    setDice((prev) => {
      const updatedDice = [...prev];
      const updatedDie = { ...updatedDice[index] };

      updatedDie.isSelected = !updatedDie.isSelected;

      updatedDice[index] = updatedDie;

      return updatedDice;
    });
  };

  const handleSubmit = () => {
    const diceValues = dice.map((die) => die.value);

    onSubmit(diceValues);

    setDice(initialState.dice);
    setRollCount(0);
  };

  const disabledRoll = rollCount === 3 || isGameOver;

  return (
    <div>
      <h3>Roll {rollCount}/3</h3>
      <div className="diceWrapper">
        {dice.map((die, index) => (
          <Die
            key={index}
            die={die}
            onClick={() => handleToggleDie(index)}
            disabled={rollCount === 0 || disabledRoll}
          />
        ))}
      </div>
      <div className="buttonWrapper">
        <button
          className="button"
          onClick={handleRerollDice}
          disabled={disabledRoll}
        >
          Roll
        </button>
        <button
          className="button"
          onClick={handleSubmit}
          disabled={!isCellSelected || rollCount === 0}
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
