const ScoreboardRow = ({
  rule,
  playerOneValue,
  playerTwoValue,
  currentPlayer,
  onSelectRule,
  isSelected,
}) => {
  const playerOneDisabled =
    currentPlayer !== "playerOne" || playerOneValue !== null;
  const playerTwoDisabled =
    currentPlayer !== "playerTwo" || playerTwoValue !== null;

  const playerOneSelected = isSelected && currentPlayer === "playerOne";
  const playerTwoSelected = isSelected && currentPlayer === "playerTwo";

  const handleSelectCell = () => {
    onSelectRule(rule);
  };

  return (
    <tr>
      <td>{rule}</td>
      <td>
        <button
          className={playerOneSelected ? "selected" : ""}
          disabled={playerOneDisabled}
          onClick={handleSelectCell}
        >
          {playerOneValue}
        </button>
      </td>
      <td>
        <button
          className={playerTwoSelected ? "selected" : ""}
          disabled={playerTwoDisabled}
          onClick={handleSelectCell}
        >
          {playerTwoValue}
        </button>
      </td>
    </tr>
  );
};

export default ScoreboardRow;
