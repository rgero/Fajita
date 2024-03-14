import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import {CssBaseline} from "@mui/material"
import Footer from "./components/Footer/FooterContainer"
import Header from "./components/Header"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchResults from "./components/SearchResults"

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
        <Header/>
        <SearchResults/>
        <Footer/>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
