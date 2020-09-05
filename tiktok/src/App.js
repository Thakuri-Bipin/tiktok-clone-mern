import React, { useEffect, useState } from "react";
import "./css/App.css";
import Video from "./Video";
import Axios from "./axios";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await Axios.get("/v2/posts");
      setVideos(response.data.data);
      console.log("db", response.data.data);
      return response;
    }
    fetchPosts();
  }, []);

  return (
    <div className="app">
      <div className="app__videos">
        {videos.map(
          ({ url, channel, description, song, likes, shares, messages }) => (
            <Video
              key={url}
              url={url}
              channel={channel}
              description={description}
              song={song}
              likes={likes}
              shares={shares}
              messages={messages}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
