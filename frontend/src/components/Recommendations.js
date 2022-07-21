import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserFromLocalStorage } from '../components/auth/AuthService';
import { useNavigate } from 'react-router-dom';

function Recommendations() {
  const [album, setAlbum] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserFromLocalStorage();

    axios
      .get('http://localhost:4000/api/albums/recommend', { params: { user: user.username } })
      .then((res) => {
        setAlbum(res.data);
      });
  }, []);

  return (
    <div className="container-fluid">
      <h1 style={{ fontFamily: 'Sora', color: '#acacac' }}>Recommended albums</h1>

      <div className="container-fluid">
        <div
          className="row"
          style={{ padding: '1.85%', fontFamily: 'Sora', color: '#acacac' }}
          key={album.albumId}>
          <div className="col-2" style={{ margin: 'auto' }}>
            Cover
          </div>
          <div className="col" style={{ margin: 'auto' }}>
            Artist
          </div>
          <div className="col" style={{ margin: 'auto' }}>
            Album
          </div>
          <div className="col" style={{ margin: 'auto' }}>
            Tracks
          </div>
          <div className="col" style={{ margin: 'auto' }}>
            Release
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {album.map((album) => (
          <div
            className="row albumList"
            style={{ padding: '1.85%', fontFamily: 'Sora', color: '#acacac' }}
            key={album.albumId}>
            <div className="col-2" style={{ margin: 'auto' }}>
              <img
                src={album.imageUrl}
                alt="cover"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/album/${album.albumId}`)}
              />
            </div>
            <div className="col" style={{ margin: 'auto' }} onClick={() => navigate(`/album/${album.albumId}`)}>
              {album.artistName}
            </div>
            <div className="col" style={{ margin: 'auto' }} onClick={() => navigate(`/album/${album.albumId}`)}>
              {album.albumName}
            </div>
            <div className="col" style={{ margin: 'auto' }} onClick={() => navigate(`/album/${album.albumId}`)}>
              {album.tracksNumber}
            </div>
            <div className="col" style={{ margin: 'auto' }} onClick={() => navigate(`/album/${album.albumId}`)}>
              {album.releaseDate.substring(0, 4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
