import React ,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Form,Row,Col,Alert} from 'react-bootstrap';
import axios from "axios";
import { Link } from 'react-router-dom';

const styles = {
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

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function ViewReturnItem()
{
  const [ReturnList,setReturnList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/viewReturn').then((response)=>{
        setReturnList(response.data)
        
      })
    },[])
  
    const [Schedule_date,setSchedule_date] = useState();
    
    const Schedule = (order_id) =>{
      axios.put('http://localhost:3001/ReturnSchedule', {
        order_id:order_id,
        Schedule_date:Schedule_date
      }).then(
        (response) => {
          alert("Scheduled Successfully");
        }
      )
    }
     return(  
  
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">OrderId</th>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Return Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Reschedule</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                 {ReturnList.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.employee_id}</td>
                    <td>{dateOnly(record.return_date)}</td>
                    <td>{record.reason}</td>
                    <td>{record.reschedule_date === "0000-00-00" ?
                        <Form >
                        <Form.Group as={Row} controlId="formHorizontaldate">
                        <Col sm={10}>
                            <Form.Control type="date" 
                            onChange={(event) => {
                              setSchedule_date(event.target.value)
                            }}/>
                        </Col>
                        </Form.Group><br/>
                        </Form> : dateOnly(record.reschedule_date) }
                    </td>
                    <td>{record.return_status === "Returned" ? <Alert variant="danger">Not completed</Alert> : record.return_status }</td>
                    <td>
                      <Link style={styles.okbtn} onClick={() => {Schedule(record.order_id)}} > Reschedule </Link>
                      <Link style={styles.updatebtn} to={location=> `/UpdateReturnItemRoute/${record.order_id}`} >  Update </Link>
                    </td>
                    
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
    }

