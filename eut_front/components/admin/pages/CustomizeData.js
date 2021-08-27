import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
import CustomizeChart from '../../charts/CustomizeChart';
const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  const useStyles = makeStyles((theme) => ({


  }))
  
class CustomizeData extends React.Component {

   
    

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/CustomizedReport')
          .then(res => res.json())
          .then(result => {
            this.setState({
              isLoaded: true,
              records: result,
    
            });
          });
          
      }

      

    render() {
      return (
          <div style={{display:'flex'}}>
              <div style={{width:'700px'}}>
        <table  className="table">
          <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th >Product Name</th>
                  <th >Image</th>
                
                  
              </tr>
          </thead>
          <tbody>
          {this.state.records.map((record)=>{
                   return(
              <tr>
                <td>{record.cus_product_id}</td>
                <td>{record.fname}</td>
                <td>{record.product_name}</td>
                <td><img src={record.design} className='image' alt='/product'/></td>
                
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Customize Order Details</caption>
        </table>
        </div>

        <div style={{width:'200px',marginLeft:'20px',marginTop:'50px'}}>
        <CustomizeChart/>

            </div>   
        </div>    
      );
    }
  }

  export default CustomizeData;