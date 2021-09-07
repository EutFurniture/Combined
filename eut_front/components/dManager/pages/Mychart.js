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

        
        const orders1=statusList.map(record=>record.count);
        const status1=statusList.map(record=>record.status);

        return (

            <div id="chart">
                
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
              />
          </div>
            
        )
      }
      
      