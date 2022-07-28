import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import axios from 'axios';
import { getUserFromLocalStorage } from '../components/auth/AuthService';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import moment from 'moment';

function PurchaseHistory() {
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    const user = getUserFromLocalStorage();

    axios
      .get('http://localhost:4000/api/albums/bought/history', { params: { user: user.username } })
      .then((res) => {
        setAlbum(res.data);
      });
  }, []);

  return (
    <section>
      <VerticalTimeline lineColor='#fff'>
        {album.map((album) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#000', color: '#acacac' }}
            contentArrowStyle={{ borderRight: "7px solid  #acacac" }}
            date={moment(album.albumBought).format('DD.MM.YYYY')}
            dateClassName="cardText"
            iconStyle={{ background: '#000', color: '#fff' }}
            icon={<ShoppingCartIcon />}>
            <div className='row'>
            <div className="col-4" style={{ margin: 'auto' }}>
              <img className="pr-10" src={album.imageUrlBig} alt="" width={130} height={130}/>
            </div>
            <h3 className="vertical-timeline-element-title col cardText">
              <div style={{ fontSize: '20px'}}>
              {album.artistName}
              </div>
              <div>
              {album.albumName}
              </div>
            </h3>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}

export default PurchaseHistory;
