import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounceCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};
