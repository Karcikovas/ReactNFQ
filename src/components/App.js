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

    };

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
        .then((res) =>this.setGenreList(res.data.genres))
        .catch((error) =>console.log(error))
  }
  setGenreList = (list) => {
    this.setState({
      genreList: list,
    });
  };

  render() {
    const { movieList,genreList } = this.state;
    return (
        <div>
          {genreList.map((listItem) => (
              <span
                  className='genre'
              >
              {listItem.name}
            </span>
          ))}
        </div>
    );
  }
}

export default App;
