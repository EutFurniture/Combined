import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button';
import { StatusOrderModel } from './StatusOrderModel';
import { GlobalStyle } from './GlobalStyle';

import Axios from 'axios';

function StatusOrderPU(){
    const [showModel, setShowModel] = useState(false)
    
    const openModel = () => {
        setShowModel(prev => !prev)
    }
    const [status, setStatus] = useState("");
    const [statusList, setStatusList] = useState([]);


    const getStatus = () => {
        Axios.get('http://localhost:3001/customers').then((response) => {
        setStatusList(response.data);
    });
  };

    return(
        <>
        <Container>
            <Button variant="primary" onClick={openModel}>
                Status
            </Button>
            <StatusOrderModel showModel={showModel} setShowModel={setShowModel}/>
            <GlobalStyle />


        </Container>
        </>
    )
}

export default StatusOrderPU;