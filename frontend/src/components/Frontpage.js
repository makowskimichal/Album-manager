import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../components/auth/AuthService';

function Frontpage() {
    const [favorite, setFavorite] = useState([]);
    const [bought, setBought] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUserFromLocalStorage();

        axios.get("http://localhost:4000/api/albums/favorites", { params: { user: user.username } }).then((res) => {
            setFavorite(res.data);
        });
      }, []);

      useEffect(() => {
        const user = getUserFromLocalStorage();

        axios.get("http://localhost:4000/api/albums/bought", { params: { user: user.username } }).then((res) => {
            setBought(res.data);
        });
      }, []);

      useEffect(() => {
        const user = getUserFromLocalStorage();

        axios.get("http://localhost:4000/api/albums/wishlist", { params: { user: user.username } }).then((res) => {
            setWishlist(res.data);
        });
      }, []);

    return(

        <section style={{backgroundColor: "#a0aecd"}}>
            <h2 style={{fontFamily: "Sora", color: "#000000", paddingBottom: "10px"}}>Favorite albums</h2>
            <div>
            <Carousel cols={5} rows={1} gap={0} loop>
                {favorite.map(favorite =>(
                    <Carousel.Item> <img src={favorite.imageUrlBig} alt="cover" width={200} height={200} style={{cursor: 'pointer', border: "#8a9cc1 20px solid"}} key={favorite.albumId} onClick={()=> navigate(`/album/${favorite.albumId}`)}/></Carousel.Item>
                ))}
            </Carousel>
            </div>
            <h2 style={{fontFamily: "Sora", color: "#000000", paddingBottom: "10px", paddingTop: "10px"}}>Bought albums</h2>
            <div>
            <Carousel cols={5} rows={1} gap={0} loop>
                {bought.map(bought =>(
                    <Carousel.Item> <img src={bought.imageUrlBig} alt="cover" width={200} height={200} style={{cursor: 'pointer', border: "#8a9cc1 20px solid"}} key={bought.albumId} onClick={()=> navigate(`/album/${bought.albumId}`)}/></Carousel.Item>
                ))}
            </Carousel>
            </div>
            <h2 style={{fontFamily: "Sora", color: "#000000", paddingBottom: "10px", paddingTop: "10px"}}>Wishlist</h2>
            <div>
            <Carousel cols={5} rows={1} gap={0} loop>
                {wishlist.map(wishlist =>(
                    <Carousel.Item> <img src={wishlist.imageUrlBig} alt="cover" width={200} height={200} style={{cursor: 'pointer', border: "#8a9cc1 20px solid"}} key={wishlist.albumId} onClick={()=> navigate(`/album/${wishlist.albumId}`)}/></Carousel.Item>
                ))}
            </Carousel>
            </div>
        </section>
    );
}

export default Frontpage;