import { rules, calculateResult } from "../utils";
import ScoreboardRow from "./ScoreboardRow";

const Scoreboard = ({
  score,
  currentPlayer,
  onSelectRule,
  selectedRule,
  isGameOver,
}) => {
  return (
    <div>
      <h2>Current player: {currentPlayer}</h2>
      <table className="scoreboard">
        <thead>
          <tr>
            <th>Yamb</th>
            <th>Player 1</th>
            <th>Player 2</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <ScoreboardRow
              key={rule}
              rule={rule}
              playerOneValue={score.playerOne[rule]}
              playerTwoValue={score.playerTwo[rule]}
              currentPlayer={currentPlayer}
              onSelectRule={onSelectRule}
              isSelected={selectedRule === rule}
            />
          ))}
          {isGameOver && (
            <tr>
              <td>total</td>
              <td disabled>{calculateResult(score.playerOne)}</td>
              <td disabled>{calculateResult(score.playerTwo)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
