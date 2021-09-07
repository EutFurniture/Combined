import {toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
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
import { useParams } from 'react-router-dom';
import { mainListItems, Logout } from './listItems';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

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


const drawerWproduct_idth = 240;

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
    transition: theme.transitions.create(['wproduct_idth', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWproduct_idth,
    wproduct_idth: `calc(100% - ${drawerWproduct_idth}px)`,
    transition: theme.transitions.create(['wproduct_idth', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHproduct_idden: {
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
    wproduct_idth: drawerWproduct_idth,
    transition: theme.transitions.create('wproduct_idth', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hproduct_idden',
    transition: theme.transitions.create('wproduct_idth', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    wproduct_idth: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      wproduct_idth: theme.spacing(9),
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
  sproduct_ide:{
    backgroundColor:'rgb(37,37,94)',
  },
 
  
};



export default function AddProductForm() {


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state,setState]=useState({file:'',product_img:'',message:'',success:false})
  const[newName,setNewName]=useState();
  const[newPrice,setNewPrice]=useState();
  const[newDescription,setNewDescription]=useState();
  const[newQuantity,setNewQuantity]=useState();
  const[newMaterial,setNewMaterial]=useState();
  const[newCategory_id,setNewCategory_id]=useState();
  const[newProduct_img,setNewProduct_img]=useState();
  const [progressbar,setProgressbar] = useState(0);
  const {product_id} = useParams();
  const [Dt, setDt] = useState([])

  const [typeList,setTypeList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/loadCategoryType").then((response)=>{
      setTypeList(response.data)
    })
  },[])
  

  const [productList,setProductList]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/loadProduct").then((response)=>{
        setProductList(response.data)
      })
    },[])

    useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get('http://localhost:3001/viewProduct', {
              params: {
                  product_id: product_id,
                  
              }
          });
    
          setDt(response.data[0]);
          setNewName(response.data[0]. product_name)
          setNewPrice(response.data[0].price)
          setNewDescription(response.data[0].description)
          setNewQuantity(response.data[0].quantity)
          setNewMaterial(response.data[0].material)
          setNewCategory_id(response.data[0].category_id)
          setNewProduct_img(response.data[0].product_img)
         
      };
      fetchData();
    }, [product_id]);
    
    const updateProducts = (product_id) => {
      if(state.file)
      {
        let formData=new FormData();
        formData.append('file',state.file) 
        axios.post('http://localhost:3001/imageUpload',formData,{
            'content-Type':'multipart/form-data',
          })
    
      axios.put("http://localhost:3001/updateProduct", { product_name: newName,price:newPrice,material:newMaterial,category_id:newCategory_id,product_img:state.file.name,quantity:newQuantity,product_id: product_id}).then(
        (response) => {
          
          setProductList(Dt.map((val) => {
            return val.product_id === product_id ? {product_id: val.product_id,  product_name: val. product_name, price: val.price,material:val.material,category_id:val.category_id,product_img:val.product_img,quantity:val.quantity, 
              product_name: newName,description:newDescription,price:newPrice,material:newMaterial,category_id:newCategory_id,product_img:newProduct_img,quantity:newQuantity} : val
            
          }))
        }
        )
    
      alert("Product Edited successfully")  
      
        }
      
   
      
    };

    const handleInput =(e) =>{
      let reader =new FileReader();
      let file=e.target.files[0]
      reader.onloadend =() =>{
        setState({
          ...state,
          file:file,
          userImage:reader.result,
          message:""
        })
       
      }
      reader.readAsDataURL(file);
    }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const [Dts, setDts] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/viewAdmin', {
          params: {
              id: id,  
          }
          
      });

      setDts(response.data[0]);
         console.log(response.data[0]);

  };
  fetchData();
}, [id]);

const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

const NotificationClick = async () => {
  const response = await axios.get('http://localhost:3001/NoficationActive', {
     
      
  });
  notify();
}

const [cusorderCount,setCusOrderCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/CustomizedOrderCount").then((response)=>{
      setCusOrderCount(response.data)
      
    })
  },[])
const customizedcount=cusorderCount.map(record=>record.count);
console.log(customizedcount);

const customToast=()=>{
  return(
    <div>
      You have requested customized Order from Customer!
      <button style={{marginLeft:'10px',border:'none',backgroundColor:'white',borderRadius:'5px'}} onClick={Cuspage}>View</button>
    </div>
  )
}

const Cuspage=()=>{
window.location.href='/admin/pages/CustomizedOrders'
}


const notify=()=>{
   
  toast.info(customToast,{position:toast.POSITION.TOP_RIGHT,autoClose:false})


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
            <Badge badgeContent={customizedcount} color="secondary">
              <NotificationsIcon onClick={NotificationClick}/>
            </Badge>
          </IconButton>
          
          <img src={`/${Dts.emp_img}`} onClick={handleClick} className={classes.profile_img}/>
          <Menu
        product_id="simple-menu"
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
      <div style={styles.sproduct_ide}>
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
        
        <Divider />
        <List style={{backgroundColor: 'rgb(37,37,94)', color:'red'}}>{Logout}</List>
        <Divider />
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWproduct_idth="lg" className={classes.container}>
          <Grid container spacing={18}>
        
            
            

            {/* Recent Orders */}
            <Grid item xs={11} direction="row"  >
            
  
            <div >
              <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" color="inherit"  align="center" width="100%" noWrap className={classes.title}>
              <strong>UPDATE PRODUCT DETAILS</strong>
            </Typography><br/>
            <Form >

<Form.Group as={Row} controlproduct_id="formHorizontalName">
     <Form.Label column lg={2} >
      Product Name :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newName}
       onChange={(event)=> {
         setNewName(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlproduct_id="formHorizontalPrice">
     <Form.Label column lg={2} >
     Price :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newPrice} 
       onChange={(event)=> {
         setNewPrice(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
  
   

   <Form.Group as={Row} controlId="formHorizontalFile" className="mb-3">
     <Form.Label column lg={2}>
      Product Image :</Form.Label>
     <Col >
     <Form.Control type="file"  defaultValue={newProduct_img} className={classes.imageInput}
      onChange={handleInput}
     />                  
     </Col>
     </Form.Group>  

<Form.Group as={Row} controlproduct_id="formHorizontalQuantity">
     <Form.Label column lg={2} >
     Material :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newMaterial}
       onChange={(event)=> {
         setNewMaterial(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>

   <Form.Group as={Row} controlproduct_id="formHorizontalDescription">
     <Form.Label column lg={2} >
     Description :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newDescription}
       onChange={(event)=> {
         setNewDescription(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
   
                       
{/* <Form.Group as={Row} controlproduct_id="formHorizontalCategory">

     <Form.Label column lg={2} >
     Product Category :
     </Form.Label>
     <Col >
       <Form.Control as="Select" name='type' onChange={(event)=> { setCategory(event.target.value); }}>
       {typeList.map((record)=>{return(
       <option value={record.name}>{record.name}</option>
       )
      })}
      
      
       </Form.Control>  
     </Col>
   </Form.Group><br/> */}

   <Form.Group as={Row} controlproduct_id="formHorizontalCategory">

     <Form.Label column lg={2} >
      Category ID:
     </Form.Label>
     <Col >
       <Form.Control as="Select" name='type' onChange={(event)=> { setNewCategory_id(event.target.value); }} >
         <option>{newCategory_id}</option>
       {typeList.map((record)=>{return(
       <option value={record.category_id}>{record.category_id}-{record.name}</option>
       )
      })}
      
      
       </Form.Control>  
     </Col>
   </Form.Group><br/>
  

   <Form.Group as={Row} controlproduct_id="formHorizontalQuantity">
     <Form.Label column lg={2} >
     Quantity :
     </Form.Label>
     <Col >
       <Form.Control type="text" defaultValue={newQuantity}
       onChange={(event)=> {
         setNewQuantity(event.target.value);
       }}
       />
     </Col>
   </Form.Group><br/>
   
       <div align="center">
       <Button  type="submit" onClick={() => {updateProducts(Dt.product_id)}}  style={{fontSize:'20px',width:'200px'}} >Update</Button>
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

