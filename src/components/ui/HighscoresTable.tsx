import { Score } from '../../models';

const HighscoresTable = ({ highscores }: { highscores: Score[] }) => {
  return (
    <table className="highscores-table">
      <caption>Top 20 results:</caption>
      <thead>
        <tr>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {highscores.map((score) => (
          <tr key={Math.random().toFixed(9)}>
            <td>{score.userName}</td>
            <td>{score.score.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HighscoresTable;
