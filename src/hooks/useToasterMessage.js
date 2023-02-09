import { useState, createContext, useContext} from "react";

export const ToasterMessageContext = createContext();

export const ToasterMessageProvider = (props) => {
  const [store, setStore] = useState({
	message: '',
	type: '',
	open: false
  });
  return (
    <ToasterMessageContext.Provider value={{ store, setStore }}>
      {props.children}
    </ToasterMessageContext.Provider>
  );
};

export const useToasterMessageContext = () =>
  useContext(ToasterMessageContext);

const useToasterMessage = () => {
  const value = useToasterMessageContext();
  return ({message, type}) => {
    while (!value);
    value?.setStore((prev) => {
      return { ...prev, message, type, open: true };
    });
  };
};

export default useToasterMessage;
