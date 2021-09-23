import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

import clsx from 'clsx';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';


import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from 'axios';

//import { mainListItems, Logout } from './listItems';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eut Furniture
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor:'#ede7f6'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignContent:'center',
    align:'center',
    
  },
  paper: {
    position:'relative',
    align:'center',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
   
  },
  fixedHeight: {
    height: 240,
  },
  mess:{
    color:"red",
    marginLeft:"17%",
  },
  
}));

const styles = {
  side:{
    backgroundColor:'#5e35b1',
  },
  pack:{
    justifyContent:'flex-around',
    marginLeft:'20px'
  }  ,
  button_style:{
    display:'flex',
    justifyContent:'space-between',
  }
  
};



export default function AddProduct() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',product_img:'',message:'',success:false})
  const[name,setName]=useState("");
  const[price,setPrice]=useState("");
  const[description,setDescription]=useState("");
  const[quantity,setQuantity]=useState("");
  const[material,setMaterial]=useState("");
  const[image,setImage]=useState("");
  const [progressbar,setProgressbar] = useState(0);

  const submitForm =(e) =>{
    e.preventDefault();
      
    if(state.file)
    {
      let formData=new FormData();
      formData.append('file',state.file)

   axios.post('http://localhost:3001/imageUpload',formData,{
        'content-Type':'multipart/form-data',
      })

      axios.post('http://localhost:3001/addProduct', {
     
       
        image:state.file.name,
        name:name,
       
        
      })

}else{
  setState({
    ...state,
    message:'please select image'
  })
 
}

}

  const handleInput =(e) =>{
    let reader =new FileReader();
    let file=e.target.files[0]
    reader.onloadend =() =>{
      setState({
        ...state,
        file:file,
        product_img:reader.result,
        message:""
      })
    }
    reader.readAsDataURL(file);
  }

  // const cust=()=>{
  //     Axios.post('http://localhost:3001/customization',{
  //       name:name,
  //       description:description,
  //       measurement:measurement,
  //       color:color,
  //       material:material,
  //   }).then(() =>{
  //     console.log("success");
  //   });
  //   };
  
  return (
      <div className={classes.root}>
      <CssBaseline />
      
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={10} style={styles.pack} >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  width="100%" noWrap className={classes.title}>
              <strong>Make Customized order</strong>
            </Typography><br/>

                 <Form  onSubmit={submitForm} >

                 <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        Product Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" placeholder="chair,table and etc" 
                        onChange={(event)=> {
                          setName(event.target.value);
                        }}
                        />
                      </Col>
                    </Form.Group>
                    {state.message && <h6 className={classes.mess}>{state.message}</h6>}            
                      <div>
                 {state.product_img && (<img src={state.product_img}  width="10%" height="10%" alt="preview" />)}
               </div>
                    <br/>
                    
                 <Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
                      <Form.Label column lg={2}>
                        Upload Design :</Form.Label>
                      <Col >
                        <Form.Control type="file" name="img"  onChange={handleInput} />
                      </Col>
                      </Form.Group>  
                      {state.message && <h6 className={classes.mess}>{state.message}</h6>}            
                      <div>
                 {state.image && (<img src={state.product_img}  width="10%" height="10%" alt="preview" />)}
               </div>
                  

                   

                    

                                   

                    
                        <div  style={styles.button_style}>
                       
                        <Button  type="submit"  size='lg' >Submit</Button>
                        </div>
                       
           
                </Form>
               
              </Paper>
              </div>
            </Grid>
         
          </Grid>
          
          <Box pt={4}>
           
          </Box>
        </Container>
      </main>
    </div>
  );
}