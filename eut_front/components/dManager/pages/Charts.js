import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

function Charts() {

  const [priceList,setpriceList]=useState([]);
            useEffect(()=>{
              axios.get('http://localhost:3001/pricevsdate').then((response)=>{
                setpriceList(response.data);
                console.log(response);
              })
            },[])

        
        const total=priceList.map(record=>record.total);
        const date=priceList.map(record=>dateOnly(record.order_last_date));

  return (
      <div className="app">
      <div className="row">
        <div className="mixed-chart">
        <h5 style={{marginLeft:'20px'}} >Delivery</h5>
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
                name: "Total Price",
                data: total
              }
            ]}
            type="line"
            width="100%"
            height="160"
          />
        </div>
      </div>
    </div>
  )
}

export default Charts;