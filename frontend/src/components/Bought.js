import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
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

function Bought() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [album, setAlbum] = useState([]);
  const [selectedOption, setSelectedOption] = useState("artistName-ascending");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [albumDeleted, setAlbumDeleted] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserFromLocalStorage();

    axios.get("http://localhost:4000/api/albums/bought", { params: { name: selectedOption.value, user: user.username } }).then((res) => {
        setAlbum(res.data);
    });
  }, [selectedOption, albumDeleted]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
    if(!search) return setSearchResult([]);
    axios.get("http://localhost:4000/api/albums/bought/search", { params: { name: search } }).then((res) => {
    setSearchResult(res.data)
    })
  }, 500)

  return () => clearTimeout(delayDebounceFn)
  }, [search]);

  const deleteBought = (data) => {
    const user = getUserFromLocalStorage();

    axios
      .post("http://localhost:4000/api/albums/deleteBought", {data, user: user.username})
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
      <h1>Do u want to delete album {album.artistName} - {album.albumName} from bought?</h1>
      <button onClick={() => {deleteBought(album); setIsOpen(false)}}>Delete</button>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </Modal>
  );

  return(
    <section>
      <h1 style={{fontFamily: "Sora", color: "#000000"}}>Bought albums</h1>
      <div className='container-fluid' style={{width: "80%"}}>
        <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
        />
      </div>

      <div className='container-fluid' style={{width: "80%"}}>
      <Form.Control
        type="search"
        placeholder="Search Albums and Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      </div>
      <div className="container-fluid">
        <div className='row' style={{padding: "1.85%", fontFamily: "Sora", color: "#000000"}} key={album.albumId}>
          <div className='col-2' style={{margin: 'auto'}}>
            Cover
          </div>
          <div className='col' style={{margin: 'auto'}}>
          Artist
          </div>
          <div className='col' style={{margin: 'auto'}}>
          Album
          </div>
          <div className='col' style={{margin: 'auto'}}>
          Tracks
          </div>
          <div className='col' style={{margin: 'auto'}}>
          Release
          </div>
          <div className="col-2" style={{margin: 'auto'}}>
          Medium
          </div>
          <div className='col-2' style={{margin: 'auto'}}>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {searchResult.length === 0 &&
          <div>
          {album.map(album => (
          <div className="row" style={{padding: "1.85%", fontFamily: "Sora", color: "#000000"}} key={album.albumId}>
            <div className="col-2">
              <img src={album.imageUrl} alt="cover" style={{cursor: 'pointer'}} onClick={()=> navigate(`/album/${album.albumId}`)}/>
            </div>
            <div className="col" style={{margin: 'auto'}}>
              {album.artistName}
            </div>
            <div className="col" style={{margin: 'auto'}}>
            {album.albumName}
            </div>
            <div className='col' style={{margin: 'auto'}}>
          {album.tracksNumber}
          </div>
          <div className='col' style={{margin: 'auto'}}>
          {album.releaseDate.substring(0,4)}
          </div>
          <div className="col-2" style={{margin: 'auto'}}>
              {album.boughtMedium[0] && 
                <div>{album.boughtMedium[0]}</div>
              }
              {album.boughtMedium[1] && 
                <div>{album.boughtMedium[1]}</div>
              }
            </div>
            <div className="col-2" style={{margin: 'auto'}}>
              <button 
                className="button"
                onClick={() => {
                  setIsOpen(true);
                  setActiveAlbum(album);
                }}
              >
                Delete from bought
              </button>
            </div>
          </div>
        ))}
          </div>
        }

        {activeAlbum && <AlbumModal album={activeAlbum} />}
      </div>

      <div className="container-fluid">
        {searchResult.map(album => (
          <div className="row" style={{padding: "1.85%", fontFamily: "Sora", color: "#000000"}} key={album.albumId}>
            <div className="col-2">
              <img src={album.imageUrl} alt="cover" style={{cursor: 'pointer'}} onClick={()=> navigate(`/album/${album.albumId}`)}/>
            </div>
            <div className="col" style={{margin: 'auto'}}>
              {album.artistName}
            </div>
            <div className="col" style={{margin: 'auto'}}>
            {album.albumName}
            </div>
            <div className='col' style={{margin: 'auto'}}>
          {album.tracksNumber}
          </div>
          <div className='col' style={{margin: 'auto'}}>
          {album.releaseDate.substring(0,4)}
          </div>
          <div className="col-2" style={{margin: 'auto'}}>
              {album.boughtMedium[0] && 
                <div>{album.boughtMedium[0]}</div>
              }
              {album.boughtMedium[1] && 
                <div>{album.boughtMedium[1]}</div>
              }
            </div>
            <div className="col-2" style={{margin: 'auto'}}>
              <button 
                className="button"
                onClick={() => {
                  setIsOpen(true);
                  setActiveAlbum(album);
                }}
              >
                Delete from bought
              </button>
            </div>
          </div>
        ))}
        {activeAlbum && <AlbumModal album={activeAlbum} />}
      </div>
    </section>
  );
}

export default Bought;