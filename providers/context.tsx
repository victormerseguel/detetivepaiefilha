import { useContextStore } from "@/application/useContextStore";
import { createContext, ReactNode, useContext } from "react";

const Context = createContext<any>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const store = useContextStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContext deve estar dentro de ContextProvider");
  }
  return context;
};
