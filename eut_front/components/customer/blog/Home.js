import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import Button from '@material-ui/core/Button';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Blog  from './Blog';
import Footer from '../Footer';
import Img1 from '../../../images/din.jpg';
import Img2 from '../../../images/add.jpg';
import Image from '../../../images/home1.jpeg';

import '../Footer.css'

import Caresoul from '../Caresoul'
import { FaBorderNone } from 'react-icons/fa';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  post:{
    textDecoration:"none",
    '&:hover':{
     
     
     textDecoration:'none',
    }
  }
}));


const mainFeaturedPost = {
  title: 'The every thing sales',
  description:
    "Why are you waiting for?           let's  order product and make your home comfortable .",
  image:`url(${Image})`,
  imgText: 'main image description',
  
};

const featuredPosts = [
  {
   
    title: 'Sales Off Up to 50%',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image:Img1,
    imageText: 'Image Text',
  },
  {
    title: 'Sofa Collection',
    
    description:
      'starting from Rs.50000.00',
    image: Img2,
    imageText: 'Image Text',
  },
];





export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      
      <CssBaseline />
      <Container maxWidth="lg">
        
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={3}>
            {featuredPosts.map((post) => (
              <FeaturedPost  className={classes.post} key={post.title} post={post} />
            ))}
          </Grid>
          <Caresoul />
          <Grid  xs={12}>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Get Access to our Latest Sales, Product Details
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
             
            />
           <Button size="small">Subscribe</Button>
          </form>
        </div>
      </section>
      </Grid>
      
        </main>

       
      </Container>
     <Footer />
    </React.Fragment>
  );
}
