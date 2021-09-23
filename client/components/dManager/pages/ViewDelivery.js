import React,{ useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@material-ui/icons/Search';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

const styles = {
  viewbtn:{
  backgroundColor: '#33b5e5',
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
},

updatebtn:{
  backgroundColor: '#9933CC',
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
},

searchbar:{
  display: 'flex', 
  width: '1200px',
  height: '40px',
  boxShadow: '0px 0px 12px -5px rgba(0, 0, 0, 0.75)',
},

inputsearch:{
  border:'none',
  fontSize:'18px',
  paddingLeft:'20px',
<<<<<<< HEAD:client/components/dManager/pages/ViewDelivery.js
  width:'900px'
=======
>>>>>>> 508813daf1bd5269df379e79ba16c3cf8c9a28ad:eut_front/components/dManager/pages/ViewDelivery.js
},

icon:{
  marginTop:'7px',
  marginLeft:'930px',
  color:'grey',
},

}

export default function ViewDelivery(){
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryList,setDeliveryList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/delivery").then((response)=>{
      setDeliveryList(response.data)
    })
  },[])

  return(
    <div>

    <div style={styles.searchbar}>
<<<<<<< HEAD:client/components/dManager/pages/ViewDelivery.js
    <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search" style={styles.inputsearch} />
=======
    <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search" style={styles.inputsearch}/>
>>>>>>> 508813daf1bd5269df379e79ba16c3cf8c9a28ad:eut_front/components/dManager/pages/ViewDelivery.js
    <SearchIcon  className='searchicon' style={styles.icon}/>
    </div>
    <br></br>
    <Table striped bordered hover responsive>
      <thead >
        <tr>
          <th scope="col">OrderId</th>
          <th scope="col">Last Date</th>
          <th scope="col">Customer</th>
          {/*<th scope="col">Ship To</th>*/}
          <th scope="col">Payment Method</th>
          <th scope="col">Status</th>
          <th scope="col">DeliverId</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

     <tbody>
       {deliveryList.filter(val=>{if(searchTerm===""){
         return val;
       }
       else if(
         val.fname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.payment_method.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())  )
         {
           return val
         }
     }).map((record) => {
      return(
        <tr>
        <th scope="row">{record.order_id}</th>
        <td>{dateOnly(record.order_last_date)}</td>
        <td>{record.fname}</td>
        {/*<td>{record.c_address}</td>*/}
        <td>{record.payment_method}</td>
        <td>{record.status === "Completed" ? <Alert size = "small" variant="success">Completed</Alert> : record.status === "Returned" ? <Alert variant="danger">Returned</Alert> : record.status === "Pending" ? <Alert variant="secondary">Pending</Alert> : record.status === "R_Pending" ? <Alert variant="secondary">R_Pending</Alert> : record.status}</td>
        <td>{record.employee_id === 0 ? <Alert variant="warning">Not Assign</Alert> : record.employee_id}</td>
        
        <td>
            <Link style={styles.viewbtn} to={location=> `/DeliveryInfoRoute/${record.order_id}`}> View </Link>
            <Link style={styles.updatebtn} to={location=> `/UpdateDeliveryRoute/${record.order_id}`} >  Update </Link>
        </td>
      </tr>
       )
       })}
        
      </tbody> 
    </Table>
    </div>
  
)

}

  
