import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
    { value: 'artistName-ascending', label: 'Artist Name Ascending' },
    { value: 'artistName-descending', label: 'Artist Name Descending' },
    { value: 'albumName-ascending', label: 'Album Name Ascending' },
    { value: 'albumName-descending', label: 'Album Name Descending' }
  ];

function Bought() {
    const [album, setAlbum] = useState([]);
    const [selectedOption, setSelectedOption] = useState("artistName-ascending");

    useEffect(() => {
        axios.get("http://localhost:4000/api/albums/bought", { params: { name: selectedOption.value } }).then((res) => {
            setAlbum(res.data);
        });
      }, [selectedOption]);

    return(
        <section>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
            <div className="container-fluid">
                <h1>Bought albums</h1>
                <div className="card-body">
                    {album.map(album =>
                        <div key={album}>
                            <img src={album.imageUrl} alt="cover"/>
                            {album.artistName} - {album.albumName}
                        </div>
                        )}
                </div>
            </div>
        </section>
    );
}

export default Bought;