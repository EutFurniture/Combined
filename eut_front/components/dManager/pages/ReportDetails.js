import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { Table } from "react-bootstrap";
import {Button} from "@material-ui/core"
import {Form, Row, Col} from "react-bootstrap";
import Title from "./Title";

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  export default function ReportDetails() {

    const[to_date,setTodate]=useState("");
    const[from_date,setFromdate]=useState("");
    const [deliveryList,setDeliveryList]=useState([])
    const [statusList,setstatusList]=useState([]);
    const [orderList,setorderList]=useState([]);
    const [cashList,setcashList]=useState([])
    const [paymentList,setpaymentList]=useState([]);
    const [returnList,setreturnList]=useState([])
    const [totalList,settotalList]=useState([]);
    const [returnsList,setreturnsList]=useState([]);
    const [deliverList,setdeliverList]=useState([])
    const [ordersList,setordersList]=useState([]);

    const Delivery = async () => {
        const response = await axios.get('http://localhost:3001/deliveryReport', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setDeliveryList(response.data)

        const response1 = await axios.get('http://localhost:3001/orderstatuscount', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setstatusList(response1.data)

        const response2 = await axios.get('http://localhost:3001/ordervsdate', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setorderList(response2.data)

        const response3 = await axios.get('http://localhost:3001/CashOnDeliveryReport', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setcashList(response3.data)

        const response4 = await axios.get('http://localhost:3001/paymentdonut', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setpaymentList(response4.data)

        const response5 = await axios.get('http://localhost:3001/ReturnReport', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setreturnList(response5.data)

        const response6 = await axios.get('http://localhost:3001/totalordercnt', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        settotalList(response6.data)

        const response7 = await axios.get('http://localhost:3001/returnordercnt', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setreturnsList(response7.data)

        const response8 = await axios.get('http://localhost:3001/DeliverReport', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setdeliverList(response8.data)

        const response9 = await axios.get('http://localhost:3001/delivervsorder', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setordersList(response9.data)

    }

        const orders1=statusList.map(record=>record.count);
        const status1=statusList.map(record=>record.status);

        const orders2=orderList.map(record=>record.count);
        const date=orderList.map(record=>dateOnly(record.order_last_date));

        const count1=paymentList.map(record=>record.count);
        const status2=paymentList.map(record=>record.payment_status);

        const t_count=totalList.map(record=>record.t_count);
        const r_count=returnsList.map(record=>record.r_count);
        const returncount = (r_count/t_count) * 100

        const orders3=ordersList.map(record=>record.count);
        const deliver=ordersList.map(record=>record.name);

    return (
        <div>
                <h4 align = "center"><strong>Delivery Progress Report</strong></h4>
                <br></br><br></br>
                <Form>

                    <div style={{display:'flex' , justifyContent:'space-between', flexWrap:'nowrap'}}>
                        <div>
                        <Form.Group as={Row} controlId="formGridfromDate">
                        <Form.Label column lg={2}>
                            From Date
                        </Form.Label>
                        <Col>
                        <Form.Control type="date" onChange={(event)=> {setFromdate(event.target.value);}} />
                        </Col>
                        </Form.Group>
                        </div>

                        <div>
                        <Form.Group as={Row} controlId="formGridtoDate">
                        <Form.Label column lg={2}>
                            To Date
                        </Form.Label>
                        <Col>
                        <Form.Control type = "date" onChange={(event)=> {setTodate(event.target.value);}} />
                        </Col>   
                        </Form.Group> 
                        </div>

                                       
                                       
                        <div>
                        <Button variant="contained" color="primary" onClick={()=>{Delivery()}}>Click to View</Button>
                        </div>
                    </div>
                </Form>
                   
                <br></br>  
                    
               
                <Title>Delivery Details From {from_date} To {to_date}</Title>
                <Table striped bordered hover responsive>
                <thead >
                    <tr>
                    <th scope="col">OrderId</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Status</th>
                    <th scope="col">Shipping to</th>
                    <th scope="col">Delivery Date</th> 
                    
                    </tr>
                </thead>

                <tbody>
                {deliveryList.map((record)=>{
                return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.fname}</td>
                    <td>{record.status}</td>
                    <td>{record.address}</td>
                    <td>{dateOnly(record.order_last_date)}</td>   
                </tr>
                )
                })}
                    
                </tbody> 
                </Table><br></br>

                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                        <Chart
                            options={{
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                categories: date
                            }
                            }}
                            series={[
                            {
                                name: "Orders",
                                data: orders2
                            }
                            ]}
                            type="line"
                            width="100%"
                            height="350"
                        />
                        </div>
                    </div>
                </div><br></br><br></br>

                <Title>Cash On Delivery Payment Details From {from_date} To {to_date}</Title>
                <Table striped bordered hover responsive>
                <thead >
                    <tr>
                    <th scope="col">OrderId</th>
                    <th scope="col">Payable</th>
                    <th scope="col">Status</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Delivery Date</th>
                    </tr>
                </thead>

                <tbody>
                {cashList.map((record)=>{
                return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.total_price - record.advance_price }</td>
                    <td>{record.payment_status}</td>
                    <td>{record.fname}</td>
                    <td>{dateOnly(record.order_last_date)}</td>    
                </tr>
                )
                })}
                    
                </tbody> 
                </Table><br></br><br></br>

                
                <div style={{display:'flex' , flexWrap:'wrap',justifyContent:'space-between'}}>
                    <div id="chart">
                        <Title>Delivery Status From {from_date} To {to_date}</Title>
                        <Chart 
                            options={{
                            chart: {
                                width: 380,
                                type: 'pie',
                                },
                                labels: status1,
                                responsive: [{
                                breakpoint: 480,
                                options: {
                                    chart: {
                                    width: 200
                                    },
                                    legend: {
                                    position: 'bottom'
                                    }
                                }
                                }] }
                                }
                            series={orders1}
                        
                            type="pie"
                            width={500}
                            height={350}
                            />
                    </div>

                


                    <div id="chart">
                            <Title>Payment Status From {from_date} To {to_date}</Title>
                            <Chart 
                            options={{
                            chart: {
                            type: 'donut',
                            },
                            labels: status2,
                            responsive: [{
                            breakpoint: 480,
                            options: {
                                chart: {
                                width: 100
                                },
                                legend: {
                                position: 'bottom'
                                }
                            }
                            }]} }
                            series={count1} 
                            
                            
                            type="donut"
                            width="500" 
                            height="350"/>
                    </div>

                
                </div>

            <br></br><br></br>

            
            <div style={{display:'flex' , flexWrap:'wrap',justifyContent:'space-between'}}>
                <div>
                    <Title>Return Details From {from_date} To {to_date}</Title>
                    <Table striped bordered hover responsive style={{width:'500px'}}>
                    
                    <thead >
                        <tr>
                        <th scope="col">OrderId</th>
                        <th scope="col">Return Date</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                    {returnList.map((record)=>{
                    return(
                        <tr>
                        <th scope="row">{record.order_id}</th>
                        <td>{dateOnly(record.return_date) }</td>
                        <td>{record.reason}</td>
                        <td>{record.return_status}</td>
                        
                    </tr>
                    )
                    })}
                        
                    </tbody> 
                    </Table>

                </div>

                <div>
                    <Title>Deliver Details From {from_date} To {to_date}</Title>
                    <Table striped bordered hover responsive style={{width:'500px'}}>
                    <thead >
                        <tr>
                        <th scope="col">Deliver</th>
                        <th scope="col">Number of Orders</th>
                        </tr>
                    </thead>

                    <tbody>
                    {deliverList.map((record)=>{
                    return(
                        <tr>
                        <th scope="row">{record.name}</th>
                        <td>{record.count}</td>
                    </tr>
                    )
                    })}
                        
                    </tbody> 
                    </Table>
                </div>
            </div>    
            <br></br><br></br>

            <div style={{display:'flex' , flexWrap:'wrap',justifyContent:'space-between'}}>

                <div id="card">
                    <div id="chart">
                        <Title>Return Status From {from_date} To {to_date}</Title>
                        <Chart 
                        options={{ chart: {
                        height: 350,
                        type: 'radialBar',
                        toolbar: {
                            show: true
                        }
                        },
                        plotOptions: {
                        radialBar: {
                            startAngle: -135,
                            endAngle: 225,
                            hollow: {
                            margin: 0,
                            size: '70%',
                            background: '#fff',
                            image: undefined,
                            imageOffsetX: 0,
                            imageOffsetY: 0,
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24
                            }
                            },
                            track: {
                            background: '#fff',
                            strokeWidth: '67%',
                            margin: 0, // margin is in pixels
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.35
                            }
                            },
                        
                            dataLabels: {
                            show: true,
                            name: {
                                offsetY: -10,
                                show: true,
                                color: '#888',
                                fontSize: '17px'
                            },
                            value: {
                                formatter: function(val) {
                                return parseInt(val);
                                },
                                color: '#111',
                                fontSize: '36px',
                                show: true,
                            }
                            }
                        }
                        },
                        fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            shadeIntensity: 0.5,
                            gradientToColors: ['#ABE5A1'],
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100]
                        }
                        },
                        stroke: {
                        lineCap: 'round'
                        },
                        labels: ['Return Percentage'],
                        }} 
                        series={[returncount] } 
                        type="radialBar" 
                        height={350} 
                        width={500}
                        />
                    </div>
                </div>
            
            

                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Title>Deliver Status From {from_date} To {to_date}</Title>
                            <Chart
                            options={ {
                                chart: {
                                height: 350,
                                type: 'bar',
                                events: {
                                    click: function(chart, w, e) {
                                    }
                                }
                                },
                                
                                plotOptions: {
                                bar: {
                                    columnWidth: '45%',
                                    distributed: true,
                                }
                                },
                                dataLabels: {
                                enabled: false
                                },
                                legend: {
                                show: false
                                },
                                
                                xaxis: {
                                categories: deliver,
                                labels: {
                                    style: {
                                    
                                    fontSize: '12px'
                                    }
                                }
                                }
                            }}
                            series={[
                                {
                                name: "Orders",
                                data: orders3
                                }
                            ]}
                            type="bar"
                            width="500"
                            height="350"
                            />
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}

