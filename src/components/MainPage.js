import React, { useEffect, useState } from "react";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genre, setGenre] = useState(false);
  const [search, setSearch] = useState("");

  const URL_MOVIES =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=dcc05348160351e93754038666f1d67d&language=en-US&page=1";

  const URL_TVSHOWS =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=dcc05348160351e93754038666f1d67d&language=en-US&page=1";

  useEffect(() => {
    fetch(URL_MOVIES)
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

  useEffect(() => {
    fetch(URL_TVSHOWS)
      .then((response) => response.json())
      .then((data) => {
        setTvShows(Object.values(data)[1]);
        console.log(data);
        console.log(Object.values(data)[1]);
      });
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.overview.toLowerCase().includes(search.toLowerCase())
  );

  const filteredShows = tvShows.filter(
    (show) =>
      show.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      show.overview.toLowerCase().includes(search.toLowerCase())
  );

  const switchGenre = () => {
    if (genre) {
      setGenre(false);
    } else {
      setGenre(true);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" onChange={handleChange} />
      </div>
      <button className="btn-switch" onClick={switchGenre}>
        {genre ? (
          <p className="genre-type">Tv Show</p>
        ) : (
          <p className="genre-type">Movie</p>
        )}
      </button>
      {genre ? (
        <div className="movie-grid">
          {filteredMovies.map((movie) => {
            return (
              <div>
                <img
                  src={
                    "https://www.themoviedb.org/t/p/original" +
                    movie.poster_path
                  }
                />
                <h2 className="movie-title">{movie.title}</h2>
                <p className="release-date">{movie.release_date}</p>
                <p className="description">{movie.overview}</p>
                <p className="rating">Rating: {movie.vote_average}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="show-grid">
          {filteredShows.map((show) => {
            return (
              <div>
                <img
                  src={
                    "https://www.themoviedb.org/t/p/original" + show.poster_path
                  }
                />
                <h2 className="show-title">{show.name}</h2>
                <p className="release-date">{show.first_air_date}</p>
                <p className="description">{show.overview}</p>
                <p className="rating">Rating: {show.vote_average}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainPage;
