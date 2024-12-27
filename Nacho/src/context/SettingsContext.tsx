import { createContext, useContext } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const SettingsContext = createContext({
  isFooterCompact: false,
  toggleFooterCompact: () => {},
  shareOptions: { clipboard: true, youtube: true },
  updateShareOptions: (options: { clipboard: boolean; youtube: boolean }) => { console.log(options)}
});

const SettingsProvider = ({ children }: {children: React.ReactNode}) => {

  const [isFooterCompact, setIsFooterCompact] = useLocalStorageState(
    false,
    "isFooterCompact",
  );

  const [shareOptions, setShareOptions] = useLocalStorageState(
    JSON.stringify({ clipboard: true, youtube: true }),
    "shareOptions"
  );


  const toggleFooterCompact = () => {
    setIsFooterCompact((isCompact: boolean) => !isCompact);
  }

  const updateShareOptions = (options: { clipboard: boolean, youtube: boolean }) => {
    setShareOptions(JSON.stringify(options));
  }

  return (
    <SettingsContext.Provider 
      value={{
        isFooterCompact, 
        toggleFooterCompact,
        shareOptions: JSON.parse(shareOptions),
        updateShareOptions
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
