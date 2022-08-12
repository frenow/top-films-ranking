import React, { useEffect, useState } from "react";
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from './services/firebase';
import IconButton from '@mui/material/IconButton';

import Rating from '@mui/material/Rating';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import './App.css';

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

  useEffect(() => {
    (async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular/?api_key=d416af5d4faee64e25ab001d87aab5c3`);
    setMovies(data.results);
    console.log(data.results); 
  })();  

}, []);

  return (
  <>
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
                <Avatar alt={user.displayName} src={user.photoURL} />
              </IconButton>
               <img src={user.photoURL} alt={user.displayName} className="App-avatar" style={{ display: "none" }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <div className="App">
      <Button onClick={handleGoogleSignin} fontSize="large" color="primary" variant="contained">Entrar com google</Button>

      {movies.map(movie => (
      <div key={movie.id} className="App-list">
              <Card sx={{ minWidth: 400 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={"https://image.tmdb.org/t/p/original"+movie.poster_path}
                  alt={movie.title}
                />  
                <CardContent>
                <Typography variant="body2" color="text.secondary">
                {movie.title}
                </Typography>
                </CardContent>
                <Rating name="ranking-star" value={star} onChange={(event, newValue) => { setStar(newValue) }} /> 
                <CardActions>
                  <Button size="small">Saiba mais</Button>
                </CardActions>
              </Card>  
              </div>
        ))}
      </div>
    </>
  );
}

export default App;
