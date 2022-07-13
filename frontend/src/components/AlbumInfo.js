import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
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

function AlbumInfo() {
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([])
    const {albumId} = useParams();
    const alert = useAlert();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [selectedOptions, setSelectedOptions] = useState([boughtOptions[0], boughtOptions[1]])
    const user = getUserFromLocalStorage();
    
    useEffect(() => {
        axios.get(`http://localhost:4000/api/albums/info/${albumId}`).then((res) => {
            setAlbum(res.data);
            setTracks(res.data.tracks)
        });
      }, [albumId, tracks]);

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
        let album = selectedOptions.map(a => a.value);
        data.boughtMedium = album;
        axios
          .post("http://localhost:4000/api/albums/bought", {data, user: user.username})
          .then(res => {
            setAlertMessage(res.data.message);
          })
      }

      const AlbumModal = ({ album }) => (
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <h1>Do u want to add album {album.artistName} - {album.albumName} to bought?</h1>
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
            <button onClick={() => {bought(album, selectedOptions); setIsOpen(false)}}>Add</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </Modal>
      );

      useEffect(() => {
        if(!alertMessage) return
        alert.show(alertMessage)
      }, [alert, alertMessage])

    return(
        <div className='container-fluid'>
            <img src={album.imageUrlBig} alt="cover" width={200} height={200}></img>
            <h1 style={{fontFamily: "Sora", color: "#000000"}}>{album.artistName} - {album.albumName}</h1>
            <h2 style={{fontFamily: "Sora", color: "#000000"}}>{album.releaseDate}, {album.tracksNumber} tracks</h2>
            <p style={{fontFamily: "Sora", color: "#000000"}}>
                {tracks.map((track, index) => (
                    <div>
                        {index + 1}. {track}
                    </div>
                ))}
            </p>
            <a style={{fontFamily: "Sora", color: "#000000"}} href={album.link}>Listen on Spotify</a>
            <div>
            <button className="button" onClick={() => favorites(album)}>Add to favorites</button>
            </div>
            <div>
            <button
              className="button"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add to bought
            </button>
            </div>
            <div>
            <button className="button" onClick={() => wishlist(album)}>Add to wishlist</button>
            </div>
            <AlbumModal album={album} />
        </div>
    );
}

export default AlbumInfo;