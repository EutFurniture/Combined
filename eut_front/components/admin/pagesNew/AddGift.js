import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import clsx from 'clsx';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {Redirect} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { mainListItems } from './listItems';



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
    fontSize:40,
    fontWeight:600,
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
    backgroundColor:'#f0f8ff'
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
  imageInput:{
    border:'none',
    borderColor:'white'
  },
  profile_img:{
    width:'50px',
    height:'50px',
    borderRadius:'50px'
  }
  
}));

const styles = {
  side:{
    backgroundColor:'rgb(37,37,94)',
  },
 
  
};



export default function AddGift() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',product_img:'',message:'',success:false})
  const[ product_name,setName]=useState("");
  const[price,setPrice]=useState("");
  const[quantity,setQuantity]=useState("");
  //const[image,setImage]=useState("");
  //const [progressbar,setProgressbar] = useState(0);
  const[category_id,setCategoryID]=useState("");
 
  const submitForm =(e) =>{
    e.preventDefault();
      
    if(state.file)
    {
      let formData=new FormData();
      formData.append('file',state.file)

   axios.post('http://localhost:3001/imageUpload',formData,{
        'content-Type':'multipart/form-data',
      })

      axios.post('http://localhost:3001/addGift', {
     
       
        image:state.file.name,
        product_name: product_name,
        price:price,
        quantity:quantity,
        category_id:category_id,
       
        
      }).then(()=>{
        alert('Gift added successfully');
        window.location.href='/ManageGifts'
      })
     

}else{
  setState({
    ...state,
    message:'Please select image'
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
        gift_img:reader.result,
        message:""
      })
    }
    reader.readAsDataURL(file);
  }
  
  const [typeList,setTypeList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/loadCategoryType").then((response)=>{
      setTypeList(response.data)
    })
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const [Dt, setDt] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewAdmin', {
          params: {
              id: id,  
          }
          
      });

      setDt(response.data[0]);
         console.log(response.data[0]);

  };
  fetchData();
}, [id]);

const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [cusorderCount,setCusOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
  },[])

  const NotificationClick = async () => {
    axios.get('http://localhost:3001/NoficationActive', {
       
        
    });
    if(customizedcount>0)
    {
    const customToast=()=>{
      return(
        <div>
          You have requested customized Order from Customer!
          <button style={{marginLeft:'10px',border:'none',backgroundColor:'skyblue',borderRadius:'5px'}} onClick={Cuspage}>View</button>
        </div>
      )
    }
  
    const notify=()=>{
     
      toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
    
    
        }
        notify();
  }
  }
  
  const customizedcount=cusorderCount.map(record=>record.count);
  const total=Number(customizedcount);



const Cuspage=()=>{
window.location.href='/admin/pages/CustomizedOrders'
}



  


  const handleClose = () => {
    setAnchorEl(null);
  };

  

    
    const[isAuth,setIsAuth]=useState(true);

  if(!isAuth){
    return <Redirect to="" />
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} style={{backgroundColor: 'rgb(37,37,94)'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <strong>ADMIN</strong>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={total} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
          
          <img src={`/${Dt.emp_img}`} onClick={handleClick} className={classes.profile_img} alt='/Noimage'/>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={()=>setIsAuth(false)}>Logout</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
      <div style={styles.side}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'white'}}>{mainListItems}</List>
        
        
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={18}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={11} direction="row"  >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>ADD GIFT DETAILS</strong>
            </Typography><br/>

            
            <Form  onSubmit={submitForm} >

<Form.Group as={Row} controlId="formHorizontalName">
     <Form.Label column lg={2} >
      Gift Name :
     </Form.Label>
     <Col >
       <Form.Control type="text" placeholder="chair,table and etc" 
       onChange={(event)=> {
         setName(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlId="formHorizontalPrice">
     <Form.Label column lg={2} >
     Points :
     </Form.Label>
     <Col >
       <Form.Control type="text" placeholder="xxxx" 
       onChange={(event)=> {
         setPrice(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
  
   
<Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
     <Form.Label column lg={2}>
      Gift Image :</Form.Label>
     <Col >
       <Form.Control type="file" name="img" className={classes.imageInput} onChange={handleInput} />
     </Col>
     </Form.Group>  
    
{state.message && <h6 className={classes.mess}>{state.message}</h6>}            
     <div style={{marginLeft:'227px'}}>
{state.product_img && (<img src={state.product_img}  width="20%" height="20%"  alt="preview" />)}
</div><br/>

<Form.Group as={Row} controlId="formHorizontalCategory">

<Form.Label column lg={2} >
 Category ID:
</Form.Label>
<Col >
  <Form.Control as="Select" name='type' onChange={(event)=> { setCategoryID(event.target.value); }} >
    <option>Select Category</option>
  {typeList.map((record)=>{return(
  <option value={record.category_id}>{record.category_id}-{record.name}</option>
  )
 })}
 
 
  </Form.Control>  
</Col>
</Form.Group><br/>
   
  
   <Form.Group as={Row} controlId="formHorizontalQuantity">
     <Form.Label column lg={2} >
     Quantity :
     </Form.Label>
     <Col >
       <Form.Control type="text" placeholder="5" 
       onChange={(event)=> {
         setQuantity(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
   
       <div align="center">
       <Button  type="submit"   style={{fontSize:'20px',width:'200px'}} >Submit</Button>
       </div>
      

</Form>
            
              </Paper>
              </div>
            </Grid>
 
          </Grid>
          
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

