import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Favorites() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/albums/favorites").then((response) => {
        setPost(response.data);
        console.log(response.data)
        });
    }, []);

    if (!post) return null;

    return(
        <section>
            <div className="container-fluid">
                <h1>Favorite albums</h1>
                <div className="card-body">
                    {post.map(post =>
                        <div key={post}>
                            <img src={post.imageUrl} alt="cover"/>
                            {post.artistName} - {post.albumName}
                        </div>
                        )}
                </div>
            </div>
        </section>
    );
}

export default Favorites;