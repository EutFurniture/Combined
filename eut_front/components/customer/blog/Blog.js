import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Img1 from '../../../images/din.jpg';
import Image from '../../../images/home1.jpeg';
// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(1),
//   },
// }));





export default function Blog(userData) {
  //const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xxl" minWidth="360px">
        <Header title="EUT FURNITURE" cust={userData.userData} />
        
      </Container>
     
    </React.Fragment>
  );
}
