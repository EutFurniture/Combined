import React ,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Form,Col,Row} from 'react-bootstrap';
import axios from "axios";
import {Link} from 'react-router-dom'

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

const styles = {
  editbtn:{
  backgroundColor: '#ffbb33',
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
okbtn:{
  backgroundColor: '#007E33',
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
}

export default function ViewPrioritize()
{
  const [PrioritizeList,setPrioritizeList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/getPriority').then((response)=>{
        setPrioritizeList(response.data)
      })
    },[])
  
    const [Priority_number,setPriority_number] = useState();
    
    const Priority = (order_id) =>{
      axios.put('http://localhost:3001/AssignPriority', {
        order_id:order_id,
        Priority_number:Priority_number
      }).then(
        (response) => {
          alert("Priority Assigned Successfully");
        }
      )
    }
     return(
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Status</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">Last Date</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>

             <tbody>
                 {PrioritizeList.map((record)=>{
                   return(
                  <tr>
                    <th scope="row">{record.employee_id}</th>
                    <td>{record.o_status}</td>
                    <td>{record.order_id}</td>
                    <td>{dateOnly(record.order_last_date)}</td>
                    <td>{record.o_priority === 0 ?
                    <div>
                    <Form >
                        <Form.Group as={Row} controlId="formHorizontalPriority">
                        <Col sm={10}>
                            <Form.Control type="number" placeholder="Priority Number" 
                            onChange={(event) => {
                              setPriority_number(event.target.value);
                            }} required/>
                        </Col>
                        </Form.Group><br/>
                    </Form></div> : record.o_priority}
                    </td>
                    <td>
                      <Link style={styles.okbtn} onClick={() => {Priority(record.order_id)}} > OK </Link>
                      <Link style={styles.editbtn} to={location=> `/EditPrioritizeOrdersRoute/${record.order_id}`} > Edit </Link>
                    </td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
          
     )
 
 }