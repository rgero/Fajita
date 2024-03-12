import { YoutubeResponse } from "../../interfaces/YoutubeResponse"

// interface Props {
//   data: YoutubeResponse
// }

const FooterCard = () => {

  const mockResponse: YoutubeResponse = 
  {
    "kind": "youtube#searchResult",
    "etag": "bAEkzy_M-jxlV6eogJ73TfGEPok",
    "id": {
      "kind": "youtube#video",
      "videoId": "HlLx7oE7q3I"
    },
    "snippet": {
      "publishedAt": "2019-03-06T14:58:15Z",
      "channelId": "UCdOcBpu5O2V0JhFFs9k-Ouw",
      "title": 'The Gaslight Anthem - "45"',
      "description": 'The Gaslight Anthem "Get Hurt" Available Now!',
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/oST77VRHXt0/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/oST77VRHXt0/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/oST77VRHXt0/hqdefault.jpg",
          "width": 480,
          "height": 360
        },
        "max": {
          "url": "https://i.ytimg.com/vi/oST77VRHXt0/maxresdefault.jpg",
          "width": 1280,
          "height": 720
        }
      },
      "channelTitle": "Gaslight Anthem",
      "liveBroadcastContent": "none",
      "publishTime": "2019-03-06T14:58:15Z"
    }
  }

  return (
    <div className="flex flex-column gap-x-1 align-middle">
      <div><img className="image-contain max-h-24" src={mockResponse.snippet.thumbnails.max.url} alt={mockResponse.snippet.title}/></div>
      <div>
        <div className="font-bold">Currently Playing</div>
        <div>{mockResponse.snippet.title}</div>
        <div>{mockResponse.snippet.channelTitle}</div>
      </div>
    </div>
  )
}

export default FooterCard
