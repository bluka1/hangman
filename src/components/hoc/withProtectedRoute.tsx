import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../services/stores';

export default function withProtectedRoute(Component: any) {
  return (props: any): React.ReactElement => {
    const hasUsername = useSelector(
      (state: RootState) => state.hangman.userName
    );
    const componentToRender = hasUsername ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
    return componentToRender;
  };
}
