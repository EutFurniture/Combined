import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button';
import { ViewOrderModel } from './ViewOrderModel';
import { GlobalStyle } from './GlobalStyle';

function ViewOrderPU(){
    const [showModel, setShowModel] = useState(false)
    
    const openModel = () => {
        setShowModel(prev => !prev)
    }

    return(
        <>
        <Container>
            <Button variant="success" onClick={openModel}>
                View
            </Button>
            <ViewOrderModel showModel={showModel} setShowModel={setShowModel}/>
            <GlobalStyle />


        </Container>
        </>
    )
}

export default ViewOrderPU;