import { useState, useCallback } from 'react';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export function useApi<T>(apiFn: ApiFunction<T>, initialLoading = false) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<unknown>(null);

  const request = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFn(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    request,
    reset,
  };
}
