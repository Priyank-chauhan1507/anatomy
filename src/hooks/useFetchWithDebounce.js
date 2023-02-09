import { useState, useEffect, useRef } from "react";

const useFetchWithDebounce = (url = "", timeout = 0) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (url) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const resp = await fetch(url);
          const json = await resp.json();
          if (json.status === "success") {
            setApiData(json);
            setServerError(null);
            return;
          }
          throw new Error("Request Failed");
        } catch (e) {
          setApiData(null);
          setServerError(e);
        } finally {
          setIsLoading(false);
        }
      }, timeout);
    }
  }, [url, timeout]);

  return { isLoading, apiData, serverError };
};

export default useFetchWithDebounce;
