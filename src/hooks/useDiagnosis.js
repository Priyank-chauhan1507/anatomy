import { useEffect, useState } from "react";
import useTranslations from "./useTranslations";

var diagnosisData = {};
const initialDiagnosis = {
  data: {},
  isLoaded: false,
  isError: false,
};

export const getDiagnosisData = (icd_code = "", lang = "") => {
  return diagnosisData[lang]?.[icd_code];
};

export const fetchDiagnosisData = (icd_code = "", lang = "") => {
  return new Promise((resolve, reject) => {
    if (diagnosisData[lang] && diagnosisData[lang][icd_code]) {
      const data = diagnosisData[lang][icd_code];
      if (data.isLoaded) {
        resolve(data);
      } else {
        const timeInterval = setInterval(() => {
          const data = diagnosisData[lang][icd_code];
          if (data.isLoaded) {
            clearInterval(timeInterval);
            resolve(data);
          }
        }, 1000);
      }
    } else {
      if (!diagnosisData[lang]) {
        diagnosisData[lang] = {};
      }
      diagnosisData[lang][icd_code] = {
        data: {},
        isLoaded: false,
        isError: false,
      };
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/icd/diagnosis?lang=${lang}&icdCode=${icd_code}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!diagnosisData[lang]) {
            diagnosisData[lang] = {};
          }
          diagnosisData[lang][icd_code] = {
            ...diagnosisData[lang][icd_code],
            isLoaded: true,
            data: data,
          };
          resolve(diagnosisData[lang][icd_code]);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

export const useDiagnosis = (icd_code = "") => {
  const [diagnosis, setDiagnosis] = useState(initialDiagnosis);
  const { diagnosisLanguage } = useTranslations();

  useEffect(() => {
    if (icd_code) {
      fetchDiagnosisData(icd_code, diagnosisLanguage)
        .then((data) => {
          setDiagnosis(data);
        })
        .catch((err) => {});
    }
  }, [icd_code, diagnosisLanguage]);

  return diagnosis;
};

export const useListOfDiagnosis = (icd_codes = []) => {
  const [diagnoses, setDiagnoses] = useState([]);
  const { diagnosisLanguage } = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      setDiagnoses(icd_codes.map((icd_code) => initialDiagnosis));

      for (let i = 0; i < icd_codes.length; i++) {
        try {
          const diagnosis = await fetchDiagnosisData(
            icd_codes[i],
            diagnosisLanguage
          );
          setDiagnoses((d) => [...d.slice(0, i), diagnosis, ...d.slice(i + 1)]);
        } catch (error) {}
      }
    };

    if (icd_codes?.length > 0) {
      fetchData();
    } else {
      setDiagnoses([]);
    }
  }, [icd_codes, diagnosisLanguage]);

  return diagnoses;
};
