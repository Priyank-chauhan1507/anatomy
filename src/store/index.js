import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./slices/lists";
import userSettingsReducer from "./slices/userSettings";
import modalsReducer from "./slices/modals";
import appReducer from "./slices/app";
import cached from "./slices/cached";
import translation from "./slices/translation";

export default configureStore({
  reducer: {
    listStore: listsReducer,
    userSettings: userSettingsReducer,
    modals: modalsReducer,
    app: appReducer,
    cache: cached,
    translation: translation,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: [
          "listStore",
          "userSettings",
          "modals",
          "app",
          "translation",
          "cache",
        ],
      },
    }),
});
