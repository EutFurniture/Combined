import "../css/manageEmployee.css";
import { Link } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';


export default function Productview() {
    const [searchTerm,setSearchTerm]=useState("");
    const [productList,setProductList]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/loadProduct").then((response)=>{
        setProductList(response.data)
      })
    },[])

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    return(
      <div><br/>
      <div className='box-main'>
      <div className="searchbar">
                   <input type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}} />
                   <SearchIcon  className='searchicon'/>
                </div>
      <Link  to='/admin/pages/AddProductForm' className="Addbtn"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
     
      </div><br/>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
       
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope='col'>Image</th>
            <th scope='col'>Quantity</th>
            <th >Action</th>
            
          </tr>
        </thead>
       <tbody className="tablebody">
       {productList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.product_name.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
              <tr align='center'>
              <th scope="row">{record.product_id}</th>
              <td>{record.product_name}</td>
              <td>{record.price}</td>
              <td><img src={record.product_img} className='image'/></td>
              <td>{record.quantity}</td>
              <td align="center">
               <Link to={location=> `/Product/${record.product_id}`} className="viewbtn" >View</Link>
               <Link to={location=> `/ProductEdit/${record.product_id}`}  className="updatebtn"> Edit</Link>
              
              </td>
            </tr>
                       )
            })}
            
           

          
            
          
        </tbody> 
      </Table>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
      </div>
    )
}