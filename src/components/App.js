import React from 'react';
import Card from './Card';
import axios from 'axios';
import { endpoints, getImageUrl } from '../../config';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movieList: [],
      genreList: [],
      activeGenre: null,

    };
    this.getGenresId();
    this.getMovies();
    this.getGenre();
  }
  getMovies = () => {
    axios
        .get(endpoints.mostPopularMovies())
        .then((res) => this.setMovieList(res.data.results))
        .catch((error) => console.log(error));
  };

  setMovieList = (list) => {
    this.setState({
      movieList: list,
    });
  };
  getGenre = () => {
    axios
        .get(endpoints.genres())
        .then((res) => this.setGenreList(res.data.genres))
        .catch((error) => console.log(error))
  }
  setGenreList = (list) => {
    this.setState({
      genreList: list,
    });
  };

  getGenresId = (id) => {
    axios
        .get(endpoints.genreMovies(id))
        .then((res) => this.setMovieList(res.data.results))
        .catch((error) => console.log(error))
  }

  render() {
    const {movieList, genreList} = this.state;
    return(
    <div>
      <div className='genres'>
        {genreList.map((listItem) => (
            <span
                className='genre'
                onClick={() => this.getGenresId(listItem.id)}

            >
              {listItem.name}
            </span>
        ))}
      </div>

      {movieList.map((listItem) => (
          <Card
              backgroundImage={getImageUrl(listItem.backdrop_path)}
              title={listItem.original_title}
              releaseDate={listItem.release_date}
              score={listItem.vote_average}
              votes={listItem.vote_count}
              description={listItem.overview}
          />
      ))}
    </div>
  );
  }
}

export default App
