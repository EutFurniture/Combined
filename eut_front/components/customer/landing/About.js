import React,{Fragment} from 'react';
import Logo from '../../../images/home.jpg'
import Footer from '../Footer';
import Blog from './Blog';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  logo:{
    width:'95vw',
    height: '70vh',
    alignItems: 'center',
    position: 'relative',
    left:'2%',
},
p1:{
    textAlign: 'center',
    Color: 'rgb(17, 83, 170)',
    textShadow: '0 10px 100px rgb(20, 19, 19)',
    fontSize:'30px',
    marginTop: '10px',
    fontWeight: 'bold',
    padding: '10px',
},
ab:{
    
  fontWeight: '20px',
},

ser:{
    liststyletype:'circle',
    
},

about:{
    fontSize: '15px',
    marginTop:'1%',
},
  

}));
//import { Map, GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
   width: '80%',
   height: '50%'

 };
 
function About(){
  const classes = useStyles();
  
    return (
      <Fragment>
      <Blog />
           <div className={classes.about} >
          <img src={Logo} className={classes.logo}  />
          <h2 className={classes.p1}>WELCOME TO EUT FURNITURE ONLINE STORE!</h2>
          <p className={classes.ab}>The place where you meet your furniture expectations with the combination of world class designed and manufactured furniture.EUT Furniture online store makes sure that you will find the perfect match for your every furniture need.
We also  provides customization services. Here you can simply select the design, colour, size and view the furniture image. Also they can select
the type of wood they would like to have for the furniture. you can choose what design they prefer and submit it to us.We will check and confirm  your order .Also we have planned to include  loyalty with you. Here,you will be
given ‘points’ as long as they continue to buy furniture for a certain period of time. These furniture you buy need to be of a certain price range.you can view your points in
their profile. Once you collects a certain amount of points, you can redeem the points. To redeem the points, you will have to reach a new page which is specially
created for this process. In this page, small gifts within a certain price range will be listed.
you  can choose what you needs to buy from this list.we will deliver that gift with your purchased furniture.
</p><br />

<h5 className={classes.serv}>Service options: </h5>
<ul className={classes.ser}>
   <li>In-store shopping </li>
   <li>In-store pick-up </li> 
   <li>Delivery</li>
   <li>Same-day Delivery</li>
   <li>online shopping</li>
</ul>
<br />
<h5>
Address: </h5>No:69 ,K.K.S Road,Chunnakam<br /><br />

<h5>Hours:</h5> 
<h5>Opening hours :</h5><br />
Monday: 8:30 AM – 8:30 PM<br />
Tuesday: 8:30 AM – 8:30 PM<br />
Wednesday: 8:30 AM – 8:30 PM<br />
Thursday: 8:30 AM – 8:30 PM<br />
Friday: 8:30 AM – 8:30 PM<br />
Saturday: 8:30 AM – 8:30 PM<br />
Sunday: Closed <br /><br />

<h5>Contact </h5>
Phone: 0214 546 330 <br />
Email :srieut@gmail.com

<h5>Find Us</h5><br/>
{/*<Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
             
            lat: 9.74968617067785,
            lng: 80.0294666824181
          }
        }
      ></Map>
      */}
       

       </div>
       <Footer />
       </Fragment>
    );
}

 
{/*export default GoogleApiWrapper({
   apiKey: 'AIzaSyCaAPmnObVzSqtR1EW_Hut0FX0s1PTtsn8'
 })(About); */}
 export default About