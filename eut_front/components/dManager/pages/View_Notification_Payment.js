import React ,{ useState, useEffect } from 'react';
import {Card} from 'react-bootstrap';
import {Form, Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  
function View_Notification_Payment() {

    const [paymentList,setPaymentList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/viewpaymentNotification").then((response)=>{
      setPaymentList(response.data)
    })
  },[])


    return (
        <div>
            {paymentList.map((val, key) => {
                    return (
                        <div>
                        <Card border="success" >
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
                                {val.c_name}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Customer NIC  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.c_nic}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Bill Image  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                image
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Delivery Date:
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {dateOnly(val.order_last_date)}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>
                            

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Employee Id:
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.employee_id}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>
                            </Form>

                            <Card.Footer>
                            <div align='right'><Button variant='success'>Confirm</Button></div>
                            </Card.Footer>
                        </Card>
                        <br></br><br></br>
                        </div>
            
            )
        })}
            
            
        </div>
    )
}

export default View_Notification_Payment
