// import {useRef,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay,faAngleLeft,faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'


const Player = ({audioRef,currentSong,isPlaying,setIsPlaying,songInfo,setSongInfo,songs,setCurrentSong}) => {
    // Refs
    
    
    // Event Handlers
    const playSongHandler = () => {
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        

    }

    

    const timeDisplayHandler = (time) => {
        return (
            Math.floor(time/60) + ':' + ('0'+Math.floor(time%60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo,currentTime:e.target.value})

    }


    const skipTrackHandler = (direction) =>{
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1)% songs.length]);
            if(isPlaying){
                const playPromise = audioRef.current.play();
                if(playPromise !== undefined){
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    } )
                }
     
             }
        }
        if (direction === 'skip-back'){
            if (currentIndex === 0) {
                currentIndex = songs.length;
              }
            setCurrentSong(songs[(currentIndex -1)% songs.length]);
            if(isPlaying){
                const playPromise = audioRef.current.play();
                if(playPromise !== undefined){
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    } )
                }
     
             }
        }


    }



    return (
        <div className="player-container">
            <div className="time-control">
                <p> {timeDisplayHandler(songInfo.currentTime)} </p>
                <input type="range" min = {0} max = {songInfo.duration || 0 } value = {songInfo.currentTime} onChange = {dragHandler} />
                <p> {timeDisplayHandler(songInfo.duration || 0)} </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick = {()=>skipTrackHandler('skip-back')} className = "skip-back" size="2x" icon = {faAngleLeft} />
                <FontAwesomeIcon onClick = {playSongHandler} className = "play" size="2x" icon = { isPlaying? faPause : faPlay} />
                <FontAwesomeIcon onClick = {()=>skipTrackHandler('skip-forward')} className = "skip-forward" size="2x" icon = {faAngleRight} />

            </div>
            
        </div>
    );

};

export default Player;