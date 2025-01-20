import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const defaultShareOptions = { clipboard: false, youtube: true, stash: true };

const SettingsContext = createContext({
  isFooterCompact: false,
  isStashCompact: false,
  toggleFooterCompact: () => {},
  toggleCompactStash: () => {},
  shareOptions: defaultShareOptions,
  updateShareOptions: (options: { clipboard: boolean; youtube: boolean; stash: boolean }) => { console.log(options) }
});

const SettingsProvider = ({ children }: {children: React.ReactNode}) => {

  const [isFooterCompact, setIsFooterCompact] = useLocalStorageState(
    false,
    "isFooterCompact",
  );

  const [isStashCompact, setIsStashCompact] = useLocalStorageState(
    false,
    "isStashCompact",
  );

  const [shareOptions, setShareOptions] = useLocalStorageState(
    JSON.stringify(defaultShareOptions),
    "shareOptions"
  );

  const validateShareOptions = (options: any) => {
    return {
      clipboard: options.clipboard ?? defaultShareOptions.clipboard,
      youtube: options.youtube ?? defaultShareOptions.youtube,
      stash: options.stash ?? defaultShareOptions.stash,
    };
  };

  useEffect(() => {
    const parsedShareOptions = JSON.parse(shareOptions);
    const validatedShareOptions = validateShareOptions(parsedShareOptions);
    if (JSON.stringify(parsedShareOptions) !== JSON.stringify(validatedShareOptions)) {
      setShareOptions(JSON.stringify(validatedShareOptions));
    }
  }, []);

  const toggleFooterCompact = () => {
    setIsFooterCompact((isCompact: boolean) => !isCompact);
  }

  const toggleCompactStash = () => {
    setIsStashCompact((isCompact: boolean) => !isCompact);
  }

  const updateShareOptions = (options: { clipboard: boolean; youtube: boolean; stash: boolean }) => {
    setShareOptions(JSON.stringify(options));
  }

  return (
    <SettingsContext.Provider 
      value={{
        isFooterCompact,
        isStashCompact, 
        toggleFooterCompact,
        toggleCompactStash,
        shareOptions: validateShareOptions(JSON.parse(shareOptions)),
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
