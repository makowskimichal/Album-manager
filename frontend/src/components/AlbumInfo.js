import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AlbumInfo() {
    const {albumId} = useParams();    

    return(
        <div>
            {albumId}
        </div>
    );
}

export default AlbumInfo;