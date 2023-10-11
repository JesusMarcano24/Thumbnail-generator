import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (deps && Array.isArray(deps)) {
        fn(...(deps as []));
      } else {
        fn();
      }
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
