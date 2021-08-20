import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button';
import { DetailOrderModel } from './DetailOrderModel';
import { GlobalStyle } from './GlobalStyle';

function DetailOrderPU(){
    const [showModel, setShowModel] = useState(false)
    
    const openModel = () => {
        setShowModel(prev => !prev)
    }

    return(
        <>
        <Container>
            <Button variant="warning" onClick={openModel}>
                Detail
            </Button>
            <DetailOrderModel showModel={showModel} setShowModel={setShowModel}/>
            <GlobalStyle />


        </Container>
        </>
    )
}

export default DetailOrderPU;