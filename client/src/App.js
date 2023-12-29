import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./js/Construction/Header";
import Home from "./js/Construction/Home";
import Footer from "./js/Construction/Footer";

import Movie from "./js/MovieList";
import Board from "./js/Board/BoardNoCss";
//import BoardList from "./js/Board/BoardList";
//import CreatePage from "./js/Board/CreatePage";
import NumberGuessingGame from "./js/Game/NumberGuessing";
import Quiz from "./js/Game/Quiz"; 
import Todo from "./js/TodoList";
import Weather from "./js/weather/WeatherSearch";
import MusicPlayer from "./js/Music/MusicPlayer_ver2";
import FastClick from "./js/Game/FastClick";
import EmogiBoard from "./js/Emogi";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movie/>} />
            <Route path='/game/numberguessing' element={<NumberGuessingGame />} />
            <Route path='/game/quiz' element={<Quiz />} />
            <Route path='/todos' element={<Todo />} />
            <Route path='/boards' element={<Board />} />
            {/*<Route path="/boards/create" element={<CreatePage/>}/>*/}
            <Route path="/weather" element={<Weather/>} />
            <Route path="/music" element={<MusicPlayer/>} />
            <Route path="/game/fastclick" element={<FastClick />} />
            <Route path="/emoji" element={<EmogiBoard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


export default App;