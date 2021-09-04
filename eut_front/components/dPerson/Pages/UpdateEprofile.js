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

  const { employee_id } = useParams();
  const [Dt, setDt] = useState([])
  const [newE_name, setNewE_name] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newE_address, setNewE_address] = useState();
  const [newE_phone, setNewE_phone] = useState();
  const [newpassword, setNewpassword] = useState();
  const [newE_image, setNewE_image] = useState();
  const [state, setState] = useState({ file: '', name: '', description: '', userImage: "", message: "", success: false })
  const [employeeList, setEmployeeList] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/DpProfile', {
        params: {
          employee_id: userData.userData.employee_id,

        }
      });

      setDt(response.data[0]);
      setNewE_name(response.data[0].e_name);
      setNewE_address(response.data[0].e_address)
      setNewE_phone(response.data[0].e_phone)
      setNewE_image(response.data[0].e_image)
      console.log(response.data[0]);
    };
    fetchData();
  }, [employee_id]); 
  

  const updateEmployeeProfile = (employee_id) => {

    if(state.file)
    {
   
      let formData = new FormData();
      formData.append('file', state.file)
    
      axios.post('http://localhost:3001/upload', formData, {

        'content-Type': 'multipart/form-data',
      })
     

        axios.put("http://localhost:3001/updateEmployeeProfile", {e_name: newE_name, e_address: newE_address, e_image:state.file.name ,  e_phone: newE_phone,   employee_id: employee_id}).then(
        (response) => {

          setEmployeeList(Dt.map((val) => {
            return val.employee_id === employee_id ? {
              employee_id: val.employee_id, e_name: val.e_name, e_address: val.e_address,  e_image: val.e_image, e_phone: val.e_phone,
              e_name: newE_name, e_address: newE_address, e_image: newE_image, e_phone: newE_phone
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
        e_image: reader.result,
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
                   Email :
                  </Form.Label>
                  <Col >
                  <Form.Label column lg={2} >
                   {Dt.email}
                  </Form.Label>
                  </Col>
              </Form.Group><br/>

                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                         Name :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" defaultValue={newE_name}
                          onChange={(event) => {
                            setNewE_name(event.target.value);
                          }} />
                      </Col>
                    </Form.Group><br />
                   
                    <Form.Group as={Row} controlId="formHorizontalAddress">
                      <Form.Label column lg={2} >
                        Address :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" defaultValue={newE_address} onChange={(event) => {
                          setNewE_address(event.target.value);
                        }} />
                      </Col>
                    </Form.Group><br />

                    <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column lg={2} >
                        Image :
                      </Form.Label>
                      <Col >
                        <Form.Control type="file" defaultValue={newE_image}
                          onChange={handleInput}
                        />
                      </Col>
                    </Form.Group><br />

                    <Form.Group as={Row} controlId="formHorizontalPhoneNo">
                      <Form.Label column lg={2} >
                        Phone No :
                      </Form.Label>
                      <Col >
                        <Form.Control type="text" defaultValue={newE_phone} onChange={(event) => {
                          setNewE_phone(event.target.value);
                        }} />
                      </Col>
                    </Form.Group><br />




                    <div align="center">
                    <Button style={{ fontSize: '20px', width: '200px' }} type="submit" onClick={() => {updateEmployeeProfile(Dt.employee_id)}} >
               <Link to="/employee/DpProfile"   className={classes.update}>Update</Link>  
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
