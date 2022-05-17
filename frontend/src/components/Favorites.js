import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import { getUserFromLocalStorage } from '../components/auth/AuthService';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserFromLocalStorage();

    axios.get("http://localhost:4000/api/albums/favorites", { params: { name: selectedOption.value, user: user.username } }).then((res) => {
        setAlbum(res.data);
    });
  }, [selectedOption, albumDeleted]);

  const deleteFavorite = (data) => {
    const user = getUserFromLocalStorage();

    axios
      .post("http://localhost:4000/api/albums/deleteFavorite", {data, user: user.username})
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
      <h1>Favorite albums</h1>
      <div className='container-fluid align-middle mt-3 mb-1' style={{width: "80%"}}>
      <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
      />
      </div>
      <div className="container-fluid">
      {album.map(album =>(
        <div className='row' style={{padding: "1.85%"}} key={album}>
          <div className='col-2'>
            <img src={album.imageUrl} alt="cover" style={{cursor: 'pointer'}} onClick={()=> navigate(`/album/${album.albumId}`)}/>
          </div>
          <div className='col'>
          {album.artistName}
          </div>
          <div className='col'>
          {album.albumName}
          </div>
          <div className='col-2'>
          <button
            onClick={() => {
              setIsOpen(true);
              setActiveAlbum(album);
            }}
          >
            Delete from favorites
          </button>
          </div>
        </div>
        ))}
        {activeAlbum && <AlbumModal album={activeAlbum} />}
        </div>
    </section>
  );
}

export default Favorites;