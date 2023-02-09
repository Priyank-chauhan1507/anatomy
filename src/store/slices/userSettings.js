import { createSlice } from "@reduxjs/toolkit";
import { generateFormDataFromSearchQuery } from "../../utils/cf";
import { languages } from "../../contexts/languageCodes";
import { FILE_NAME_BUILDER_DELIMITER_OPTIONS } from "../../constants/userSettings";
const patientFormDetails = generateFormDataFromSearchQuery();

const initialState = {
    mapSettings: {
        showHierarchy: false,
        hideOppositeGenderAnatomy: false,
        isOralAnatomyVisible: false,
    },

    generalSettings: {
        showTabTitleAsPatientInfo: false,
    },

    colorCodedLegendSettings: {
        correspondingColorText: false,
        semiTransparentBackgroud: false,
        indentAnatomicSite: true,
        showParentAtTop: false,
    },
    patientInfo: {
        ...patientFormDetails.patientInfo,
        countryOpts: { paper_size: "Letter" },
    },
    patientImg: null,
    encounterInfo: patientFormDetails.encounterInfo,
    userSettings: {
        ...patientFormDetails.userSettings,
        clinicCountryOpts: { paper_size: "Letter" },
    },
    language: languages[0].code,
    diagnosisLanguage: languages[0].code,
    fileNameSettings: {
        setZipPassword:false,
        exportPreference:null,
        delimiter: FILE_NAME_BUILDER_DELIMITER_OPTIONS[2],
        useEmoji: true,
        sequence: [{ id: 'dateTime' }, { id: 'firstName' }, { id: 'lastName' }, { id: 'DOB' }, { id: 'MRN' }, { id: 'amid' }, { id: 'tags' }, { id: 'emojiGroup' }],
    },
    folderNameSettings: {
        setZipPassword:false,
        exportPreference:null,
        exportFolderZip:false,
        folderDelimiter: FILE_NAME_BUILDER_DELIMITER_OPTIONS[2],
        useEmoji: true,
        folderSequence: [{ id: 'dateTime' }, { id: 'firstName' }, { id: 'lastName' }, { id: 'DOB' }, { id: 'MRN' }],
    },
};

let initialWithSavedState = {
    ...initialState,
};

try {
    const userSettings = JSON.parse(localStorage.getItem("savedUserSettings"));
    if (userSettings) {
        initialWithSavedState = {
            ...initialState,
            ...userSettings,
        };
    }
} catch (err) {}

export const userSettingsSlice = createSlice({
    name: "userSettings",
    initialState: initialWithSavedState,
    reducers: {
        toggleHierarchy: (state) => {
            state.mapSettings.showHierarchy = !state.mapSettings.showHierarchy;
        },
        changeMapSettings: (state, action) => {
            const { name, value } = action.payload;
            if (value !== undefined) {
                state.mapSettings[name] = value;
            } else {
                state.mapSettings[name] = !state.mapSettings[name];
            }
        },
        changeColorCodedLegendSettings: (state, action) => {
            const { name, value } = action.payload;
            state.colorCodedLegendSettings[name] = value;
        },
        changePatientInfo: (state, action) => {
            const { name, value } = action.payload;
            state.patientInfo[name] = value;
        },
        clearPatientInfo: (state, action) => {
            state.patientInfo = action.payload
        },
        changeEncounterInfo: (state, action) => {
            const { name, value } = action.payload;
            state.encounterInfo[name] = value;
        },
        clearEncounterInfo: (state, action) => {
            state.encounterInfo = action.payload
        },
        changeUserSettings: (state, action) => {
            const { name, value } = action.payload;
            state.userSettings[name] = value;
        },
        clearUserSettings: (state, action) => {
            state.userSettings = action.payload
        },
        changeLanguageSetting: (state, action) => {
            const { language, diagnosisLanguage } = action.payload;
            state.language = language;
            state.diagnosisLanguage = diagnosisLanguage;
        },
        changeOnlyLanguageSetting: (state, action) => {
            const language = action.payload;
            state.language = language;
        },

        changeDiagnosisLanguageSetting: (state, action) => {
            const diagnosisLanguage = action.payload;
            state.diagnosisLanguage = diagnosisLanguage;
        },

        changeFileNameSettings: (state, action) => {
            const { name, value } = action.payload;
            state.fileNameSettings[name] = value;
        },
        changeFolderNameSettings: (state, action) => {
            const { name, value } = action.payload;
            state.folderNameSettings[name] = value;
        },

        changeGeneralSettings: (state, action) => {
            const { name, value } = action.payload;
            if (value !== undefined) {
                state.generalSettings[name] = value;
            } else {
                state.generalSettings[name] = !state.generalSettings[name];
            }
        },
        changePatientImage: (state, action) => {
            const img = action.payload;
            state.patientImg = img;
        },
        loadUserSettings: (state, action) => {
            const newState = action.payload;
            if (typeof newState === "object") {
                state = {...state, ...newState };
            }
            return state;
        },
    },
});

export const {
    toggleHierarchy,
    changeColorCodedLegendSettings,
    changePatientInfo,
    clearPatientInfo,
    changeEncounterInfo,
    clearEncounterInfo,
    changeUserSettings,
    clearUserSettings,
    changeLanguageSetting,
    changeOnlyLanguageSetting,
    changeDiagnosisLanguageSetting,
    changeGeneralSettings,
    changeMapSettings,
    changePatientImage,
    changeFileNameSettings,
    changeFolderNameSettings,
    loadUserSettings,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;