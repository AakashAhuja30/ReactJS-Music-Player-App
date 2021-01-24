// import {useRef,useState} from 'react';
import LibrarySong from './LibrarySong.js'
const Library = ({songs, setCurrentSong,audioRef, isPlaying,currentSong,libraryStatus}) => {

    return (
        <div className={`library ${libraryStatus ? 'active-library':''} ` }>
            <h2> Library </h2>
            <div className="library-songs">
              {songs.map(song => <LibrarySong key = {song.id}
                                   songs = {songs} setCurrentSong = {setCurrentSong} song = {song}
                                   audioRef = {audioRef} isPlaying = {isPlaying} currentSong = {currentSong} 
                                />
                         )
              }
            </div>

            </div>
    )

}

export default Library;