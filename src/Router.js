import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Demo from "./demo";
import movieDetails from "./movieDetails";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Demo} />
          <Route path="/movie/:id" component={movieDetails} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
