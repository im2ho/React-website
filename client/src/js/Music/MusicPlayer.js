import React, {useState, useEffect} from "react";

export default function MusicPlayer() {

    const audioURLs = [
        'http://ex/song1.mp3',
        'http://ex/song2.mp3'
    ];

    //플레이리스트
    const [playlist, setPlaylist] = useState(['제목1','제목2','제목3']);
    //현재 재생중인 음악
    const [currentSong, setCurrentSong] = useState(0);
    //음악 재생, 음악 일시정지를 위한 상태
    const [isPlaying, setIsPlaying] = useState(false);
    //Audio 박스
    const [audio, setAudio] = useState(new Audio);

    useEffect(() => {
        //Audio 박스 객체를 초기화
        setAudio(new Audio(audioURLs[currentSong]));
        
        //재생버튼 누를 경우 재생 될 수 있도록 설정
        if(isPlaying) {
            audio.play();
        }

        //Audio 시작 시간과 일시정지 설정
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [currentSong]);

    //재생버튼
    const playSong = () => {
        setIsPlaying(true);
        audio.play();
        console.log('playing ... ', playlist[currentSong]);
    };

    //일시정지 버튼
    const pauseSong = () => {
        setIsPlaying(false);
        audio.pause();
        console.log('stopped ...');
    };

    //재생목록
    const displayPlayList = () => {
        console.log('playList : ', playlist.join(','));
    };

    //다음 곡 재생
    const playNextSong = () => {
        const nextSong = (currentSong + 1) %playlist.length; //최댓값 넘어갔을 때 처음으로 넘기기
        setCurrentSong(nextSong);
        setIsPlaying(true);
        console.log('다음 곡 재생', playlist[nextSong]);
    };

    return(
        <div style={{textAlign:"center"}}>
            <h1 style={{fontStyle:"italic"}}>Music is My Life...</h1>
            <h4>무식은 나의 삶</h4><br />
            <p>Now Playing : {playlist[currentSong]}</p>
            <button onClick={playSong} disabled={isPlaying}>▶️</button>
            <button onClick={pauseSong} disabled={!isPlaying}> ❚❚ </button>
            <button onClick={playNextSong}>⏭️</button>
            <button onClick={displayPlayList}>Playlist</button>
        </div>
    );
}