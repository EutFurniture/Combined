// import "react-vis/dist/style.css"
// import {XYPlot, LineSeries, XAxis,YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis'

// const Chart = () =>{
    
//     const data=[
//         {x:0,y:8},
//         {x:1,y:5},
//         {x:2,y:4},
//         {x:3,y:1},
//         {x:4,y:7},
//         {x:5,y:6},
//         {x:6,y:3},
//         {x:7,y:2},
//         {x:8,y:9},
//         {x:9,y:0},

//     ]

//     return(
//        <div style={{marginTop: '15px'}}>
//            <XYPlot height={300} width={500}>
//                <VerticalGridLines />
//                <HorizontalGridLines />
//                <XAxis />
//                <YAxis />
//                <LineSeries data={data} color="red" />
//                <LineSeries data={data} color="purple" />
//                <LineSeries data={data} color="yellow" />

//            </XYPlot>

//        </div>
//     )
// }

// export default Chart

import "./chart.css";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function Chart({title,orderdata,dataKey,grid}){
 
  
    return(
        <div style={{backgroundColor:'#f0ffff'}} className="chart">
            <h2 align='left' className="chartTitle"><b>{title}</b></h2>
            <ResponsiveContainer width="100%" aspect={3 / 1}>
                <LineChart data={orderdata}>
                    <XAxis dataKey="month" strokeWidth="3px" stroke="#ffb347"/>
                    <Line type="monotone" dataKey={dataKey} stroke="#ffb347"  strokeWidth="3px"/>
                    <Tooltip />
                    {grid && <CartesianGrid  strokeWidth="2px" strokeDasharray="5 5"/>}
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}