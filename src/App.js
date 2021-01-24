import {useState, useRef} from 'react';
// Adding Styles
import './styles/app.scss';
import Library from './components/Library.js'
// Adding Components

import Player from './components/Player.js'
import Song from './components/Song.js'
import Nav from './components/Nav.js';

//  Import util
import data from './util'


function App() {

  // Add State
  const [songs,setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying,setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo,
        currentTime:current,
        duration: duration,
        }
        )

}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
  await setCurrentSong(songs[(currentIndex + 1)% songs.length]);
  if (isPlaying) audioRef.current.play();
}



const [songInfo, setSongInfo] = useState(
    {
        currentTime:0,
        duration:0,
    }
)

  return (
    <div className="App">
      < Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus}  />
      <Song currentSong = {currentSong}/>
      <Player 
      audioRef = {audioRef}
      setIsPlaying = {setIsPlaying} 
      isPlaying = {isPlaying} 
      currentSong = {currentSong} 
      songInfo = {songInfo}
      setSongInfo = {setSongInfo}
      songs = {songs}
      setCurrentSong = {setCurrentSong}
      />
      <Library libraryStatus= {libraryStatus} songs = {songs} setCurrentSong = {setCurrentSong} audioRef = {audioRef} isPlaying = {isPlaying} currentSong = {currentSong} />
      <audio onEnded = {songEndHandler} onLoadedMetadata = {timeUpdateHandler} onTimeUpdate = {timeUpdateHandler} ref = {audioRef} src = {currentSong.audio}></audio>
    </div>
  );
}

export default App;
