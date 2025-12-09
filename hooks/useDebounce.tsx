import { useEffect, useState } from "react";

function useDebounce(text: string, delay: number) {
  const [debounceText, setDebounceText] = useState("");

  useEffect(() => {
    const hendler = setTimeout(() => {
      setDebounceText(text);
    }, delay);

    return () => {
      clearTimeout(hendler);
    };
  }, [text, delay]);

  return debounceText;
}

export default useDebounce;
