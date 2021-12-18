import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations() {
    const [album, setAlbum] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/albums/recommend").then((res) => {
            setAlbum(res.data);
        });
      }, []);

return (
    <div className="container-fluid">
        <h1>Recommended albums</h1>
        <div className="container-fluid">
        {album.map(album => (
          <div className="row" style={{padding: "1.85%"}} key={album}>
            <div className="col-2">
              <img src={album.imageUrl} alt="cover"/>
            </div>
            <div className="col">
              {album.artistName}
            </div>
            <div className="col">
            {album.albumName}
            </div>
          </div>
        ))}
      </div>
    </div>
);
}

export default Recommendations;