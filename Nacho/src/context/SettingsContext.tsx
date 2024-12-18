import { createContext, useContext } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const SettingsContext = createContext({
  isFooterCompact: false,
  toggleFooterCompact: () => {}
});

const SettingsProvider = ({ children }: {children: React.ReactNode}) => {

  const [isFooterCompact, setIsFooterCompact] = useLocalStorageState(
    "isFooterCompact",
    "false"
  );


  const toggleFooterCompact = () => {
    setIsFooterCompact((isCompact: boolean) => !isCompact);
  }

  return (
    <SettingsContext.Provider 
      value={{
        isFooterCompact, 
        toggleFooterCompact
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) throw new Error("SettingsContext was used outside of SettingsProvider");
  return context;
}

export { SettingsProvider, useSettings };
