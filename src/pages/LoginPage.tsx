import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Page, UsernameForm } from '../components';
import { RootState } from '../services/stores';

const LoginPage = () => {
  const username = useSelector((state: RootState) => state.hangman.userName);

  if (username) {
    return <Navigate to="/game" />;
  }

  return (
    <Page
      description={
        <>
          <p className="page-description">
            Dear user, welcome to Hangman game made by{' '}
            <a href="http://bluka1.pro/" target="_blank">
              bluka1
            </a>
            .
          </p>
          <p className="page-description">
            Please enter your username to play the game.
          </p>
        </>
      }
    >
      <UsernameForm />
    </Page>
  );
};

export default LoginPage;
