import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:4000/api/albums/bought";

function Bought() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setPost(response.data);
        console.log(response.data)
        });
    }, []);

    if (!post) return null;

    return(
        <section>
            <div className="container-fluid">
                <h1>Bought albums</h1>
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

export default Bought;