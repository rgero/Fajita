import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import {CssBaseline} from "@mui/material"
import MainPage from "./pages/MainPage";
import PageNotFound from "./pages/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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
        <Toaster 
            position="bottom-center"
            gutter={12}
            containerStyle={{margin: "8px"}}
            toastOptions={
              {
                success: {duration: 3000}, 
                error: {duration: 5000},
                style: { 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  maxWidth: '500px', 
                  padding: '16px 24px', 
                  backgroundColor: `${darkTheme.palette.grey["600"]}`, 
                  color: `white` 
                }
              }
            }
          />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
