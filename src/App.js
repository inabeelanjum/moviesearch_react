import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    await axios
      .get(`${process.env.REACT_APP_URL}&s=${title}`)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        setMovies(data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("am first");
  };
  // without async await
  // const searchMovies =  (title) => {
  //    axios
  //     .get(`${API_URL}&s=${title}`)
  //     .then((res) => {
  //       const data = res.data;
  //       console.log(res.data);
  //       setMovies(data.Search);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log("am first");
  // };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
