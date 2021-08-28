import React, {useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

function GenerateReport() {

  const [orderList,setorderList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/delivervsorder').then((response)=>{
      setorderList(response.data);
      console.log(response);
    })
  },[])

  const orders=orderList.map(record=>record.count);
  const deliver=orderList.map(record=>record.e_name);

    return (
        <div className="app">
        <div className="row">
          <div className="mixed-chart">
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
                  data: orders
                }
              ]}
              type="bar"
              width="500"
              height="350"
            />
          </div>
        </div>
      </div>
    )
}

export default GenerateReport;

