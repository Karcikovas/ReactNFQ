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
      lovedMovies: [],
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
    const movieList = list.map(movie => ({...movie, liked: false}));
    this.setState({movieList})
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

  setlovMovie = () => {
    const List = this.state.movieList.map((listItem) => {
      if (listItem.id === id) {
        return {...listItem, liked: !listItem.liked}
      } else {
        return listItem
      }
    });

    this.setState({movieList: List})
  }

  render() {
    const {movieList, genreList} = this.state;
    return(
    <div>
      <div className='genres'>
        {genreList.map((listItem) => (
            <span
                className='genre'
                key={listItem.id}
                onClick={() => this.getGenresId(listItem.id)}

            >
              {listItem.name}
            </span>
        ))}
      </div>

      {movieList.map((listItem) => (
          <Card
              setFavoriteMovie={this.setlovMovie}
              loved={listItem.liked}
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
