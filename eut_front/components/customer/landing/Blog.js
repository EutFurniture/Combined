import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Landing from './Landing';
import MainFeaturedPost from '../blog/MainFeaturedPost';
import FeaturedPost from '../blog/FeaturedPost';
import Main from '../blog/Main';
import Img1 from '../../../images/din.jpg';
import Image from '../../../images/home1.jpeg';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(1),
  },
}));





export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Landing title="EUT FURNITURE"  />
        
      </Container>
     
    </React.Fragment>
  );
}
