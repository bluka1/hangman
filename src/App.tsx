import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { LoginPage, GamePage, ScoresPage } from './pages';
import { withProtectedRoute } from './components';
import { LoadingContextProvider } from './context';

function App() {
  const ProtectedGameScoresPage = withProtectedRoute(ScoresPage);
  const ProtectedGamePage = withProtectedRoute(GamePage);
  return (
    <div className="app">
      <h1 className="app-title">Hangman Game</h1>
      <LoadingContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/game" element={<ProtectedGamePage />} />
            <Route path="/scores" element={<ProtectedGameScoresPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </LoadingContextProvider>
    </div>
  );
}

export default App;
