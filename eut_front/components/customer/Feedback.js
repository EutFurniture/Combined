import React, { useState } from "react";
import { FaStar } from 'react-icons/fa'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from "react";
import Footer from "./Footer";
import Blog from './blog/Blog';
import axios from "axios";
import {  useParams } from "react-router-dom";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9"
}

const useStyles = makeStyles((theme) => ({
    hed: {

        textAlign: "center",
        color: 'white',
    },
    first: {

        width: "50%",
        backgroundColor: "rgb(103, 103, 104)",
        alignItems: "center",
        marginLeft: "25%",
        marginTop: "70px",
        marginBottom: "10%",
    }
}))
const labels = {

    1: 'Useless+',

    2: 'Poor+',

    3: 'Ok',

    4: 'Good',

    5: 'Excellent',
};

const Feedback = (userData) => {
    const classes = useStyles();
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHovervalue] = useState(undefined);
    const [discript, setDiscript] = useState("");
    const { customer_id } = useParams();
    const handleClick = value => {
        setCurrentValue(value)
    };

    const handleMouseOver = value => {
        setHovervalue(value)
    }
    const handleMouseLeave = () => {
        setHovervalue(undefined)
    }



    const submit = () => {

        axios.get('http://localhost:3001/feedback', {
            currentValue: currentValue,
            discript: discript,
            params:{
            customer_id: userData.userData.customer_id,
            }

        }

        );
        alert("successfully submitted.")
        console.log(discript);
        console.log(currentValue);


    }


    return (
        <Fragment>

            <div style={styles.container
            } className={classes.first}>
                <h2 className={classes.hed}>Customer feedback</h2>
                <div styles={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                            <FaStar key={index}
                                size={30}
                                style={{
                                    marginRight: 30,
                                    cursor: "pointer"
                                }}

                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                            />

                        )
                    })}
                    {currentValue !== null && <Box ml={2}>{labels[hoverValue !== -1 ? hoverValue : currentValue]}</Box>}
                </div>
                <textarea placeholder="What is your feedback"
                    style={styles.textarea} className={classes.text} onChange={(event) => setDiscript(event.target.value)} />
                <button style={styles.button} onClick={() => submit()} >Submit</button>
            </div>
<Footer />
        </Fragment>
    );
};
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25px"

    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: "40%",
        padding: "20px 10px",
        margin: "30px 0",
        minHeight: 100,
        color: "black"

    },
    star: {
        marginTop: "30px"
    },

    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 200,
        padding: 10,
        marginBottom: "15px"


    }
}

export default Feedback;