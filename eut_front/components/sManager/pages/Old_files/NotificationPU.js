import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button';
import { NotificationModel } from './NotificationModel';
import { GlobalStyle } from './GlobalStyle';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

function NotificationPU(){
    const [showModel, setShowModel] = useState(false)
    
    const openModel = () => {
        setShowModel(prev => !prev)
    }

    return(
        <>
        <Container>
        <Badge badgeContent={4} color="secondary">
            <NotificationsIcon onClick={openModel} />
           
            <NotificationModel showModel={showModel} setShowModel={setShowModel}/>
            <GlobalStyle />
        </Badge>


        </Container>
        </>
    )
}

export default NotificationPU;