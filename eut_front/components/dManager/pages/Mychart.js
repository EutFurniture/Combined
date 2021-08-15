import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
      
export default function Mychart() 
{
        const [statusList,setstatusList]=useState([]);
            useEffect(()=>{
              axios.get('http://localhost:3001/orderstatuscount').then((response)=>{
                setstatusList(response.data);
                console.log(response);
              })
            },[])

        
        const orders=statusList.map(record=>record.count);
        const status=statusList.map(record=>record.o_status);

        return (

            <div id="chart">
                <h5 style={{marginLeft:'80px'}} >Delivery Status</h5>
            <Chart 
            options={{
                chart: {
                    width: 380,
                    type: 'pie',
                  },
                  labels: status,
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
        series={orders}
            
            type="pie"
            width={500}
             />
          </div>
            
        )
      }
      
      