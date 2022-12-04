import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { AppAction, authReducer, State } from "./AuthReducer";

const storedUser = localStorage.getItem("user");
const INITIAL_STATE: State = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const AppStateContext = createContext(INITIAL_STATE);

export const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {
  throw new Error("App should be contained with AppContextProvider");
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [appState, appAction] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(appState.user));
  }, [appState.user]);

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appAction}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
