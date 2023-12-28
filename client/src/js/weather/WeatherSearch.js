import React,{useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeatherSearch() {

    const [query, setQuery] = useState('');
    //여러 속성을 가져올 것이기 때문에 JSON처리
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    const API_KEY = "4edac2eabf494946a189e86050976521";

    //검색 함수
    const searchWeather = async () => {
        try{
            setLoading(true);
            const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${query}&key=${API_KEY}`);
            setWeather(response.data.data[0]);
        } catch (err) {
            console.error('ERROR : ', err);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="container mt-5">
            <h1 className="mb-4">날씨날씨</h1>
            <div className="mb-3">
                <input
                    className="form-control" 
                    style={{width:"300px", float:"left"}}
                    type="text"
                    placeholder="어디가 궁금하신가요?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={searchWeather} className="btn btn-primary ms-1">search</button>
            </div>
            {loading && <p>검색중...</p>}
            {weather.city_name && ( 
                <div className="card">
                    <div className="card-body">
                    <h2 className="card-title">{weather.city_name}</h2>
                    <p className="card-text">온도 : {weather.temp}</p>
                    <p className="card-text">습도 : {weather.rh}%</p>
                    <span>날씨 : {weather.weather.description}</span>
                    {weather.weather.icon && (
                        <img 
                            //className="mb-3 img-fluid rounded mx-auto d-block"
                            src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                            alt="weather icon"
                            style={{width:"50px"}}
                        />
                    )}
                    </div>
                </div>
            )}
        </div>
    );
}