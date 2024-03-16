import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import AppLayout from "./components/ui/AppLayout";
import { DarkModeProvider } from "./context/DarkModeContext";
import MainPage from "./pages/MainPage";
import QueuePage from "./pages/QueuePage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout/>}>
              <Route index element={<MainPage/>}/>
              <Route path="queue" element={<QueuePage/>}/>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
