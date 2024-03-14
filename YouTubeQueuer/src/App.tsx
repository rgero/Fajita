import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import {CssBaseline} from "@mui/material"
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  )
}

export default App
