import React from "react";
import axios from "axios";
import "./App.css";
import { API_KEY } from "./keys";

class movieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }
  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    if (!id) return;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      )
      .then(res => {
        this.mounted = true;
        const movie = res.data;
        this.setState({ movie });
      });
  }
  render() {
    const { movie } = this.state;
    console.log("movie", movie);
    if (movie && movie.title) {
      return (
        <div className="App">
          <div className="flex-container images">
            <div className="flex-item">
              <figure>
                <img
                  src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
                  alt="Movie Poster"
                />
                <figcaption>{movie.title}</figcaption>
              </figure>
              <div>
                <h1>{movie.title}</h1>
                <div>
                  <h2>Overview</h2>
                  {movie.overview}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default movieDetails;
