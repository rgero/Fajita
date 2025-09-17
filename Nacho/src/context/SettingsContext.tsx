import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const defaultShareOptions = { clipboard: false, youtube: true, stash: true };
const defaultInfoOptions = { clipboard: false, youtube: false, stash: true };

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
  infoOptions: defaultInfoOptions,
  updateShareOptions: (options: { clipboard: boolean; youtube: boolean; stash: boolean }) => { console.log(options) },
  updateInfoOptions: (options: { clipboard: boolean; youtube: boolean; stash: boolean }) => { console.log(options) }
  
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

  const [infoOptions, setInfoOptions] = useLocalStorageState(
    JSON.stringify(defaultInfoOptions),
    "infoOptions"
  );


  const validateShareOptions = (options: any) => {
    return {
      clipboard: options.clipboard ?? defaultShareOptions.clipboard,
      youtube: options.youtube ?? defaultShareOptions.youtube,
      stash: options.stash ?? defaultShareOptions.stash,
    };
  };

  const validateInfoOptions = (options: any) => {
    return {
      clipboard: options.clipboard ?? defaultInfoOptions.clipboard,
      youtube: options.youtube ?? defaultInfoOptions.youtube,
      stash: options.stash ?? defaultInfoOptions.stash,
    };
  }

  useEffect(() => {
    const parsedShareOptions = JSON.parse(shareOptions);
    const validatedShareOptions = validateShareOptions(parsedShareOptions);
    if (JSON.stringify(parsedShareOptions) !== JSON.stringify(validatedShareOptions)) {
      setShareOptions(JSON.stringify(validatedShareOptions));
    }

    const parsedInfoOptions = JSON.parse(infoOptions);
    const validatedInfoOptions = validateInfoOptions(parsedInfoOptions);
    if (JSON.stringify(parsedInfoOptions) !== JSON.stringify(validatedInfoOptions)) {
      setInfoOptions(JSON.stringify(validatedInfoOptions));
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

  const updateInfoOptions = (options: { clipboard: boolean; youtube: boolean; stash: boolean }) => {
    setInfoOptions(JSON.stringify(options));
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
        updateShareOptions,
        infoOptions: validateInfoOptions(JSON.parse(infoOptions)),
        updateInfoOptions
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
