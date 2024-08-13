/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext } from "react";

import { Playlist } from "../interfaces/Playlist";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const PlaylistContext = createContext({
  playlist: "",
  clearPlaylist: () => {},
  setTargetPlaylist: (_playlist: Playlist) => { }
})

const PlaylistProvider = ({children} : {children: React.ReactNode}) => {
  const [playlist, setPlaylist] = useLocalStorageState("", "fajitaPlaylist");

  const clearPlaylist = () => {
    setPlaylist("")
  }

  const setTargetPlaylist = (playlist: Playlist) => {
    setPlaylist(JSON.stringify(playlist));
  }

  return (
    <PlaylistContext.Provider value={{playlist, clearPlaylist, setTargetPlaylist}}>
      {children}
    </PlaylistContext.Provider>
  )
}

const usePlaylistProvider = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) throw new Error("PlaylistContext was used outside of PlaylistProvider");
  return context;
}

export { PlaylistProvider, usePlaylistProvider };