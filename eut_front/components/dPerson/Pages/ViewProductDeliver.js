import React, { Component } from 'react'  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import axios from 'axios';  
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


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


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export class ViewProductDeliver extends Component {  
  constructor(props) {  

    super(props);
    this.state = {  
    ProductData: []     
    }  
  }  
  componentDidMount() {  
    axios.get('http://localhost:3001/viewproductFordeliver').then(response => {  
      console.log(response.data);  
      this.setState({  
        ProductData: response.data  
      });  
    });  
  }  



  render() { 
    
 
 
    console.log(this.state.ProductData);  
    return (  
      <TableContainer component={Paper}>  
        <Table stickyHeader  aria-label="sticky table" striped bordered hover responsive>  
          <TableHead >  
            <TableRow>  
              
              <StyledTableCell align="center">Product ID</StyledTableCell>  
              <StyledTableCell align="center">Product Name</StyledTableCell> 
              <StyledTableCell align="center">Image</StyledTableCell>
       
            </TableRow>  
          </TableHead>  
          <TableBody>  
            {  
              this.state.ProductData.map((record, index) => {  
                return <TableRow key={index}>  
                  <TableCell align="center" component="th" scope="row">{record.product_id}</TableCell>  
                  <TableCell align="center">{record.product_name}</TableCell>  
                  <TableCell align="center"><img src={record.product_img} className='image'/></TableCell>  
                 
                  <TableCell align="center">
 
                  </TableCell>
                </TableRow>  
              })  

            }  
          </TableBody>  
        </Table>  

     </TableContainer>  
    );  
  }  
}  

export default ViewProductDeliver; 
