import DateFnsUtils from "@date-io/date-fns";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import {
  setIsLanguageLoaded,
  setIsLanguageDataAvailable,
  setMorphoMap,
  setMorphoArray,
  setTagsArray,
  setLaterality,
  setCountries,
  setAnatomicData,
  setLanguagesData,
  setDiagnosisComplexity,
  setUiData,
  setTags,
  setEgztData,
  setDiagnosisLanguages,
  setPinTitles,
  setIsErrorOccured,
  setPrivacyTermsLicenseLabels,
} from "../store/slices/translation";
import { Backdrop } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import enLocale from "date-fns/locale/en-US";
import { isEmpty } from "lodash";
import spinner from "../assets/spinner.gif";
import { translateDescription } from "../store/slices/lists";
import { changeLanguageSetting } from "../store/slices/userSettings";
import { defaultModifiers } from "./translationHelpers";
import { languageCodeMap } from "./languageCodes";
import useToasterMessage from "../hooks/useToasterMessage";

const uiTranslationsURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-translateui?`;
const anatomicTranslationsURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-sites?index=285`;
const languagesDataURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-languages`;
const lateralityUrl = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-laterality`;
const mapLateralityURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-latlabels`;
const modifiersURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-mods`;
const countriesListURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-countries`;
const tagsURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-tags`;

const translatePrivacyTermsLicenseURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-policies`;
const egztURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-egzt`;

const morphologyURL = `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-dermmorphology`;



export const TranslationContext = createContext();
const defaultLaterality = {
  right: { text: "Right", icd_code: "XK9K", key: "right" },
  left: { text: "Left", icd_code: "XK8G", key: "left" },
  bilateral: {
    text: "Bilateral",
    icd_code: "XK9J",
    key: "bilateral",
  },
  median: {
    text: "Median",
    icd_code: "CustomAMMedian",
    key: "median",
  },
  unilateral: {
    text: "Unilateral, unspecified",
    icd_code: "XK70",
    key: "unilateral",
  },
  language_code: "en",
  modifierTerms: defaultModifiers.data,
};
const TranslationProvider = ({ children }) => {
  // const [language, setLanguage] = useState(languages[0].code);
  const isSVGLoaded = useSelector((state) => state.app.isSVGLoaded);
  const language = useSelector((state) => state.userSettings.language);
  const diagnosisLanguage = useSelector(
    (state) => state.userSettings.diagnosisLanguage
  );
  const dispatch = useDispatch();
  const acceptLic = useSelector((state) => state.userSettings.acceptLic);
  const acceptStatement = useSelector(
    (state) => state.userSettings.acceptStatement
  );
  const isLanguageLoaded = useSelector(
    (state) => state.translation.isLanguageLoaded
  );
  const isLanguageDataAvailable = useSelector(
    (state) => state.translation.isLanguageDataAvailable
  );
  const isErrorOccured = useSelector(
    (state) => state.translation.isErrorOccured
  );
  const morphoMap = useSelector((state) => state.translation.morphoMap);
  const morphoArray = useSelector((state) => state.translation.morphoArray);
  const tagsArray = useSelector((state) => state.translation.tagsArray);
  const laterality = useSelector((state) => state.translation.laterality);
  const countries = useSelector((state) => state.translation.countries);
  const privacyTermsLicenseLabels = useSelector(
    (state) => state.translation.privacyTermsLicenseLabels
  );
  const anatomicData = useSelector((state) => state.translation.anatomicData);
  const languagesData = useSelector((state) => state.translation.languagesData);
  const diagnosisComplexity = useSelector(
    (state) => state.translation.diagnosisComplexity
  );
  const uiData = useSelector((state) => state.translation.uiData);
  const tags = useSelector((state) => state.translation.tags);
  const egztData = useSelector((state) => state.translation.egztData);
  const diagnosisLanguages = useSelector(
    (state) => state.translation.diagnosisLanguages
  );
  const magMapping = useSelector((state) => state.translation.magMapping);
  // const locale = useSelector((state) => state.translation.locale);
  const [locale, setLocale] = useState(enLocale);
  const pinTitles = useSelector((state) => state.translation.pinTitles);

  const isAccepted = acceptLic && acceptStatement;

  const { apiData: countriesList } = useFetch(
    countriesListURL + `?lang=${language}`,
    isAccepted
  );

  const { apiData: translatePrivacyTermsLicense } = useFetch(
    translatePrivacyTermsLicenseURL + `?lang=${language}`,
    true
  );

  const {
    isLoading: uiDataLoading,
    apiData: apiUiData,
    serverError: uiDataError,
  } = useFetch(uiTranslationsURL + `lang=${language}`, true);

  const {
    isLoading: anatomicDataLoading,
    apiData: apiAnatomicData,
    serverError: anatomicDataError,
  } = useFetch(anatomicTranslationsURL + `&lang=${language}`, isAccepted);

  const {
    apiData: apiLanguagesData,
    serverError,
    isLoading,
  } = useFetch(languagesDataURL + `?lang=${language}`, true);

  const { apiData: lateralityData } = useFetch(
    lateralityUrl + `?lang=${language}`,
    isAccepted
  );

  const { apiData: mapLateralityLabel } = useFetch(
    mapLateralityURL + `?lang=${language}`,
    isAccepted
  );

  const { apiData: modifierTerms } = useFetch(
    modifiersURL + `?lang=${language}`,
    isAccepted
  );

  const { apiData: tagsData } = useFetch(
    tagsURL + `?lang=${language}`,
    isAccepted
  );

  const { apiData: apiEgztData } = useFetch(
    egztURL + `?lang=${language}`,
    isAccepted
  );

  const { apiData: morphoData } = useFetch(
    morphologyURL + `?lang=${language}`,
    isAccepted
  );
  const { apiData: diagnosisComplexityData } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/am-diagnosiscomplexity`
  );

  useEffect(() => {
    if (lateralityData && lateralityData.laterality) {
      const newLaterality = {
        language_code: language ? language : "en",
        modifierTerms:
          modifierTerms && modifierTerms.data
            ? modifierTerms.data
            : defaultModifiers.data,
        bilateral: {
          text: lateralityData.laterality.B.tr_text,
          icd_code: lateralityData.laterality.B.icd_code,
          key: "bilateral",
          foundation_id: lateralityData.laterality.B.foundation_id,
          emoji_code: lateralityData.laterality.B.emoji_code,
          laterality_id: lateralityData.laterality.B.laterality_id,
        },
        right: {
          text: lateralityData.laterality.R.tr_text,
          icd_code: lateralityData.laterality.R.icd_code,
          key: "right",
          foundation_id: lateralityData.laterality.R.foundation_id,
          emoji_code: lateralityData.laterality.R.emoji_code,
          laterality_id: lateralityData.laterality.R.laterality_id,
        },
        left: {
          text: lateralityData.laterality.L.tr_text,
          icd_code: lateralityData.laterality.L.icd_code,
          key: "left",
          foundation_id: lateralityData.laterality.L.foundation_id,
          emoji_code: lateralityData.laterality.L.emoji_code,
          laterality_id: lateralityData.laterality.L.laterality_id,
        },
        median: {
          text: lateralityData.laterality.M.tr_text,
          icd_code: lateralityData.laterality.M.icd_code,
          key: "median",
          foundation_id: lateralityData.laterality.M.foundation_id,
          emoji_code: lateralityData.laterality.M.emoji_code,
          laterality_id: lateralityData.laterality.M.laterality_id,
        },
        unilateral: {
          text: lateralityData.laterality.U.tr_text,
          icd_code: lateralityData.laterality.U.icd_code,
          key: "unilateral",
          foundation_id: lateralityData.laterality.U.foundation_id,
          emoji_code: lateralityData.laterality.U.emoji_code,
          laterality_id: lateralityData.laterality.U.laterality_id,
        },
      };

      dispatch(setLaterality(newLaterality));
    } else {
      dispatch(setLaterality(defaultLaterality));
    }
    // eslint-disable-next-line
  }, [lateralityData, modifierTerms]);

  // changing map laterality labels
  useEffect(() => {
    if (mapLateralityLabel && mapLateralityLabel.status !== "error") {
      const latLabelLeft = document.getElementById("LatLabelLeft");
      const latLabelRight = document.getElementById("LatLabelRight");
      const mapLanguageOnSvg = document.getElementById("MapLanguage:");
      if (
        isSVGLoaded &&
        latLabelLeft &&
        latLabelRight &&
        mapLanguageOnSvg &&
        !uiDataLoading &&
        !uiDataError &&
        !anatomicDataLoading &&
        !anatomicDataError
      ) {
        const elements1 = latLabelLeft.children;

        for (let i = 0; i < elements1.length; i++) {
          elements1[i].innerHTML = mapLateralityLabel.data.l_abbreviation;
        }
        const elements2 = latLabelRight.children;
        for (let i = 0; i < elements2.length; i++) {
          elements2[i].innerHTML = mapLateralityLabel.data.r_abbreviation;
        }
        mapLanguageOnSvg.innerHTML = "🌐 " + language;
        mapLanguageOnSvg.style.textAnchor = "middle";
      }
    }
  }, [
    mapLateralityLabel,
    isSVGLoaded,
    uiDataLoading,
    uiDataError,
    anatomicDataLoading,
    anatomicDataError,
    language,
  ]);

  useEffect(() => {
    if (!isEmpty(uiData)) {
      dispatch(translateDescription({ uiData }));
    }
    // eslint-disable-next-line
  }, [uiData]);
  // setting morphology data

  useEffect(() => {
    if (morphoData && morphoData.result) {
      dispatch(setMorphoMap(morphoData.result));
      dispatch(setMorphoArray(Object.keys(morphoData.result)));
    }
  }, [morphoData]);

  // setting data-fns locale file (for translations)
  useEffect(() => {
    const importLocaleFile = async () => {
      try {
        let currLang;

        if (languageCodeMap[language]) {
          currLang = languageCodeMap[language];
        } else {
          currLang = language;
        }
        const localeToSet = await import(
          `date-fns/locale/${currLang}/index.js`
        );
        setLocale(localeToSet.default);
      } catch (err) {
        // ;
      }
    };

    if (locale.code !== language) {
      importLocaleFile();
    }
  }, [language, locale.code]);

  // settings tags array
  useEffect(() => {
    if (tagsData?.imageTag) {
      dispatch(setTagsArray(Object.values(tagsData.imageTag)));
      dispatch(setTags(tagsData.imageTag));
    }
  }, [tagsData]);

  // change language
  const changeLanguage = useCallback(
    (lang) => {
      const newDiagnosisLanguage =
        languagesData[lang].diagnosis_and_extensions_language;
      dispatch(
        changeLanguageSetting({
          language: lang,
          diagnosisLanguage: newDiagnosisLanguage,
        })
      );
    },
    [dispatch, languagesData]
  );

  // checking whether data is available or not for that language
  const toaster = useToasterMessage();
  useEffect(() => {
    if (
      modifierTerms &&
      lateralityData &&
      mapLateralityLabel &&
      language !== "en"
    ) {
      if (
        modifierTerms.status === "error" ||
        lateralityData.status === "error" ||
        mapLateralityLabel.status === "error"
      ) {
        toaster({
          message: `Translations for this language are currently not available!`,
          type: "info",
        });
        dispatch(changeLanguageSetting("en"));
      }
    }
    // eslint-disable-next-line
  }, [modifierTerms, lateralityData, mapLateralityLabel]);

  useEffect(() => {
    if (countriesList?.data) {
      const array = Object.values(countriesList.data);
      array.sort((a, b) => {
        return a.country_code_sort_order > b.country_code_sort_order ? 1 : -1;
      });
      dispatch(setCountries(array));
    }
  }, [countriesList]);

  useEffect(() => {
    if (translatePrivacyTermsLicense?.data) {
      const newPrivacyTermsLicenseLabels = {};
      Object.keys(translatePrivacyTermsLicense.data).forEach((val) => {
        newPrivacyTermsLicenseLabels[val] = {
          tr_text: translatePrivacyTermsLicense.data[val].tr_text,
          tr_text_all: translatePrivacyTermsLicense.data[val].tr_text_all,
        };
      });

      // Removing double quotes from policy
      if (newPrivacyTermsLicenseLabels.WebAppPrivacyPolicy) {
        newPrivacyTermsLicenseLabels.WebAppPrivacyPolicy.tr_text =
          newPrivacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text?.slice(
            1,
            newPrivacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text?.length -
            1
          );
      }
      if (newPrivacyTermsLicenseLabels.WebAppPrivacyPolicy?.tr_text_all) {
        newPrivacyTermsLicenseLabels.WebAppPrivacyPolicy.tr_text_all =
          newPrivacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text_all?.slice(
            1,
            newPrivacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text_all
              ?.length - 1
          );
      }
      newPrivacyTermsLicenseLabels.WebAppTermsAndConditions.tr_text =
        newPrivacyTermsLicenseLabels?.WebAppTermsAndConditions?.tr_text?.slice(
          1,
          newPrivacyTermsLicenseLabels?.WebAppTermsAndConditions?.tr_text
            ?.length - 1
        );
      if (newPrivacyTermsLicenseLabels.WebAppTermsAndConditions.tr_text_all) {
        newPrivacyTermsLicenseLabels.WebAppTermsAndConditions.tr_text_all =
          newPrivacyTermsLicenseLabels?.WebAppTermsAndConditions.tr_text_all?.slice(
            1,
            newPrivacyTermsLicenseLabels?.WebAppTermsAndConditions.tr_text_all
              ?.length - 1
          );
      }

      dispatch(setPrivacyTermsLicenseLabels(newPrivacyTermsLicenseLabels));
    }
  }, [translatePrivacyTermsLicense]);

  useEffect(() => {
    console.log("API DATA = ", apiUiData)
    if (apiUiData?.data) {
      dispatch(setUiData(apiUiData.data));
    }
  }, [apiUiData]);

  useEffect(() => {
    if (apiAnatomicData?.result) {
      dispatch(setAnatomicData(apiAnatomicData.result));
    }
  }, [apiAnatomicData]);

  useEffect(() => {
    if (apiLanguagesData?.data) {
      const languagesList = Object.values(apiLanguagesData.data);
      const diagLanguage = new Set();
      const newDiagnosisLanguages = [];
      languagesList.forEach((item) => {
        if (diagLanguage.has(item.diagnosis_and_extensions_language)) {
          return;
        } else {
          newDiagnosisLanguages.push(item);
          diagLanguage.add(item.diagnosis_and_extensions_language);
        }
      });
      dispatch(setDiagnosisLanguages(newDiagnosisLanguages));

      dispatch(setLanguagesData(apiLanguagesData.data));
    }
  }, [apiLanguagesData]);

  useEffect(() => {
    if (apiEgztData?.egzt) {
      dispatch(setEgztData(apiEgztData.egzt));
    }
  }, [apiEgztData]);

  useEffect(() => {
    if (uiDataLoading || anatomicDataLoading) {
      dispatch(setIsLanguageLoaded(false));
    } else {
      dispatch(setIsLanguageLoaded(true));
    }
  }, [uiDataLoading, anatomicDataLoading]);

  useEffect(() => {
    if (isEmpty(uiData) || isEmpty(anatomicData)) {
      dispatch(setIsLanguageDataAvailable(false));
    } else {
      dispatch(setIsLanguageDataAvailable(true));
    }
  }, [uiData, anatomicData]);

  useEffect(() => {
    if (uiDataError || anatomicDataError) {
      toaster({
        message: "Unable to load language data. Please try again later.",
        type: "info",
      });

      dispatch(setIsErrorOccured(true));
    } else {
      dispatch(setIsErrorOccured(false));
    }
  }, [uiDataError, anatomicDataError]);

  useEffect(() => {
    if (diagnosisComplexityData?.result) {
      dispatch(setDiagnosisComplexity(diagnosisComplexityData.result));
    }
  }, [diagnosisComplexityData]);

  return (
    <TranslationContext.Provider
      value={{
        isAccepted,
        isLanguageLoaded,
        isLanguageDataAvailable,
        privacyTermsLicenseLabels,
        diagnosisLanguages,
        countriesList: countries,
        language,
        changeLanguage,
        diagnosisLanguage,
        uiData,
        setUiData,
        pinTitles,
        setPinTitles,
        anatomicData,
        languagesData,
        tags,
        egztData,
        tagsArray,
        morphoMap,
        morphoArray,
        lateralityData: laterality,
        diagnosisComplexity,
        magMapping,
        serverError,
        isLoading,
        mapLateralityLabel
      }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
        <div>
          <Backdrop open={!isLanguageLoaded} style={{ zIndex: 1000 }}>
            <img src={spinner} alt='' />
          </Backdrop>
          {!isLanguageDataAvailable &&
            isErrorOccured &&
            isLanguageLoaded &&
            "Could not connect, please refresh the page"}
          {isLanguageDataAvailable && children}
        </div>
      </MuiPickersUtilsProvider>
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
