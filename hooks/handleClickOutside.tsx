import { useEffect } from "react";


export function useClickOutside(
  ref: React.RefObject<HTMLElement | HTMLButtonElement |null>,
  callback: () => void,
  ignoreRefs?: React.RefObject<HTMLElement |HTMLButtonElement | null>
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // If click is inside the main ref, do nothing
      if (ref.current && ref.current.contains(event.target as Node)) return;

      // If click is inside any ignoreRefs, do nothing
        if (ignoreRefs?.current && ignoreRefs.current.contains(event.target as Node)) {
          return;
        }
      callback();
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, ignoreRefs]);
}
