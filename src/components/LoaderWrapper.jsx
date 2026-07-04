'use client';

import { useState, useCallback } from 'react';
import Loader from './Loader';

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={handleComplete} />}
      <div style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}>
        {children}
      </div>
    </>
  );
}
