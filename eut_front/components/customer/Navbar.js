import React,{Component,useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import'./Navbar.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import Button from '@material-ui/core/Button';

 function Navbar (){

    const [button, setButton] = useState(true)
    const [click, setClick] = useState(false);    

    const [anchorEl, setAnchorEl] =useState(null);
  const [anchor, setAnchor] =useState(null);
  

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () =>setClick(false);
     
    const showButton = () => {
        if (window.innerWidth <= 960){
            setButton(false);
        } else {
            setButton(true);
        }
    };  
    
    useEffect(()=>{
        showButton()
    }, [])

   
   
    return(
       
        <nav className="navbar">
            
       <h1 className="navbar-log"> EUT Furniture Shop 
       </h1>
       <div className="menu-icon" onClick={handleClick}>
           <i className={click ? 'fas fa-items' :'fas fa-bars'} />
       </div>
       
        
            <ul className={click ? 'nav-menu active' :'nav-menu'}>
              <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                  </Link>
              </li>
              <li className='nav-item' >
              
                 
              <Link to='#' className='nav-links'  aria-controls="menu" aria-haspopup="true" onClick={handleOpenMenu}>
                  Product
                  
                  </Link>
                  <Menu  
                  style={{marginTop:'50px',
                   maxWidth:'130%',
                   
                }}
             id="menu"
             anchorEl={anchorEl}
             keepMounted
             open={Boolean(anchorEl)}
             onClose={handleMenuClose}
             >
            <MenuItem class="bckk" onClick={handleMenuClose}><Link to='/customer/productlist' className="pro"  onClick={closeMobileMenu}>Dining sets</Link></MenuItem>
            <MenuItem class="bckk" onClick={handleMenuClose}><Link className="pro" to='/product2' onClick={closeMobileMenu}>Sofa sets</Link></MenuItem>
            <MenuItem class="bckk" onClick={handleMenuClose}><Link className="pro" to='/product1' onClick={closeMobileMenu}>Tables</Link></MenuItem>
            <MenuItem class="bckk" onClick={handleMenuClose}><Link className="pro"to='/product2' onClick={closeMobileMenu}>Chairs</Link></MenuItem>
            
            </Menu>
                 
              </li>
              <li className='nav-item'>
                  <Link to='/customer/aboutl' className='nav-links' onClick={closeMobileMenu}>
                      About Us
                  </Link>
              </li>
              <li className = 'nav-item'>
                            <Link to='/customer/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                               
                               
                            </Link>
                        </li>
                    </ul>
                   
       
        </nav>
        
      
      
    );
}

export default Navbar







  
