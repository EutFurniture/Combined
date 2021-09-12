import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';

 function ViewProductDeliver() {

  const [productList,setProductList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/viewproductFordeliver").then((response)=>{
      setProductList(response.data)
    })
  },[])     

  return (
        <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}  direction="row"  >
        <div>
                     
                
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
             <th scope="col">Product ID</th>
             <th scope="col">Product Name</th>
             <th scope="col">Image</th>
            </tr>
        </thead> 
     
       <tbody className="tablebody">
       {productList.map(item=>
                <tr >
                <td align="center">{item.product_id}</td>
                <td align="center">{item.product_name}</td>
                <td align="center"><img src={item.product_img} className='image'/></td>
                
</tr>
 )}
  </tbody> 
      </Table>
          </div>
        </Grid>

      </Grid>

  );
}

export default ViewProductDeliver;
 