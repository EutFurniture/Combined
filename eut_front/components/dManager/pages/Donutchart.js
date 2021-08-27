import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

function Donutchart() {

  const [paymentList,setpaymentList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/paymentdonut').then((response)=>{
      setpaymentList(response.data);
      console.log(response);
    })
  },[])


const count=paymentList.map(record=>record.count);
const status=paymentList.map(record=>record.payment_status);

  return (
    <div id="chart">
      <h5 style={{marginLeft:'80px'}} >Monthly Cash On Delivery Payment Status</h5>
    <Chart 
    options={{
      chart: {
      type: 'donut',
    },
    labels: status,
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
    series={count} 
      
    
    type="donut"
    width="500" />
  </div>
  )
}

export default Donutchart;