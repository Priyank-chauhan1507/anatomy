import React, { useEffect, useRef } from "react";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/styles";
import TranslationProvider from "./contexts/translation";
import { Provider } from "react-redux";
import store from "./store";
import { useSelector } from "react-redux";
import ExportProvider from "./hooks/useExport";
import { createTheme } from "@material-ui/core";
import ErrorBoundaries from "./utils/ErrorBoundaries";
import { ConfirmationDialogProvider } from "../src/hooks/useConfirmationDialog.js"; 
import {ToasterMessageProvider} from '../src/hooks/useToasterMessage.js'

const PersistanceAndLoad = () => {
  const userSettings = useSelector((state) => state.userSettings);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const saveData = () => {
      try {
        const serializedState = JSON.stringify(userSettings);
        localStorage.setItem("savedUserSettings", serializedState);
      } catch (error) {
        const newUserSettings = {
          ...userSettings,
          patientImg: null,
        };
        localStorage.setItem(
          "savedUserSettings",
          JSON.stringify(newUserSettings)
        );
      }
    };
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(saveData, 1000);
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [userSettings]);
  return null;
};

const theme = createTheme();

export default function ProtectedApp() {
  return (
    <ErrorBoundaries>
      <Provider store={store}>
        <PersistanceAndLoad />
        <ThemeProvider theme={theme}>
          <TranslationProvider>
            <ExportProvider>
              <ConfirmationDialogProvider>
                <ToasterMessageProvider>
                  <App />
                </ToasterMessageProvider>
              </ConfirmationDialogProvider>
            </ExportProvider>
          </TranslationProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundaries>
  );
}
