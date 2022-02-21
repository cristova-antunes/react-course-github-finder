import { createContext, useReducer } from "react";
import alertReducer, { ALERT_REDUCER_ACTIONS } from "./AlertReducer";

const AlertContext = createContext();
export const ALERT_TYPE = {
  error: "error",
};

export const AlertProvider = ({ children }) => {
  const initiaState = null;

  const [state, dispatch] = useReducer(alertReducer, initiaState);

  const setAlert = (msg, type) => {
    dispatch({
      type: ALERT_REDUCER_ACTIONS.SET_ALERT,
      payload: {
        msg,
        type,
      },
    });

    setTimeout(() => {
      dispatch({
        type: ALERT_REDUCER_ACTIONS.REMOVE_ALERT,
      });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
