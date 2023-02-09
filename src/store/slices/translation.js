import { createSlice } from "@reduxjs/toolkit";
import { defaultModifiers } from "../../contexts/translationHelpers";
import { modifiers } from "../../constants/listsConstants";

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

const initialState = {
  isLanguageLoaded: false,
  isLanguageDataAvailable: false,
  isErrorOccured: false,
  morphoMap: {},
  morphoArray: [],
  tagsArray: [],
  laterality: defaultLaterality,
  countries: [],
  privacyTermsLicenseLabels: {},
  anatomicData: {},
  languagesData: {},
  diagnosisComplexity: [],
  uiData: {},
  tags: {},
  egztData: {},
  diagnosisLanguages: [],
  pinTitles: {},
  magMapping: {},
};

export const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    setIsLanguageLoaded: (state, action) => {
      state.isLanguageLoaded = action.payload;
    },
    setIsLanguageDataAvailable: (state, action) => {
      state.isLanguageDataAvailable = action.payload;
    },
    setMorphoMap: (state, action) => {
      state.morphoMap = action.payload;
    },
    setMorphoArray: (state, action) => {
      state.morphoArray = action.payload;
    },
    setTagsArray: (state, action) => {
      state.tagsArray = action.payload;
    },
    setLaterality: (state, action) => {
      state.laterality = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setAnatomicData: (state, action) => {
      state.anatomicData = action.payload;
    },
    setLanguagesData: (state, action) => {
      state.languagesData = action.payload;
    },
    setDiagnosisComplexity: (state, action) => {
      state.diagnosisComplexity = action.payload;
    },
    setUiData: (state, action) => {
      state.uiData = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setEgztData: (state, action) => {
      state.egztData = action.payload;
      const magMapping = {};
      const modifiersArray = Object.values(modifiers);
      Object.values(action.payload).map((x) => {
        modifiersArray.map((modifier) => {
          const magnitude = x[modifier.value];
          if (magMapping[magnitude]) {
            magMapping[magnitude] = [
              ...magMapping[magnitude],
              { name: modifier.name, value: modifier.value, egztId: x.egzt_id },
            ];
          } else {
            magMapping[magnitude] = [
              { name: modifier.name, value: modifier.value, egztId: x.egzt_id },
            ];
          }
        });
      });

      state.magMapping = magMapping;
    },
    setDiagnosisLanguages: (state, action) => {
      state.diagnosisLanguages = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setPinTitles: (state, action) => {
      state.pinTitles = action.payload;
    },
    setIsErrorOccured: (state, action) => {
      state.isErrorOccured = action.payload;
    },
    setPrivacyTermsLicenseLabels: (state, action) => {
      state.privacyTermsLicenseLabels = action.payload;
    },
  },
});

export const {
  setIsLanguageLoaded,
  setIsLanguageDataAvailable,
  setIsErrorOccured,
  setMorphoMap,
  setMorphoArray,
  setTagsArray,
  setLaterality,
  setCountries,
  setPrivacyTermsLicenseLabels,
  setAnatomicData,
  setLanguagesData,
  setDiagnosisComplexity,
  setUiData,
  setTags,
  setEgztData,
  setDiagnosisLanguages,
  setLocale,
  setPinTitles,
} = translationSlice.actions;

export default translationSlice.reducer;
