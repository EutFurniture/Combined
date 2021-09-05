import "../../../css/manageCustom.css";
import { Link, Switch } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router,  Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';




export default function CustomView() {
  const [searchTerm,setSearchTerm]=useState("");
  const [employeeList,setEmployeeList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/sales_load").then((response)=>{
     setEmployeeList(response.data)
   })
 },[])

 const deleteCustomer =(customer_id)=>{
  axios.delete(`http://localhost:3001/sales_deleteCustomer/${customer_id}`);
}

const viewEmployee =(customer_id)=>{
  console.log(customer_id);
  axios.get(`http://localhost:3001/sales_view/${customer_id}`);
  if(customer_id){
    window.location.href='/sManager/pages/CustomInfo'
  }
}

const updateEmployeeDetails = (customer_id) => {
  axios.put("http://localhost:3001/sales_updateEmployee", {fname: newName,  customer_id: customer_id}).then(
    (response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.customer_id === customer_id ? {customer_id: val.customer_id, fname: val.name} : val
      }))
   }
  );
};




 const [newName,setNewName]=useState("");

const updateEmployee =(customer_id)=>{
  console.log(customer_id);
  axios.put(`http://localhost:3001/sales_update/${customer_id}`);

 
};

const UpdateName=(customer_id)=>{
  console.log(customer_id)
  
  axios.put("http://localhost:3001/sales_updateEmployee",{
    customer_id:customer_id,
    fname:newName,
  });
  setNewName("")
}

const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  return(
 
              <div ><br/>
                <div className='box-main'>
                <div className="searchbar">
                   <input type="text" onChange={(e)=>{setSearchTerm(e.target.value);}} placeholder="Search"/>
                   <SearchIcon  className='searchicon'/>
                </div>
                <Link  to='/sManager/pages/AddEmployeeForm' className="Addbtn"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
               
                </div><br/>
               
                <Table striped bordered hover responsive>
                  <thead className="tableheading">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Address</th>
                      <th scope="col">Points</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody className="tablebody">
                     {employeeList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.fname.toLowerCase().includes(searchTerm.toLowerCase()) || val.email.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
                        <tr>
                        <th scope="row">{record.customer_id}</th>
                        <td>{record.fname}</td>
                        <td>{record.phone}</td>
                        <td>{record.email}</td>
                        <td>{record.address}</td>
                        <td>{record.points}</td>
                        <td align="center">
                          {/* <Link  onClick={()=>{viewEmployee(record.id)}} onClick={toggleModal} className="btn1 btn-primary " >
                            View
                          </Link> */}
                           {/*
                           <Link to={location=> `/Employee/${record.customer_id}`} className="viewbtn " >
                            View
                          </Link>
                          */}
                          <Link to={location=> `/CustomEdit/${record.customer_id}`} className="updatebtn ">
                            Edit
                          </Link>
                          {/*
                          <Link onClick={()=>{deleteCustomer(record.customer_id)}} className="deletebtn">
                            Delete
                          </Link>*/}
                        </td>
                      </tr>
                       )

                     
                     })}
                             
                  </tbody> 
                </Table>  
              </div>
           
  )
}