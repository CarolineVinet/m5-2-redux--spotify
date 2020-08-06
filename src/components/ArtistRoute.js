import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../helpers/api-helpers";

import {
  requestArtistProfile,
  receiveArtistProfile,
  receiveArtistProfileError,
} from "../actions";

const intlFormat = (num) => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

const makeFriendly = (num) => {
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  return intlFormat(num);
};

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const selectedArtist = useSelector(
    (state) =>
      (state.artist.currentArtist && state.artist.currentArtist.profile) || {}
  );

  const artistStatus = useSelector((state) => state.artist.status);
  const artistId = useParams().id;

  React.useEffect(() => {
    if (!accessToken) {
      return;
    } else {
      dispatch(requestArtistProfile());
      fetchArtistProfile(accessToken, artistId)
        .then((res) => {
          dispatch(receiveArtistProfile(res));
        })
        .catch((err) => {
          console.error(err);
          dispatch(receiveArtistProfileError());
        });
    }
  }, [accessToken]);

  if (!selectedArtist.name) {
    return <div>loading</div>;
  }

  return (
    <ArtistPage>
      <Name>{selectedArtist.name}</Name>
      <ArtistPic src={selectedArtist.images[0].url}></ArtistPic>
      <Followers>
        {makeFriendly(selectedArtist.followers.total)} Followers
      </Followers>
      <Genres>
        {selectedArtist.genres[0]} {selectedArtist.genres[1]}
      </Genres>
    </ArtistPage>
  );
};

const ArtistPage = styled.div``;

const Name = styled.h1``;

const ArtistPic = styled.img``;

const Followers = styled.p``;

const Genres = styled.div``;

export default ArtistRoute;
