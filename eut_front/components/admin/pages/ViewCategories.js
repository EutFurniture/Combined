import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import '../css/popupmodel.css'
import React, { useState, useEffect } from "react";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from "axios";
import "../css/manageEmployee.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';

export default function Categories() {

  const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  
  const [searchTerm,setSearchTerm]=useState("");
  const [categoryList,setCategoryList]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:3001/loadCategory").then((response)=>{
     setCategoryList(response.data)
   })
 },[])

  const [name,setName] = useState("");
  const [date,setDate] = useState("");

  const addCategory = ()=>{
    console.log(name);
     axios.post('http://localhost:3001/AddCategory',{
       name:name,
      date:date,
       
  
      }).then(()=>{
       alert('Category added successfully')
       window.location.href='/Categories'
       });
  };

  const [addc, setAdd] = useState(false);

  const toggleAdd = () => {
    setAdd(!addc);
  };

  if(addc) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  if(edit) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const deleteCategory =(category_id)=>{
   
    axios.delete(`http://localhost:3001/deleteCategory/${category_id}`).then(()=>{
      alert('Category deleted successfully')
      });
  }

    return(
      <div ><br/>
                <div className='box-main'><br/><br/>
                <div className="searchbar">
                   <input type="text"  placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value);}} />
                   <SearchIcon  className='searchicon'/>
                </div>
                <Link className="Addbtn" to="/admin/pages/AddCategory"><AddCircleIcon style={{marginTop:'0px'}}/> Add New</Link>
               
                </div><br/>
        <Table striped bordered hover responsive>
        <thead className="tableheading">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope='col'>Added Date</th>
            <th align="center">Action</th>
            
          </tr>
        </thead>
       <tbody className="tablebody">
       {categoryList.filter(val=>{if(searchTerm===""){
                       return val;
                     }else if(
                       val.name.toLowerCase().includes(searchTerm.toLowerCase())) 
                     {
                       return val
                     }
                    }).map((record)=>{
                       return(
              <tr>
              <th scope="row">{record.category_id}</th>
              <td>{record.name}</td>
              <td>{dateOnly(record.date)}</td>
              <td align="center">
                
                <Link to={location=> `/Category/${record.category_id}`} className="updatebtn" >  Edit </Link>
               
              
                  
              </td>
            </tr>
          )
        })}

             
          
        </tbody> 
      </Table>
      {addc && (
        <div className="modal">
          <div onClick={toggleAdd} className="overlay"></div>
          <div className="modal-content">
            <h6>ADD CATEGORY HERE</h6>
            <label>Category Name</label><br/>
            <input type="text" placeholder='Enter Category Name'  className='categoryInput' onChange={(event)=>{setName(event.target.value);}} required /><br/><br/>
            <label>Date</label><br/>
            <input type="Date" placeholder='Enter Date' className='categoryInput' onChange={(event)=>{setDate(event.target.value);}} required /><br/>
            <button type="submit" size='md' className='addbtn' onClick={addCategory}> ADD</button>
            <button className="close-modal" onClick={toggleAdd}>
            <HighlightOffIcon/>
            </button>
          </div>
        </div>
      )}
     
     {edit && (
        <div className="modal">
          <div onClick={toggleAdd} className="overlay"></div>
          <div className="modal-content">
            <h2>UPDATE CATEGORY HERE</h2>
            <label>Category Name</label><br/>
            <input type="text" placeholder='Enter Category Name'  className='categoryInput' required /><br/><br/>
            <label>Date</label><br/>
            <input type="Date" placeholder='Enter Date' className='categoryInput' required /><br/><br/>
            <button type="submit" size='md' className='addbtn' > Update</button>
            <button className="close-modal" onClick={toggleEdit}>
            <HighlightOffIcon/>
            </button>
          </div>
        </div>
      )}
      </div>
    )
}