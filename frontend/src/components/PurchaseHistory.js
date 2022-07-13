import React, { useEffect, useState }  from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import axios from 'axios';
import { getUserFromLocalStorage } from '../components/auth/AuthService';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import moment from 'moment'

function PurchaseHistory() {
    const [album, setAlbum] = useState([]);

      useEffect(() => {
        const user = getUserFromLocalStorage();

        axios.get("http://localhost:4000/api/albums/bought/history", { params: { user: user.username } }).then((res) => {
            setAlbum(res.data);
        });
      }, []);


    return(
        <section>
                <VerticalTimeline>
                   {album.map(album => (
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
                        date={moment(album.albumBought).format("DD.MM.YYYY")}
                        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                        icon={<ShoppingCartIcon />}
                    >   
                        <div className="col-2" style={{margin: 'auto'}}>
                            <img className="pr-10" src={album.imageUrl} alt=""/>
                        </div>
                        <h3 className="vertical-timeline-element-title">{album.artistName} - {album.albumName}</h3>
                    </VerticalTimelineElement>
                   ))} 
                </VerticalTimeline> 
        </section>
    );
}

export default PurchaseHistory;