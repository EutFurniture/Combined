import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
import ReturnItemChart from '../../charts/ReturnItemChart';
const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  const useStyles = makeStyles((theme) => ({


  }))
  
class ReturnItem extends React.Component {

   
    

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/ReturnItemReport')
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
        <table style={{backgroundColor:'#f2f3f4'}} className="table">
          <thead>
              <tr>
                <th>Return ID</th>
               
                <th >Product Name</th>
                  <th >Return Date</th>
                  <th>Reason</th>
                  <th>Reschedule Date</th>
                  <th>Status</th>
                
                  
              </tr>
          </thead>
          <tbody>
          {this.state.records.map((record)=>{
                   return(
              <tr>
                <td>{record.return_id}</td>
                <td>{record.product_name}</td>
                <td>{dateOnly(record.return_date)}</td>
                <td>{record.reason}</td>
                <td>{dateOnly(record.reschedule_date)}</td>
                <td>{record.return_status}</td>
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Return Item Details</caption>
        </table>
        </div>

        <div style={{width:'280px',marginLeft:'40px',marginTop:'1px'}}>
        <ReturnItemChart/>

            </div>   
        </div>    
      );
    }
  }

  export default ReturnItem;