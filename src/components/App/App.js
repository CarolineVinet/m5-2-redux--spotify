import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import ArtistRoute from "../ArtistRoute";
import { useDispatch } from "react-redux";
import {
  receiveAccessToken,
  requestAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const DEFAULT_ARTIST_ID = "0LcJLqbBmaGUft1e9Mm8HV";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(receiveAccessToken(data.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

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
