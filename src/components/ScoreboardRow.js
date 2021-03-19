import React from "react";

import { Players } from "../consts";

const ScoreboardRow = ({
  rule,
  playerOneValue,
  playerTwoValue,
  currentPlayer,
  onSelectRule,
  isSelected,
}) => {
  const { playerOne, playerTwo } = Players;

  const playerOneDisabled =
    currentPlayer !== playerOne || playerOneValue !== null;
  const playerTwoDisabled =
    currentPlayer !== playerTwo || playerTwoValue !== null;

  const playerOneSelected = isSelected && currentPlayer === playerOne;
  const playerTwoSelected = isSelected && currentPlayer === playerTwo;

  const handleSelectCell = (player) => {
    if (
      (player === playerOne && playerOneDisabled) ||
      (player === playerTwo && playerTwoDisabled)
    ) {
      return;
    }

    onSelectRule(rule);
  };

  return (
    <tr>
      <td>{rule}</td>
      <td
        className={playerOneSelected ? "selected" : ""}
        disabled={playerOneDisabled}
        onClick={() => handleSelectCell(playerOne)}
      >
        {playerOneValue}
      </td>
      <td
        className={playerTwoSelected ? "selected" : ""}
        disabled={playerTwoDisabled}
        onClick={() => handleSelectCell(playerTwo)}
      >
        {playerTwoValue}
      </td>
    </tr>
  );
};

export default ScoreboardRow;
