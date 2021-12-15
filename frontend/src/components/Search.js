import React, { useEffect, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';

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
    transform: 'translate(-40%, -10%)',
  },
};

function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([boughtOptions[0], boughtOptions[1]])

  const favorites = (data, selectedOptions) => {
    console.log(selectedOptions)
    axios
      .post("http://localhost:4000/api/albums/favorites", data)
      .then(res => {
        console.log(res);
      })
  }

  const bought = (data, selectedOptions) => {
    let result = selectedOptions.map(a => a.value);
    data.boughtMedium = result;
    axios
      .post("http://localhost:4000/api/albums/bought", data)
      .then(res => {
        console.log(res);
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
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <Select
        value={selectedOptions}
        onChange={setSelectedOptions}
        isMulti
        name="mediums"
        options={boughtOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <button onClick={() => {bought(result, selectedOptions); setIsOpen(false)}}>Add</button>
    </Modal>
  );

  // const listened = (data) => {
  //   axios
  //     .post("http://localhost:4000/api/albums/listened", data)
  //     .then(res => {
  //       console.log(res);
  //     })
  // }

  useEffect(() => {
    let cancel = false
    if(!search) return setSearchResult([]);
    if (cancel) return
    axios.get("http://localhost:4000/api/albums/search", { params: { name: search } }).then((res) => {
    setSearchResult(res.data)
    });
    return () => (cancel = true)
  }, [search]);

  return(
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-100" style={{ overflowY: "auto" }}>
        <div className="pt-3">  
          {searchResult.map(result => (
            <div className="mt-3"> 
              <img className="pr-10" key={result.imageUrl} src={result.imageUrl} alt=""/>
              {result.artistName} - {result.albumName}
              <button onClick={() => favorites(result)}>Add to favorites</button>
              {/* <button onClick={() => listened(result)}>Add to listened</button> */}
              <button onClick={() => bought(result)}>Add to bought</button>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setActiveAlbum(result);
                }}
              >
                Add to bought (modal)
              </button>
            </div>
          ))}
          {activeAlbum && <AlbumModal result={activeAlbum} />}
        </div>
      </div>
    </Container>
  );
}

export default Search;