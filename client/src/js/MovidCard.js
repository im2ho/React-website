import React from "react";
//MovieList.js와 이어짐
const MovieCard = ({movie}) => (
    <div>
        {movie.poster && <img src={movie.poster} />}
        <h2>{movie.title}</h2>
        <p>평점 : {movie.rating}</p>
    </div>
)

export default MovieCard;