'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import Loader from './Loader';

const LoaderContext = createContext(true);

export const useLoader = () => useContext(LoaderContext);

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <LoaderContext.Provider value={loading}>
      {loading && <Loader onComplete={handleComplete} />}
      <div style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
}
