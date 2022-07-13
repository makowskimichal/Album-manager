import React, { useEffect, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../components/auth/AuthService';

const boughtOptions = [
  { value: 'cd', label: 'CD' },
  { value: 'vinyl', label: 'Vinyl' },
];

const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '60%',
    height: '30%',
    transform: 'translate(-40%, -10%)',
  },
};

function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([boughtOptions[0], boughtOptions[1]])
  const alert = useAlert()
  const [alertMessage, setAlertMessage] = useState();
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();

  const favorites = (data) => {
    axios
      .post("http://localhost:4000/api/albums/favorites", {data, user: user.username})
      .then(res => {
        setAlertMessage(res.data.message);
      })
  }

  const wishlist = (data) => {
    axios
      .post("http://localhost:4000/api/albums/wishlist", {data, user: user.username})
      .then(res => {
        setAlertMessage(res.data.message);
      })
  }

  const bought = (data, selectedOptions) => {
    let result = selectedOptions.map(a => a.value);
    data.boughtMedium = result;
    axios
      .post("http://localhost:4000/api/albums/bought", {data, user: user.username})
      .then(res => {
        setAlertMessage(res.data.message);
      })
  }

  const AlbumModal = ({ result }) => (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h1>Do u want to add album {result.artistName} - {result.albumName} to bought?</h1>
      <Select
        value={selectedOptions}
        onChange={setSelectedOptions}
        isMulti
        name="mediums"
        options={boughtOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <div>
        <button onClick={() => {bought(result, selectedOptions); setIsOpen(false)}}>Add</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </Modal>
  );

  useEffect(() => {
    if(!alertMessage) return
    alert.show(alertMessage)
  }, [alert, alertMessage])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
    if(!search) return setSearchResult([]);
    axios.get("http://localhost:4000/api/albums/search", { params: { name: search } }).then((res) => {
    setSearchResult(res.data)
    })
  }, 500)

  return () => clearTimeout(delayDebounceFn)
  }, [search]);

  return(
    <Container className="container-fluid py-2">
      <Form.Control
        type="search"
        placeholder="Search Albums and Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="container-fluid m-3" style={{fontFamily: "Sora", color: "#000000"}}>  
        {searchResult.map(result => (
          <div className="row" style={{padding: "1.85%"}} key={result.imageUrl}> 
            <div className="col-2" style={{margin: 'auto'}}>
              <img className="pr-10" key={result.imageUrl} src={result.imageUrl} alt="" style={{cursor: 'pointer'}} onClick={()=> navigate(`/album/${result.albumId}`)}/>
            </div>
            <div className='col' style={{margin: 'auto'}}>
            {result.albumName}
            </div>
            <div className='col' style={{margin: 'auto'}}>
            {result.artistName} 
            </div>
            <div className='col' style={{margin: 'auto'}}>
            {result.tracksNumber}
            </div>
            <div className='col' style={{margin: 'auto'}}>
            {result.releaseDate.substring(0,4)}
            </div>
            <div className='col-2' style={{margin: 'auto'}}>
            <button className='button' onClick={() => favorites(result)}>Add to favorites</button>
            </div>
            <div className='col-2' style={{margin: 'auto'}}>
            <button
              className='button'
              onClick={() => {
                setIsOpen(true);
                setActiveAlbum(result);
              }}
            >
              Add to bought
            </button>
            </div>
            <div className='col-2' style={{margin: 'auto'}}>
            <button className='button' onClick={() => wishlist(result)}>Add to wishlist</button>
            </div>
        </div>
        ))}
        {activeAlbum && <AlbumModal result={activeAlbum} />}
      </div>
    </Container>
  );
}

export default Search;