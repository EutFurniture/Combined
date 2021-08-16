import React ,{useState} from 'react';
import { Component } from 'react';

class View extends Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoaded: false,
    };
  }

  componentDidMount()  {
    fetch('http://localhost:3001/loadProduct')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
         list: result
        });
      });
  }


 
   
  render(){
    const { list } = this.state;
      return (
       
        <ul>
          {list.map(item => (
            <li key={item.product_id}>
              <img src={item.product_img} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      );
    }
  
  }

export default View