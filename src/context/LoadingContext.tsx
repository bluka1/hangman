import { createContext, useState } from 'react';
import { Loading } from '../components';
import { LoadingContextType } from '../models';

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export const LoadingContextProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading ? <Loading /> : null}
      {children}
    </LoadingContext.Provider>
  );
};
