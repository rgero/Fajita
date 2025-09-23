import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AppLayout from "./components/ui/AppLayout";
import AuthenticatedRoute from "./components/ui/AuthenticatedRoute";
import { AuthenticationProvider } from "./context/authentication/AuthenticationProvider";
import { DarkModeProvider } from "./context/darkmode/DarkModeProvider";
import { DialogProvider } from "./context/dialog/DialogProvider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/ErrorFallback";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import { QueueProvider } from "./context/queue/QueueProvider";
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
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=> window.location.replace("/")}>
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
            </ErrorBoundary>
          </BrowserRouter>
        </AuthenticationProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
