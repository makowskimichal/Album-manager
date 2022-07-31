import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Frontpage() {
  const [favorite, setFavorite] = useState([]);
  const [bought, setBought] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/albums/favorites', { params: { user: username } })
      .then((res) => {
        setFavorite(res.data);
      });
  }, [username]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/albums/bought', { params: { user: username } })
      .then((res) => {
        setBought(res.data);
      });
  }, [username]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/albums/wishlist', { params: { user: username } })
      .then((res) => {
        setWishlist(res.data);
      });
  }, [username]);

  return (
    <section style={{ backgroundColor: '#121212' }}>
      <h2 style={{ fontFamily: 'Sora', color: '#acacac', paddingBottom: '10px' }}>
        {username}'s profile
      </h2>
      <h2 style={{ fontFamily: 'Sora', color: '#acacac', paddingBottom: '10px' }}>Favorite albums</h2>
      <div>
        <Carousel cols={5} rows={1} gap={0} loop>
          {favorite.map((favorite) => (
            <Carousel.Item>
              {' '}
              <img
                src={favorite.imageUrlBig}
                alt="cover"
                width={250}
                height={250}
                className="box"
                key={favorite.albumId}
                onClick={() => navigate(`/album/${favorite.albumId}`)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <h2 style={{ fontFamily: 'Sora', color: '#acacac', paddingBottom: '10px' }}>Bought albums</h2>
      <div>
        <Carousel cols={5} rows={1} gap={0} loop>
          {bought.map((bought) => (
            <Carousel.Item>
              {' '}
              <img
                src={bought.imageUrlBig}
                alt="cover"
                width={250}
                height={250}
                className="box"
                key={bought.albumId}
                onClick={() => navigate(`/album/${bought.albumId}`)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <h2 style={{ fontFamily: 'Sora', color: '#acacac', paddingBottom: '10px' }}>Wishlist</h2>
      <div>
        <Carousel cols={5} rows={1} gap={0} loop>
          {wishlist.map((wishlist) => (
            <Carousel.Item>
              {' '}
              <img
                src={wishlist.imageUrlBig}
                alt="cover"
                width={250}
                height={250}
                className="box"
                key={wishlist.albumId}
                onClick={() => navigate(`/album/${wishlist.albumId}`)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Frontpage;
