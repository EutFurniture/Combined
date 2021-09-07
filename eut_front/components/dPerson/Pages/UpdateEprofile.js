import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Redirect, useParams, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Fragment } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: '9%',
    marginTop: '-3%',

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
    fontSize: 40,
    fontWeight: 600,
  },
  userimage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderColor: 'white',

  },


  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',

  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: '20px',
    marginLeft: '40px',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
  addbutton: {
    // backgroundColor:'#0000ff',
    height: '50px',
    width: '160px',
    borderRadius: '5px',
    marginRight: '10px',
    textDecoration: 'none',
    textAlign: 'center',
    paddingTop: '10px'
  },
  btn: {
    color: 'white',
    fontSize: '18px',
    width: '150px',
    height: '40px',
    //  backgroundColor:'blue',
    border: 'none',
    borderRadius: '5px',
    
  },
  addproducts: {
    display: 'flex',
  },
update:{
  textDecoration:'none',
  color:'white',
  '&:hover':{
    textDecoration:'none',
    color:'white',
  },
}


}));

const styles = {
  side: {
    // backgroundColor:'rgb(37, 37, 94)',
  }
};




export default function UpdateEprofile(userData) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { id } = useParams();
  const [Dt, setDt] = useState([])
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newPhone_no, setNewPhone_no] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newEmp_img, setNewEmp_img] = useState();
  const [state, setState] = useState({ file: '', name: '', description: '', emp_img: "", message: "", success: false })
  const [employeeList, setEmployeeList] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/DpProfile', {
        params: {
          id: userData.userData.id,

        }
      });

      setDt(response.data[0]);
      setNewName(response.data[0].name);
      setNewAddress(response.data[0].address)
      setNewPhone_no(response.data[0].phone_no)
      setNewEmp_img(response.data[0].emp_img)
      console.log(response.data[0]);
    };
    fetchData();
  }, [id]); 
  

  const updateEmployeeProfile = (id) => {

    if(state.file)
    {
   
      let formData = new FormData();
      formData.append('file', state.file)
    
      axios.post('http://localhost:3001/imageUpload', formData, {

        'content-Type': 'multipart/form-data',
      })
     

        axios.put("http://localhost:3001/updateEmployeeProfile", {name: newName, address: newAddress, emp_img:state.file.name ,  phone_no: newPhone_no,   id: id}).then(
        (response) => {

          setEmployeeList(Dt.map((val) => {
            return val.id === id ? {
              id: val.id, name: val.name, address: val.address,  emp_img: val.emp_img, phone_no: val.phone_no,
              name: newName, address: newAddress, emp_img: newEmp_img, phone_no: newPhone_no
            } : val

          }))
        }
      )
      alert("Employee Edited successfully")
      }
  };

  const handleInput = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0]
    reader.onloadend = () => {
      setState({
        ...state,
        file: file,
        emp_img: reader.result,
        message: ""
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




  return (
    <Fragment>
    <div className={classes.root}>
      <CssBaseline />


      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={10}>
            {/* Recent Orders */}
            <Grid item xs={11} direction="row"  >

              <div >
                <Paper className={classes.paper}>

                  <Typography component="h1" variant="h6" color="inherit" align="center" width="100%" noWrap className={classes.title}>
                    <strong> UPDATE PROFILE DETAILS </strong>
                  </Typography><br />

                  <Form >


                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                         Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" defaultValue={newName}
                          onChange={(event) => {
                            setNewName(event.target.value);
                          }} />
                      </Col>
                    </Form.Group><br />
                   
                    <Form.Group as={Row} controlId="formHorizontalAddress">
                      <Form.Label column lg={2} >
                        Address :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" defaultValue={newAddress} onChange={(event) => {
                          setNewAddress(event.target.value);
                        }} />
                      </Col>
                    </Form.Group><br />

                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        Image :
                      </Form.Label>
                      <Col >
                        <Form.Control type="file" defaultValue={newEmp_img}
                          onChange={handleInput}
                        />
                      </Col>
                    </Form.Group><br />

                    <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                      <Form.Label column lg={2} >
                        Phone No :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" defaultValue={newPhone_no} onChange={(event) => {
                          setNewPhone_no(event.target.value);
                        }} />
                      </Col>
                    </Form.Group><br />




                    <div align="center">
                    <Button style={{ fontSize: '20px', width: '200px' }} type="submit" onClick={() => {updateEmployeeProfile(Dt.id)}} >
               <Link to="/dPerson/DpProfile"   className={classes.update}>Update</Link>  
                    </Button>
                    </div>

                  </Form>



                </Paper>
              </div>

            </Grid>

          </Grid>
        </Container>
      </main>
      
    </div>
  
    </Fragment>
  );
}
