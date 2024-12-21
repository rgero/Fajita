import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AppLayout from "./components/ui/AppLayout";
import AuthenticatedRoute from "./components/ui/AuthenticatedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import FeedbackPage from "./pages/FeedbackPage";
import LandingPage from "./pages/LandingPage";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import { QueueProvider } from "./context/QueueContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SocketProvider } from "./context/WebSocketContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
})

const AuthRouteWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedRoute>
        <SettingsProvider>
          <QueueProvider>
            <SocketProvider>  
              {children}
            </SocketProvider>
          </QueueProvider>
        </SettingsProvider>
      </AuthenticatedRoute>
    </QueryClientProvider>
  )
}

const App = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={
            <AuthRouteWrapper>
             <AppLayout/>
            </AuthRouteWrapper>
          }>
            <Route index element={<MainPage/>}/>
            <Route path="feedback" element={<FeedbackPage/>}/>
          </Route>
          <Route path="landing" element={<LandingPage/>} />
          <Route path="logout" element={<LogoutPage/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App
