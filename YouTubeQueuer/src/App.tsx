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

const App = () => {
 
  return (
    <DarkModeProvider>
      <QueueProvider>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route element={
                  <ProtectedRoute>
                    <AppLayout/>
                  </ProtectedRoute>
                }>
                  <Route index element={<MainPage/>}/>
                  <Route path="queue" element={<QueuePage/>}/>
                  <Route path="feedback" element={<FeedbackPage/>}/>
                </Route>
                <Route element={
                  <ProtectedRoute>
                    <Outlet/>
                  </ProtectedRoute>
                }>
                  <Route path="queues" element={<ActiveQueuesPage/>}/>
                </Route>
                <Route path="landing" element={<LandingPage/>} />
                <Route path="logout" element={<LogoutPage/>} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </SocketProvider>
      </QueueProvider>
    </DarkModeProvider>
  )
}

export default App
