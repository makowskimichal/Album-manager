import React, { useEffect, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import axios from 'axios';

function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const favorites = (data) => {
    axios
      .post("http://localhost:4000/api/albums/favorites", data)
      .then(res => {
        console.log(res);
      })
  }

  const bought = (data) => {
    axios
      .post("http://localhost:4000/api/albums/bought", data)
      .then(res => {
        console.log(res);
      })
  }

  const listened = (data) => {
    axios
      .post("http://localhost:4000/api/albums/listened", data)
      .then(res => {
        console.log(res);
      })
  }

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
              <button onClick={() => listened(result)}>Add to listened</button>
              <button onClick={() => bought(result)}>Add to bought</button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Search;