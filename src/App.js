import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from './services/firebase';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';

import './App.css';
const API_KEY = 'd416af5d4faee64e25ab001d87aab5c3';

function App() {
  const [user, setUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const [star, setStar] = useState(0);


  function handleGoogleSignin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result)=> {
      setUser(result.user);
      console.log(result);
    })    
    .catch((error)=> {
      console.log(error);
    }
    )
  }


  const rating = {
    size: 30,
    count: 5,
    value: star,
    onChange: newValue => {
      setStar(newValue);
      console.log(`Example 2: new value is ${newValue}`);
    }
  };  

  useEffect(() => {
    (async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=${API_KEY}`);
    setMovies(data.results);
    console.log(data.results); 
  })();  

}, []);

  return (
    <div className="App">

<AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TOP FILMS RANKING
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
              <IconButton>
                <Avatar alt={user?.displayName} src={user?.photoURL} />
              </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <IconButton aria-label="Entrar com google" color="primary">
        <GoogleIcon onClick={handleGoogleSignin} />
    </IconButton>         
        <ul style={{ listStyle: "none" }}>
        {movies.map(movie => (
        <div className="App-list">
          <div className="App-card">
              <li key={movie.id}>{movie.title}<ReactStars {...rating} /><img src={"https://image.tmdb.org/t/p/original"+movie.poster_path} alt="poster" width="60" height="70"/></li>
          </div>
        </div>
        ))}
        </ul>
    </div>
  );
}

export default App;
