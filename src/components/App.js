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
      listIds: [],
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
        .then((res) =>this.setGenreList(res.data.genres))
        .catch((error) =>console.log(error))
  }
  setGenreList = (list) => {
    this.setState({
      genreList: list,
    });
  };

  getGenresId = (id) => {
    axios
        .get(endpoints.genreMovies(id))
        .then((res) => this.setCurrentGenreId(res.data.results))
        .catch((error) => console.log(error))
  }

  setCurrentGenreId = (id) => {
    this.setState({
      activeGenre: id,
    });
  };

  ActiveGenre = (id) => this.setState({activeGenre: id});


  render() {
    const { movieList,genreList, ActiveGenre,} = this.state;

    if (ActiveGenre) {
      return (
          <div>
            <div>
              {genreList.map((listItem) => (
                  <span
                      className='genre'
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
      )
    } else {
      return (
          <div>
            <div>
              {genreList.map((listItem) => (
                  <span
                      className='genre'
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
      )
    }
  }
}

export default App
