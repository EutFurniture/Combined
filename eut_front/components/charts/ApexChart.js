import React, { useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

function ApexChart() {

  const [orderanalyze,setOrderAnalyze]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/OrderAnalyze").then((response)=>{
      setOrderAnalyze(response.data)
    })
  },[])

  const arr=orderanalyze.map(record=>record.month);
const cat=orderanalyze.map(record=>record.count);

  return (
      <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <ReactApexChart
            options={{
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: arr
              }
            }}
            series={[
              {
                name: "No of orders",
                data:cat
              }
            ]}
            type="line"
            width="550"
          />
        </div>
      </div>
    </div>
  )
}

export default ApexChart;