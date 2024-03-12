import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Footer from "./components/Footer/FooterContainer"
import Header from "./components/Header"
import { ResponseList } from "./dummyData/data"
import VideoCard from "./components/VideoCard"
import { YoutubeResponse } from "./interfaces/YoutubeResponse"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-300">
        <Header/>
        <div className="grid justify-center items-center">
          {
            ResponseList.map( (entry: YoutubeResponse, index: number) => (
              <VideoCard data={entry} key={index} isEven={index % 2 == 0}/>
            ))
          }
        </div>
        <Footer/>
      </div>
    </QueryClientProvider>
  )
}

export default App
