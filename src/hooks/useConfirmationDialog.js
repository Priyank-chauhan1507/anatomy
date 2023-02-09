import { useState, createContext, useContext } from "react";

export const ConfirmationDialogContext = createContext();

export const ConfirmationDialogProvider = (props) => {
  const [store, setStore] = useState({
    open: false,
    title: "",
    content: "",
    agreeText: "",
    disagreeText: "",
    callback: () => {},
  });
  return (
    <ConfirmationDialogContext.Provider value={{ store, setStore }}>
      {props.children}
    </ConfirmationDialogContext.Provider>
  );
};

export const useConfirmationDialogContext = () =>
  useContext(ConfirmationDialogContext);

const useConfirmationDialog = () => {
  const value = useConfirmationDialogContext();
  return (obj, callback) => {
    while (!value);
    value?.setStore((prev) => {
      return { ...prev, ...obj, callback, open: true };
    });
  };
};

export default useConfirmationDialog;
