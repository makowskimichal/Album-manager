import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserFromLocalStorage } from '../components/auth/AuthService';
import { useNavigate } from 'react-router-dom';

function Recommendations() {
    const [album, setAlbum] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const user = getUserFromLocalStorage();

      axios.get("http://localhost:4000/api/albums/recommend", { params: {user: user.username} }).then((res) => {
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
              <img src={album.imageUrl} alt="cover" style={{cursor: 'pointer'}} onClick={()=> navigate(`/album/${album.albumId}`)}/>
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