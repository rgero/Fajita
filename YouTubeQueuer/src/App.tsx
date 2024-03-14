import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { DarkModeProvider } from "./context/DarkModeContext";
import MainPage from "./pages/MainPage";
import PageNotFound from "./pages/PageNotFound";
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
            <Route index element={<MainPage/>}/>
            <Route path="queue" element={<PageNotFound/>}/>
            <Route path='*' element={<Navigate replace to='/'/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
