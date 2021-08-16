import "../css/manageEmployee.css";
import { Link } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import chair from '../../../assets/chair.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";


export default function ViewGifts() {
  const [searchTerm,setSearchTerm]=useState("");
  const [giftList,setGiftList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/loadGift").then((response)=>{
      setGiftList(response.data)
    })
  },[])
  
    return(
      <div ><br/>
      <div className='box-main'>
      <div className="searchbar">
         <input type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}}/>
         <SearchIcon  className='searchicon'/>
      </div>
      <Link  to='/admin/pages/AddGift' className="Addbtn"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
     
      </div><br/><br/>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Gift Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Image</th>
            <th scope='col'>Quantity</th>
            <th >Action</th>
            
          </tr>
        </thead>
       <tbody className="tablebody">
       {giftList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
              <tr  align='center'>
              <th scope="row">{record.ID}</th>
              <td>{record.name}</td>
              <td>{record.price}</td>
              <td><img src={record.gift_img} className='image' alt='/gift'/></td>
              <td>{record.quantity}</td>
              <td align="center">
              <Link to={location=> `/Gift/${record.ID}`}  className="viewbtn" >View</Link>
                <Link to={location=> `/GiftEdit/${record.ID}`}  className="updatebtn"> Edit</Link>
                <Link 
                  className="deletebtn"
                 >
                  Delete
                </Link>
              </td>
            </tr>    
           )
          })}
        </tbody> 
      </Table>
      </div>
    )
}