import "../css/manageEmployee.css";
import { Link } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import sofa1 from '../../../assets/sofa1.jpg'
import sofa3 from '../../../assets/sofa3.jpg'
import table1 from '../../../assets/table1.jpg'
import table2 from '../../../assets/table2.jpg'
import dining1 from '../../../assets/dining1.jpg'
import dining2 from '../../../assets/dining2.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';


export default function ViewProducts() {
  
    return(
      <div ><br/>
      <div className='box-main'>
      <div className="searchbar">
         <input type="text"  placeholder="Search"/>
         <SearchIcon  className='searchicon'/>
      </div>
      <Link  to='/admin/pages/AddProductForm' className="Addbtn"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
     
      </div><br/>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Image</th>
            <th scope='col'>Material</th>
            <th scope='col'>Category</th>
            <th >Action</th>
            
          </tr>
        </thead>
       <tbody className="tablebody">
           
              <tr>
              <th scope="row">1</th>
              <td>Sofa</td>
              <td>Rs.25,000.00</td>
              <td><img src={sofa1} className='image' alt='/sofa'/><img src={sofa3} className='image' alt='sofa1'/></td>
              <td>Fabric</td>
              <td>Sofa</td>
              <td align="center">
              <Link to='/admin/pages/ProductInfo'  className="viewbtn" >View</Link>
                <Link to='/admin/pages/EditProducts'
                  className="updatebtn "
                 >
                  Edit
                </Link>
                <Link 
                  className="deletebtn"
                 >
                  Delete
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Martine table</td>
              <td>Rs.10,000.00</td>
              <td><img src={table1} className='image' alt='/table'/><img src={table2} className='image' alt='/table2' /></td>
              <td>Wood</td>
              <td>Table</td>
              <td align="center">
              <Link to='/ProductInfo'  className="viewbtn " >View</Link>
                <Link to='/EditProducts'
                  className="updatebtn "
                 >
                  Edit
                </Link>
               
              </td>
            </tr>

            <tr>
              <th scope="row">3</th>
              <td>Dining</td>
              <td>Rs.30,000.00</td>
              <td><img src={dining1} className='image' alt='/sofa'/><img src={dining2} className='image' alt='dining'/></td>
              <td>Wood,Iron</td>
              <td>Dining set</td>
              <td align="center">
              <Link to='/ProductInfo'  className="viewbtn " >View</Link>
                <Link to='/EditProducts'
                  className="updatebtn "
                 >
                  Edit
                </Link>
                <Link 
                  className="deletebtn"
                 >
                  Delete
                </Link>
              </td>
            </tr>
            
           

          
            
          
        </tbody> 
      </Table>
      </div>
    )
}