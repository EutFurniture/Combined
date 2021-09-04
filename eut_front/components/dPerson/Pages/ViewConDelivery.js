import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useParams ,Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';

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

const styles = {
    updatebtn:{
    backgroundColor: '#04B404',
    width: '200px',
    textDecoration: 'none',
    height: '100px',
    marginRight: '5px',
    fontSize: '17px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    color: 'white',
    borderRadius: '7px',
  }  
}

export default function ViewConDelivery(userData) {
 
  const [user,setUser]=useState([])
  const { employee_id } = useParams();
   useEffect(() => {
   
    const fetchData = async () => {

      const response = await Axios.get('http://localhost:3001/viewConfirmDelivery', {
            params: {
             employee_id:userData.userData.employee_id
           }
        });
     
        setUser(response.data[0]);
      
      
    }
  fetchData();
  }, [employee_id]);





    return(
      <div ><br/>
                <div className='box-main'>
                           
                </div>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Order Status</th>
             <th scope='col'>Action</th>
          </tr>
        </thead> 
     
       <tbody className="tablebody">
       {user.map((record)=>{
                       return(
              <tr>
              <th scope="row">{record.order_id}</th>
              <td>{record.status}</td>
              
              <td align="center">
              <Link style={styles.updatebtn} to={location=> `/employee/UpdateConDeliveryRoute/${record.order_id}`}>Click to Confirm </Link>
              
                  
              </td>
            </tr>
          )
        })}

             
          
        </tbody> 
      </Table>
    
   </div>
    );
      }

    