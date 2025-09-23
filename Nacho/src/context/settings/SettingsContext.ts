import { createContext, useContext } from "react";

export const defaultShareOptions = { clipboard: false, youtube: true, stash: true };
export const defaultInfoOptions = { clipboard: false, youtube: false, stash: true };

export const SettingsContext = createContext({
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

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) throw new Error("SettingsContext was used outside of SettingsProvider");
  return context;
}
