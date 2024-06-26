import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AppLayout from "./components/ui/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";
import FeedbackPage from "./pages/FeedbackPage";
import LandingPage from "./pages/LandingPage";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import QueuePage from "./pages/QueuePage";
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
              <Route path="landing" element={<LandingPage/>} />
              <Route path="logout" element={<LogoutPage/>} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </SocketProvider>
    </DarkModeProvider>
  )
}

export default App
