import React ,{useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Blog from '../../blog/Blog'
import Grid from '@material-ui/core/Grid';
import Axios from'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useParams } from "react-router-dom";
import { PayHereButton } from 'react-payhere-button'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Checkout(userData) {
  const classes = useStyles();
  const [products,setproducts]=useState([])
  const [order,setorder]=useState([])
  const [subqut,setsubqut]=useState([])
  const { customer_id } = useParams();
  const [user,setUser]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
        
        const response=await  Axios.get('http://localhost:3001/ordergift_id', {
          params: {
              cid: userData.userData.customer_id,
             
          }
      });
      const o_id=response.data[0].order_id;
     setorder(response.data[0])
   
      const response1=await  Axios.get('http://localhost:3001/getorderproduct', {
          params: {
             oid: o_id,
             
          }
      });
      setproducts(response1.data);
      console.log(response1.data);
      const response2 = await Axios.get('http://localhost:3001/profile', {
            params: {
              customer_id:userData.userData.customer_id,
                
            }
        });
       
        setUser(response2.data[0]);
      

       
    };
    fetchData();
  }, [customer_id]);
  var totalprice = 0;
  var totalitems = 0;
  var total = 0;
  var advance=0;
 
  products.map(function (a) { return totalprice += a.price * a.quantity }, 0);
  products.map(function (a) { return totalitems += 100*a.quantity }, 0);
  products.map(function (a) { return total=totalprice+totalitems }, 0);
  products.map(function (a) { return advance=total*0.2 }, 0);

  const onSucess =async() =>{
    const response=await  Axios.get('http://localhost:3001/ordergift_id', {
          params: {
              cid: userData.userData.customer_id,
             
          }
      });
      const o_id=response.data[0].order_id;
    Axios.get('http://localhost:3001/insertpayment', {
          params: {
             oid: o_id,
             
          }
      });
      
        products.map(function(a){
            
          return Axios.get('http://localhost:3001/inventorybalance', {
              params: {
                  oid: o_id,
                  pid:a.product_id,
                  quty:a.quantity,
                 
              }
             
          });
    });


  } 

  const onDismissed = () => alert('onDismissed');
  return (
    <React.Fragment>
  
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>      
           
              <React.Fragment>
            
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.product_id}>
            <ListItemText primary={product.product_name} secondary={product.quantity} />
            <Typography variant="body2">Rs.{product.total}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Sub Total" />
          <Typography variant="subtitle1" className={classes.total}>
         Rs. {totalprice}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Tax" />
          <Typography variant="subtitle1" className={classes.total}>
         Rs. {totalitems}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
         Rs. {total}
       
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary=" Now you should pay" />
          <Typography variant="subtitle1" className={classes.total}>
        Rs. {advance}
       
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{user.fname}{user.lname}</Typography>
          <Typography gutterBottom>{user.address}</Typography>
        </Grid>
         
      </Grid>
   
                <div className={classes.buttons}>
                 
                <PayHereButton
      sandbox={true}
      merchant_id={'1218334'}
      onCompleted={onSucess}
      onDismissed={onDismissed}
     // onError={onError}
      order_id={order.order_id}
      items={products.map(product =>product.product_name)}
      amount={advance}
      currency={'LKR'}
      first_name={user.fname}
      last_name={user.lname}
      email={user.email}
      phone={user.phone}
      address={user.address}
      city={'Colombo'}
      country={'Sri Lanka'}
      options={{
        delivery_address: 'No. 123, Galle road, Colombo 03',
        delivery_city: 'Kollupitiya',
        delivery_country: 'Sri Lanka',
        custom_1: '',
        custom_2: '',
        return_url: 'http://sample.com/return',
        cancel_url: 'http://sample.com/cancel',
        notify_url: 'http://sample.com/notify',
      }}
    />
  
                </div>
              </React.Fragment>
          
          
        </Paper>
        
      </main>
    </React.Fragment>
  );
}
