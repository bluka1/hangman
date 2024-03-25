import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { LoginPage, GamePage, GameScoresPage } from './pages';
import { withProtectedRoute } from './components';

function App() {
  const ProtectedGameScoresPage = withProtectedRoute(GameScoresPage);
  const ProtectedGamePage = withProtectedRoute(GamePage);
  return (
    <div className="app">
      <h1 className="app-title">Hangman Game</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game" element={<ProtectedGamePage />} />
          <Route path="/scores" element={<ProtectedGameScoresPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
