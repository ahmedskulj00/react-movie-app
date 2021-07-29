import React, { useEffect, useState } from "react";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const URL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=dcc05348160351e93754038666f1d67d&language=en-US&page=1";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(Object.values(data)[1]);
        console.log(data);
        console.log(Object.values(data)[1]);
      });
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.overview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="movie-grid">
        <input type="text" onChange={handleChange} />
        {filteredMovies.map((movie) => {
          return (
            <div>
              <img
                src={
                  "https://www.themoviedb.org/t/p/original" + movie.poster_path
                }
              />
              <h2>{movie.title}</h2>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
