import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import './App.css';
const API_KEY = 'd416af5d4faee64e25ab001d87aab5c3';

function App() {
  const [movies, setMovies] = useState([]);
  const [star, setStar] = useState(0);

  const rating = {
    size: 30,
    count: 5,
    value: star,
    onChange: newValue => {
      setStar(newValue);
      console.log(`Example 2: new value is ${newValue}`);
    }
  };  

  useEffect(() => {
    (async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}`);
    setMovies(data.results);
    console.log(data.results); 
  })();  

}, []);

  return (
    <div className="App">
        <h1>Top Films Ranking</h1>
        <ul style={{ listStyle: "none" }}>
        {movies.map(movie => (
          <li>{movie.title}<ReactStars {...rating} /><img src={"https://image.tmdb.org/t/p/original"+movie.poster_path} alt="poster" width="50" height="60"/></li>
        ))}
        </ul>
    </div>
  );
}

export default App;
