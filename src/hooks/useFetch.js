import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

const useFetch = (url, isAccepted = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await fetch(url);
        const json = await resp.json();
        var data = json;
        if (typeof data == "string") {
          var parsedWordArray = CryptoJS.enc.Base64.parse(data);
          data = JSON.parse(parsedWordArray.toString(CryptoJS.enc.Utf8));
        }
        setApiData(data);

        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    //const urlParams = new URLSearchParams(window.location.search);

    if (localStorage.getItem("secret") === "1t5a53cr3t123") {
      if (isAccepted) {
        fetchData();
      } else setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [url, isAccepted]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
