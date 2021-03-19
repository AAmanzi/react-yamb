import React from "react";

import { Players, Rules } from "../consts";
import { calculateResult } from "../utils/resultCalculator";

import ScoreboardRow from "./ScoreboardRow";

const Scoreboard = ({
  currentPlayer,
  score,
  onSelectRule,
  selectedRule,
  isGameOver,
}) => {
  const { playerOne, playerTwo } = Players;

  return (
    <div>
      <h2>Current player: {currentPlayer}</h2>
      <table className="scoreboard">
        <thead>
          <tr>
            <th>Yamb</th>
            <th>{playerOne}</th>
            <th>{playerTwo}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(Rules).map((ruleKey) => {
            const rule = Rules[ruleKey];

            return (
              <ScoreboardRow
                key={ruleKey}
                rule={rule}
                playerOneValue={score[playerOne][rule]}
                playerTwoValue={score[playerTwo][rule]}
                currentPlayer={currentPlayer}
                onSelectRule={onSelectRule}
                isSelected={selectedRule === rule}
              />
            );
          })}
          {isGameOver && (
            <tr>
              <td>total</td>
              <td disabled>{calculateResult(score[playerOne])}</td>
              <td disabled>{calculateResult(score[playerTwo])}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
