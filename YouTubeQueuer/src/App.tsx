import { Container, CssBaseline } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Footer from "./components/Footer/FooterContainer"
import Header from "./components/Header"
import { ResponseList } from "./dummyData/data"
import VideoCard from "./components/VideoCard"
import { YoutubeResponse } from "./interfaces/YoutubeResponse"
import { ThemeProvider, createTheme } from "@mui/material/styles"


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
        
        <div className="h-screen flex flex-col">
          <Header/>
          <Container className="flex flex-1 flex-col justify-center items-center">
            {
              ResponseList.map( (entry: YoutubeResponse, index: number) => (
                <VideoCard data={entry} key={index}/>
              ))
            }
          </Container>
          <Footer/>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
