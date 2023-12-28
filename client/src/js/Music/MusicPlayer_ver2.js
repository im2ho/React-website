import React, {useState, useEffect} from "react";

export default function MusicPlayers() {

    //초기값만 필요하고 변경값이 필요하지 않을 경우 사용하는 useState
    const [state, setState] = useState({
        playlist : [
            '1. mp3',
            '2. mp3',
            '3. mp3',
        ],
        currentSong : 0,
        isPlaying : false,
    });

    //재생버튼
    const playSong = () => {
        setState((prevState) => ({...prevState, isPlaying: true}));
    };

    //일시정지 버튼
    const pauseSong = () => {
        setState((prevState) => ({...prevState, isPlaying: false}));
    };

    //재생목록
    const displayPlayList = () => {
        console.log('playList : ', state.playlist.join(','));
    };

    //다음 곡 재생
    const playNextSong = () => {
        const nextSong = (state.currentSong + 1) %state.playlist.length; //최댓값 넘어갔을 때 처음으로 넘기기
        setState((prevState)=> ({...prevState, currentSong: nextSong}));
    };

    return(
        <div style={{textAlign:"center"}}>
            <h1 style={{fontStyle:"italic"}}>Music is My Life...</h1>
            <h4>무식은 나의 삶</h4><br />
            <p> Now Playing : {state.playlist[state.currentSong]} </p>
            <p> 0:00 ━━━━●────────── 4:00 </p>
            <div style={{float : "left", marginLeft : "350px"}}>
                <button onClick={playSong} disabled={state.isPlaying} style={{border : "none"}}>▶️</button>
                <button onClick={pauseSong} disabled={!state.isPlaying} style={{border : "none"}}> ❚❚ </button>
                <button onClick={playNextSong} style={{border : "none"}}>⏭️</button>
                <button onClick={displayPlayList} style={{border : "none", marginLeft : "100px"}}>Playlist</button>
            </div><br />
        </div>
    );
}