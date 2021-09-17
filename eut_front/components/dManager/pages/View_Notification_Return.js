import React ,{ useState, useEffect } from 'react';
import {Card} from 'react-bootstrap';
import {Form, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  
const styles = {
   confirmbtn:{
        backgroundColor: '#007E33',
        width: '200px',
        textDecoration: 'none',
        height: '100px',
        marginRight: '10px',
        fontSize: '17px',
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: 'white',
        borderRadius: '7px',
      },
}

function View_Notification_Return() {

    const [returnList,setreturnList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/viewreturnNotification").then((response)=>{
      setreturnList(response.data)
    })
  },[])


    return (
        <div>
            {returnList.map((val, key) => {
                    return (
                        <div>
                        <Card border="primary" >
                            <Form style={{marginLeft:'30px'}}>
                            <Form.Group as={Row} controlId="formHorizontalName">
                            <Form.Label column lg={2} >
                            Order Id  :
                            </Form.Label>
                            <Col >
                            <Form.Label column lg={2} >
                            {val.order_id}
                            </Form.Label>
                            </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Customer :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.fname}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Customer NIC  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.nic}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Payment Method  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.payment_method}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Payment Status  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.payment_status}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Bill Image  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                <img style={{height:'400px' , width:'300px'}} src={`/${val.Bill_image}`} />
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Delivery Date :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {dateOnly(val.order_last_date)}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>
                            

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Employee Id :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.employee_id}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>
                            
                            
                            
                            <div align='right'>
                                
                                <Link style={styles.confirmbtn} to={location=> `/UpdateReturnItemRoute/${val.order_id}`} >Confirm</Link>
                                
                            </div>
                            <br></br>

                        </Form>
  
                        </Card>
                        <br></br><br></br>
                        </div>
            
            )
        })}
            
            
        </div>
    )
}

export default View_Notification_Return;
