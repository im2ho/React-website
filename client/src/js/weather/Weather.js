import React,{useState, useEffect} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

//현재 위치 기반 날씨 제공
export default function Weather() {

    //여러 속성을 가져올 것이기 때문에 JSON처리
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    //위도,경도
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const API_KEY = "4edac2eabf494946a189e86050976521";

    //위치 정보 가져오는 useEffect
    useEffect(() => {
        //navigator : 길잡이, geolocation : 지리적 위치
        //getCurrentPosition : 현재 위치
        //성공적으로 위치를 가져오면 콜백 함수를 호출해서 위치 정보를 포함한 내용을 전달
        //만약 위치 정보를 가져오는데 실패하면 오류를 처리할 콜백 함수 호출
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude); //coords : 현재 위치의 좌표
                    setLongitude(position.coords.longitude);
                },
                (err) => {
                    console.log("ERROR", err);
                }
            );
        } else {
            console.error('위치 정보를 가져올 수 없습니다.');
        }
    }, []); //첫 렌더링에서만 정보 가져오기

    //내 위치에 대한 날씨를 가져오는 함수
    const searchWeather = async () => {
        try{
            setLoading(true);
            const response = await axios.get(
                `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`
            );
            setWeather(response.data.data[0]);
        } catch (err) {
            console.error('ERROR : ', err);
        } finally {
            setLoading(false);
        }
    };

    //현재 위치 정보가 변경 될 때마다 날씨 가져오기
    useEffect(() => {
        if(latitude && longitude) {
            searchWeather();
        }
    },[latitude, longitude]);

    return(
        <div className="container mt-5">
            <h2 className="mb-4">오늘의 날씨</h2>
            {latitude && longitude ? (
                <div>
                {loading && <p>검색중...</p>}
                {weather.city_name && ( 
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title" style={{float:"left", marginRight: "10px"}}>{weather.city_name}</h2>
                            {weather.weather.icon && (
                                <img 
                                    //className="mb-3 img-fluid rounded mx-auto d-block"
                                    src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                                    alt="weather icon"
                                    style={{width:"60px", marginTop:"-3px"}}
                                />
                            )}
                            <p className="card-text">온도 : {weather.temp}</p>
                            <p className="card-text">습도 : {weather.rh}%</p>
                            <p>날씨 : {weather.weather.description}</p>
                        </div>
                    </div>
                )}
                </div>
            ) : (
                <p>현재 위치를 가져오는 중입니다..</p>
            )}
        </div>
    );
}