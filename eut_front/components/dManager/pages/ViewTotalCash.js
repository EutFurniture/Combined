import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth =  months[d.getMonth() ];
let currentYear = d.getFullYear();

class ViewTotalCash extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/totalcashOnDelivery')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result,

        });
      });
      
  }
  
    render(){
        
    
     return(
        <div>
        <React.Fragment>
            <Title>Total Cash On Delivery</Title>
                <Typography component="p" variant="h4">
                <div>
                 {this.state.records.map((record)=>{
                   return(
                       <h2>Rs {record.total - record.advance}.00</h2>
                   )
                 })}
                </div>
                </Typography>
                <Typography color="textSecondary" flex = "1" >
                {currentMonth} {currentYear}
                     
                </Typography>
                <div style={{marginTop: 60 }}>
                    <Link color="primary" href="/dManager/pages/ManageCashOnDelivery">

                        View balance
                    </Link>
                </div>
        </React.Fragment>
        </div>   
     )

    }
}

export default ViewTotalCash;
