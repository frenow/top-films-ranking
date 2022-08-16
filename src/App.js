import React, { useEffect, useState } from "react";
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from './services/firebase';

import Rating from '@mui/material/Rating';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './App.css';

function App() {
  const [user, setUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieDetalhe, setMovieDetalhe] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = async (id) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d416af5d4faee64e25ab001d87aab5c3`);
    console.log(data); 
    setMovieDetalhe(data);
    setOpen(true);
  };  

  const handleNovaLista = () => {
    console.log(movies)
  };    

  const handleClose = () => {
    setOpen(false);
  };  


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
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d416af5d4faee64e25ab001d87aab5c3`);
    setMovies(data.results.map(d => ({ ...d, star: 0 })));
    console.log(data.results.map(d => ({ ...d, star: 0 })));
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
               <img src={user.photoURL} alt={user.displayName} className="App-avatar" style={{ display: "box" }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <div className="App">
      <Button onClick={handleGoogleSignin} fontSize="large" color="primary" variant="contained">Entrar com google</Button>
      <Button onClick={handleNovaLista} fontSize="large" color="primary" variant="contained">Console nova lista</Button>

      {movies.map(movie => (
      <div key={movie.id} className="App-list">
              <Card sx={{ minWidth: 300 }}>
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
                <Rating name="ranking-star" value={movie.star} onChange={(event, newValue) => { setMovies(prevState => [...prevState].map(m => m.id === movie.id ? ({...m, star: newValue}) : m))}} /> 
                <CardActions>
                  <Button size="small" onClick={() => handleClickOpen(movie.id)}>Saiba mais</Button>
                </CardActions>
              </Card>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {movieDetalhe.original_title}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {movieDetalhe && movieDetalhe.overview}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>Ok</Button>
                </DialogActions>
              </Dialog>                
              </div>
        ))}
      </div>    
    </>
  );
}

export default App;
