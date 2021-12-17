import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';

const options = [
  { value: 'artistName-ascending', label: 'Artist Name Ascending' },
  { value: 'artistName-descending', label: 'Artist Name Descending' },
  { value: 'albumName-ascending', label: 'Album Name Ascending' },
  { value: 'albumName-descending', label: 'Album Name Descending' }
];

const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '60%',
    transform: 'translate(-40%, -10%)',
  },
};

function Favorites() {
  const [album, setAlbum] = useState([]);
  const [selectedOption, setSelectedOption] = useState("artistName-ascending");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [albumDeleted, setAlbumDeleted] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/albums/favorites", { params: { name: selectedOption.value } }).then((res) => {
        setAlbum(res.data);
    });
  }, [selectedOption, albumDeleted]);

  const deleteFavorite = (data) => {
    axios
      .post("http://localhost:4000/api/albums/deleteFavorite", data)
      .then(res => {
        setAlbumDeleted(res.data);
      })
  }

  const AlbumModal = ({ album }) => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h1>Do u want to delete album {album.artistName} - {album.albumName} from favorites?</h1>
      <button onClick={() => {deleteFavorite(album); setIsOpen(false)}}>Delete</button>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </Modal>
  );

  return(
    <section>
      <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
      />
      <div className="container-fluid">
          <h1>Favorite albums</h1>
          <div className="card-body">
            {album.map(album =>
                <div key={album}>
                  <img src={album.imageUrl} alt="cover"/>
                  {album.artistName} - {album.albumName}
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setActiveAlbum(album);
                    }}
                  >
                    Delete from favorites
                  </button>
                </div>
                )}
                {activeAlbum && <AlbumModal album={activeAlbum} />}
          </div>
        </div>
    </section>
  );
}

export default Favorites;