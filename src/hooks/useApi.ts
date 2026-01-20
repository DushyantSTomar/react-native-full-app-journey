import { useState, useCallback, useRef } from 'react';
import { getApiError, ApiError } from '../api/apiError';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export function useApi<T>(apiFn: ApiFunction<T>, initialLoading = false) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<ApiError | null>(null);

  const lastArgsRef = useRef<any[] | null>(null);

  const request = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      lastArgsRef.current = args;

      try {
        const result = await apiFn(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(getApiError(err));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );


  const retry = useCallback(() => {
    if (lastArgsRef.current) {
      return request(...lastArgsRef.current);
    }
  }, [request]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
    lastArgsRef.current = null;
  };

  return {
    data,
    loading,
    error,
    request,
    retry,  
    reset,
  };
}
