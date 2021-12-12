import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth() {
    const [accessToken, setAccessToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios
          .post("http://localhost:4000/api/authorizeSpotify/login")
          .then(res => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch((err) => {
            console.log(err);
          })
      }, [])

      useEffect(() => {
        if (!expiresIn) return
        const interval = setInterval(() => {
          axios
            .post("http://localhost:4000/api/authorizeSpotify/refresh")
            .then(res => {
              setAccessToken(res.data.accessToken)
              setExpiresIn(res.data.expiresIn)
            })
            .catch((err) => {
                console.log(err);
            })
        }, (expiresIn - 60) * 1000)
    
        return () => clearInterval(interval)
      }, [expiresIn])
    
      return accessToken
    }