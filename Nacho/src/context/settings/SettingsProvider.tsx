import { SettingsContext, defaultInfoOptions, defaultShareOptions } from "./SettingsContext";

import { useEffect, useMemo } from "react";
import { useLocalStorageState } from '@hooks/useLocalStorageState';

const parseOptions = <T extends object>(
  raw: string,
  validate: (options: Partial<T>) => T,
  fallback: T,
): T => {
  try {
    return validate(JSON.parse(raw));
  } catch {
    return fallback;
  }
};

export const SettingsProvider = ({ children }: {children: React.ReactNode}) => {
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

  const parsedShareOptions = useMemo(
    () => parseOptions(shareOptions, validateShareOptions, defaultShareOptions),
    [shareOptions],
  );

  const parsedInfoOptions = useMemo(
    () => parseOptions(infoOptions, validateInfoOptions, defaultInfoOptions),
    [infoOptions],
  );

  useEffect(() => {
    const normalizedShare = JSON.stringify(parsedShareOptions);
    if (shareOptions !== normalizedShare) {
      setShareOptions(normalizedShare);
    }
    const normalizedInfo = JSON.stringify(parsedInfoOptions);
    if (infoOptions !== normalizedInfo) {
      setInfoOptions(normalizedInfo);
    }
  }, [parsedShareOptions, parsedInfoOptions, shareOptions, infoOptions, setShareOptions, setInfoOptions]);

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
        shareOptions: parsedShareOptions,
        updateShareOptions,
        infoOptions: parsedInfoOptions,
        updateInfoOptions
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

