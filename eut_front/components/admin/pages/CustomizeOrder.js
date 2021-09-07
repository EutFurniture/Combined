// import React from 'react';
// import ReactToPrint from 'react-to-print';
// import CustomerData from './CustomerData';


// import DataComponent from './DataComponent';

// class CustomizedOrder extends React.Component {
    
//     render() {
//       return (
//         <div>
//           <h2 style={{color:'indigo',marginBottom:'1px'}}>Click here to Download the Report</h2>
//           <ReactToPrint
//             content={() => this.componentRef}
//             trigger={() => <button className="btn btn-success" style={{align:'left',marginLeft:'10px',marginBottom:'20px'}}>Download to PDF!</button>}
//           /><br/>
         
//           <DataComponent ref={(response) => (this.componentRef = response)}  />
          
//         </div>
//       );
//     }

// }

// export default CustomizedOrder;

import React from 'react';
import ReactToPrint from 'react-to-print';




import DataComponent from './DataComponent';
export default function CustomizeOrder({componentRef}) {
    
      return (
        <div>
          <h2 style={{color:'indigo',marginBottom:'1px'}}>Click here to Download the Report</h2>
          <ReactToPrint
           content={() =>componentRef}
            trigger={() => <button className="btn btn-success" style={{align:'left',marginLeft:'10px',marginBottom:'20px'}}>Download to PDF!</button>}
          /><br/>
         
          <DataComponent  ref={(response) => (componentRef = response)} />
          
        </div>
      );
    }



