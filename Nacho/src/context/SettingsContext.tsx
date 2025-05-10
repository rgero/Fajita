import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const defaultShareOptions = { clipboard: false, youtube: true, stash: true };

const SettingsContext = createContext({
  isFooterCompact: false,
  isRightHanded: false,
  isStashCompact: false,
  enableExperimental: false,
  toggleExperimental: () => {},
  toggleFooterCompact: () => {},
  toggleCompactStash: () => {},
  toggleHandedness: () => {},
  shareOptions: defaultShareOptions,
  updateShareOptions: (options: { clipboard: boolean; youtube: boolean; stash: boolean }) => { console.log(options) }
});

const SettingsProvider = ({ children }: {children: React.ReactNode}) => {

  const [enableExperimental, setEnableExperimental] = useLocalStorageState(
    false,
    "enableExperimental",
  );

  const [isFooterCompact, setIsFooterCompact] = useLocalStorageState(
    false,
    "isFooterCompact",
  );

  const [isRightHanded, setIsRightHanded] = useLocalStorageState(
    false,
    "isRightHanded",
  );

  const [isStashCompact, setIsStashCompact] = useLocalStorageState(
    true,
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

  const toggleExperimental = () => {
    setEnableExperimental((enable: boolean) => !enable);
  }

  const toggleFooterCompact = () => {
    setIsFooterCompact((isCompact: boolean) => !isCompact);
  }

  const toggleHandedness = () => {
    setIsRightHanded((isRightHanded: boolean) => !isRightHanded);
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
        enableExperimental,
        isFooterCompact,
        isRightHanded,
        isStashCompact, 
        toggleExperimental,
        toggleFooterCompact,
        toggleHandedness,
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
