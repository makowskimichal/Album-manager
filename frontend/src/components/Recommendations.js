import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations() {
    const [album, setAlbum] = useState([]);
    // const [seeds, setSeeds] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:4000/api/albums/seeds").then((res) => {
    //         setSeeds(res.data);
    //     });
    //   }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/api/albums/recommend").then((res) => {
            setAlbum(res.data);
        });
      }, []);

return (
    <div className="container-fluid">
        <h1>Recommended albums</h1>
        <div className="card-body">
        {album.map(album =>
            <div key={album}>
                <img src={album.imageUrl} alt="cover"/>
                {album.artistName} - {album.albumName}
            </div>
            )}
        </div>
    </div>
);
}

export default Recommendations;