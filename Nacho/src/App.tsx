import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AppLayout from "./components/ui/AppLayout";
import AuthenticatedRoute from "./components/ui/AuthenticatedRoute";
import { AuthenticationProvider } from "./context/AuthenicationContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { DialogProvider } from "./context/DialogContext";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import { QueueProvider } from "./context/QueueContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SocketProvider } from "./context/WebSocketContext";
import { StashProvider } from "./context/StashContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
})

const AuthRouteWrapper = ({children} : {children: React.ReactNode}) => {
  return (    
    <AuthenticatedRoute>
      <SettingsProvider>
        <StashProvider>
          <QueueProvider>
            <SocketProvider>
              <DialogProvider>  
                {children}
              </DialogProvider>
            </SocketProvider>
          </QueueProvider>
        </StashProvider>
      </SettingsProvider>
    </AuthenticatedRoute>
  )
}

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <BrowserRouter>
            <Routes>
              <Route element={
                <AuthRouteWrapper>
                  <AppLayout/>
                </AuthRouteWrapper>
              }>
                <Route index element={<MainPage/>}/>
              </Route>
              <Route path="landing" element={<LandingPage/>} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </BrowserRouter>
        </AuthenticationProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
