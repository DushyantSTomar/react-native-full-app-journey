import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return {
    value,
    on,
    off,
    toggle,
  };
}
