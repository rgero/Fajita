import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ActiveQueuesPage from "./pages/ActiveQueuesPage";
import AppLayout from "./components/ui/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";
import FeedbackPage from "./pages/FeedbackPage";
import LandingPage from "./pages/LandingPage";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import QueuePage from "./pages/QueuePage";
import { QueueProvider } from "./context/QueueContext";
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
      <ProtectedRoute>
        <QueueProvider>
          <SocketProvider>  
            {children}
          </SocketProvider>
        </QueueProvider>
      </ProtectedRoute>
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
            <Route path="queue" element={<QueuePage/>}/>
            <Route path="feedback" element={<FeedbackPage/>}/>
          </Route>
          <Route element={
            <AuthRouteWrapper>
              <Outlet/>
            </AuthRouteWrapper>
          }>
            <Route path="queues" element={<ActiveQueuesPage/>}/>
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
