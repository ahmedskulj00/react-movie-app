import React, { useEffect, useState } from "react";
import "../App.css";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genre, setGenre] = useState(false);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(null);
  const [visible, setVisible] = useState(10);
  /* For this project I have used themoviedb api and here we can see two links, one for movies and other one for tv shows*/
  const URL_MOVIES =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=dcc05348160351e93754038666f1d67d&language=en-US&page=1";

  const URL_TVSHOWS =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=dcc05348160351e93754038666f1d67d&language=en-US&page=1";

  // I used hook useEffect for fetching api data from url, as well converting it from object into array so I can then insert all of that data into state movies, with using setMovies

  useEffect(() => {
    fetch(URL_MOVIES)
      .then((response) => response.json())
      .then((data) => {
        setMovies(Object.values(data)[1]);
        console.log(Object.values(data)[1]);
      });
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Same functionality but this one is for tv shows
  useEffect(() => {
    fetch(URL_TVSHOWS)
      .then((response) => response.json())
      .then((data) => {
        setTvShows(Object.values(data)[1]);
        console.log(Object.values(data)[1]);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 }); //this useEffect is used to load animation on scroll library
  }, []);

  //This function is used for filtering when searching for movies, you can search for title or for description of a movie, this function converts your search into lower case and then it checks if there is a movie with that title or description
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.overview.toLowerCase().includes(search.toLowerCase())
  );

  // Same functionality like a prevous functions but for tv shows
  const filteredShows = tvShows.filter(
    (show) =>
      show.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      show.overview.toLowerCase().includes(search.toLowerCase())
  );
  // This functions helps us to switch between tv shows and movies
  const switchGenre = () => {
    if (genre) {
      setGenre(false);
    } else {
      setGenre(true);
    }
  };
  // This functions is used for showing more than 10 movies/tv shows, because when you first load a page it is going to show only 10 movies/tv shows
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" onChange={handleChange} />
      </div>
      <button className="btn-switch" onClick={switchGenre}>
        {genre ? (
          <p className="genre-type">TV Shows</p>
        ) : (
          <p className="genre-type">Movies</p>
        )}
      </button>
      {genre ? (
        <div className="movie-grid">
          {filteredMovies.slice(0, visible).map((movie) => {
            //displaying movies from api using map, as well as slice to show only 10 movies
            return (
              <div key={movie.id} data-aos="fade-up">
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
                <div key={movie.id}>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1; //this functionality is still w.i.p., what I tried to make with this are 5 stars that show on screen and users can rate movie / tv shows based on amount of stars they clicked, but I have a bug where if you rate one movie / tv show that rating is then applied for every movie / tv show, and I do not know how to fix it :(
                    return (
                      <label>
                        <input
                          type="radio"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                          className="star"
                          color={ratingValue <= rating ? "black" : "gray"}
                        />
                      </label>
                    );
                  })}
                  <h4>W.I.P.</h4>
                </div>
              </div>
            );
          })}
          <button className="btn-showmore" onClick={showMoreItems}>
            Load more
          </button>
        </div>
      ) : (
        <div className="show-grid">
          {filteredShows.slice(0, visible).map((show) => {
            //displaying tv shows from api using map, as well as slice to show only 10 tv shows
            return (
              <div key={show.id} data-aos="fade-up">
                <img
                  src={
                    "https://www.themoviedb.org/t/p/original" + show.poster_path
                  }
                />
                <h2 className="show-title">{show.name}</h2>
                <p className="release-date">{show.first_air_date}</p>
                <p className="description">{show.overview}</p>
                <p className="rating">Rating: {show.vote_average}</p>
                <div key={show.id}>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1; //this functionality is still w.i.p., what I tried to make with this are 5 stars that show on screen and users can rate movie / tv shows based on amount of stars they clicked, but I have a bug where if you rate one movie / tv show that rating is then applied for every movie / tv show, and I do not know how to fix it :(
                    return (
                      <label>
                        <input
                          type="radio"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                          className="star"
                          color={ratingValue <= rating ? "black" : "gray"}
                        />
                      </label>
                    );
                  })}
                  <h4>W.I.P.</h4>
                </div>
              </div>
            );
          })}
          <button className="btn-showmore" onClick={showMoreItems}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
