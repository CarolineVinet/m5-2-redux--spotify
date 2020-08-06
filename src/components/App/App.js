import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import ArtistRoute from "../ArtistRoute";

const DEFAULT_ARTIST_ID = "0LcJLqbBmaGUft1e9Mm8HV";

const App = () => {
  return (
    <Router>
      <Switch />
      <Route exact path="/artist/:id">
        <ArtistRoute />
      </Route>

      <Route path="/">
        {" "}
        <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`}></Redirect>
      </Route>
    </Router>
  );
};

export default App;
