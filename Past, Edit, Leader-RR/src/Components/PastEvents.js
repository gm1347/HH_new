import React, {useEffect, useState} from 'react';
import {Grid, Box, AppBar, Toolbar, IconButton, Card, CardContent, Button, Typography, Tooltip, makeStyles} from '@material-ui/core';
import logo from './HH-logo.jpg';
import icon from './HH-icon.ico';
import wkndevnt1 from './img1.jpg';
//import wkndevnt2 from './img2.jpg';
import moment from 'moment';
import axios from 'axios';

const useStyles = makeStyles({
    card:{
        backgroundColor:"#D6EAF8",
        '&:hover':{
            backgroundColor:"#EBF5FB",
        }
    },
    button:{
        color:"primary",
        '&:hover':{
            backgroundColor:"#2471A3",
        },
        marginTop:"8px"
    }
    });

const PastEvents = (props) => {
    const gridStyle={margin:'3px auto', padding:'5px auto'}
    const headStyle = {margin:'0', fontFamily:'sans-serif', color:'#8A2BE2'}
    const btnStyle = {margin:'8px 0'}
    const logoStyle = {height:98, width:128}
    const iconStyle = {height:45, width:45}
    //const imgStyle = {height:'100px', width:'180px'}
    //const stepperStyle = {}


    /*const handleChange = () => {
        props.history.push('/home)')
    }*/

    const [pevent, setPevent] = useState([])
    const event = "Past event"
    useEffect(() => {
        axios.get('http://localhost:8081/account/events/getEventsList/false/Weekend event')
        //('http://localhost:8081/account/events/getEvents/'.concat('/isFutureEvent').concat('past'))
        //(`http://localhost:8081/account/events/getEventsList/isFutureEvent${past}/eventTypes${event}`)
        .then(response => {
            console.log(response)
            console.log(response.data[0].event_id)
            setPevent(response.data)
        })
        .catch(error => {
            if(error.response.status===400 || error.response.status===401) {
                console.log(error.response.data.message)
            }
            else {
                console.log("Oop! Something went wrong")
            }
        })
    },[event])

    const classes = useStyles();

    return(
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton align='center' edge="end" className={classes.homeButton} color="inherit" aria-label="Home">
                        <img src={icon} style={iconStyle} alt='HH' />
                    </IconButton>
                    <Typography>
                        <b>Helping Hands</b>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box align="center">
                <br />
                <Typography variant='h4' style={headStyle}>
                    <b>Past Events</b>
                </Typography>
            </Box>

            <Box m={5}>
                <Grid container spacing={6}>
                    {pevent.map((post)=>(
                        <Grid item xs={12} sm={6} md={6}>
                            <Card style={{minwidth:200}} className={classes.card}>
                                <CardContent>
                                    <Grid container spacing={5}>
                                        <Grid item xs={6} style={gridStyle}>
                                            <Tooltip title={post.name}>
                                                <img src={wkndevnt1} height='100%' width='100%' alt="Old Age Home" />
                                            </Tooltip>
                                        </Grid>

                                        <Grid item xs={6} style={gridStyle}>
                                            <Typography style={{textTransform: "uppercase"}} align="center">
                                                <b>{post.name}</b>
                                            </Typography>

                                            <p align="left">
                                                
                                                <b>Venue:</b> {post.venue}
                                                <br />
                                                <b>Date:</b> {moment(post.start_time).format('MMMM Do YYYY')}
                                                <br />
                                                <b>Start Time:</b> {moment(post.start_time).format('h:mm a')}
                                                <br />
                                                <b>End Time:</b> {moment(post.end_time).format('h:mm a')}
                                                <br />
                                                <b>Description:</b> {post.description}
                                                <br />
                                            </p>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <br></br>
                <br></br>
                <Grid align="right">
                    <Button style={btnStyle} color='primary' variant='contained'>Go To Home Page</Button>
                </Grid>
            </Box>
        </Box>
    )
}

export default PastEvents;
