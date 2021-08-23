import React, {useEffect, useState} from 'react';
import {Grid, Box, AppBar, Toolbar, Typography, IconButton, Paper, Card, CardContent, Avatar, Checkbox, Button, makeStyles, FormGroup, FormControlLabel} from '@material-ui/core';
import {ArrowBack, Home, Menu, SettingsInputComponent } from '@material-ui/icons';
import {Field } from 'formik';
import logo from './HH-logo.jpg';
import icon from './HH-icon.ico';
import axios from 'axios';

const LeaderRR = () => {
    const paperStyle = {padding:'5px 25px', height:'auto', width:'auto', margin:'10px 20px', border:' black'}
    const gridStyle = {margin:'3px auto', padding:'5px auto'}
    const headStyle = {margin:'0', fontFamily:'sans-serif', color:'#8A2BE2'}
    const btnStyle = {margin:'8px 0'}
    const logoStyle = {height:98, width:128}
    const iconStyle = {height:45, width:45}
    const formStyle = {textAlign:'center'}

    const [eventRR, setEventRR] = useState([])
    const event = "Past event RR"
    useEffect(() => {
        let postOne = "http://localhost:8081/account/events/getEventsList/false/Weekend event"
        axios.get(postOne)
        //('http://localhost:8081/account/events/getEvents/'.concat('/isFutureEvent').concat('past'))
        //(`http://localhost:8081/account/events/getEventsList/isFutureEvent${past}/eventTypes${event}`)
        .then(responseOne => {
            console.log(responseOne)
            console.log(responseOne.data[0].event_id)
            setEventRR(responseOne.data)
        })
        .catch(errorOne => {
            if(errorOne.response.status===400 || errorOne.response.status===401) {
                console.log(errorOne.response.data.message)
            }
            else {
                console.log("Oop! Something went wrong")
            }
        })
    },[event])

    const [participant, setParticipant] = useState([])
    const partuser = "Participated Users"
    useEffect(() => {
        let postTwo = "http://localhost:8081/events/getAllParticipants/{id}"
        axios.get(postTwo)
        
        .then(responseTwo => {
            console.log(responseTwo)
            console.log(responseTwo.data[0].event_id)
            setEventRR(responseTwo.data)
        })
        .catch(errorTwo => {
            if(errorTwo.response.status===400 || errorTwo.response.status===401) {
                console.log(errorTwo.response.data.message)
            }
            else {
                console.log("Oop! Something went wrong")
            }
        })
    },[partuser])

    const onSubmit = () => {
        axios.post('https://localhost:8081/accounts/events/ ', )
        .then(response => {
            console,log(response.status)
            if(res === 200) {
                setSuccess(true);
                setMsg("Team Member(s) Nominated!");
                setOpen(true);
            }
        })
        .catch((error) => {
            if(error.response.status === 400) {
                console.log(error.response.data.message);
                setOpen(true);
                setMsg(error.response.data.message);
            }
            else {
                setOpen(true);
                setMsg("Oops! Something went wrong");
            }
            console.log(error)
        });
    }

    const handleClose = (event, reason) => {
        if(success) {
            setOpen(false);

        }
        else {
            setOpen(false);
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        paper: {
            
            '&:hover':{
                backgroundColor:"#D6EAF8",
            }
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        homeButton: {
            marginRight: theme.spacing(5),
        },
        button:{
            color:"primary",
            '&:hover':{
                backgroundColor:"#2471A3",
            },
            marginTop:"8px"
        }
    }));

    const classes = useStyles();

    return (
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

        <Grid style={gridStyle} align='center'>
            
            
                <Grid align='center'>
                    <br />
                    <Typography variant='h4' style={headStyle}>
                        <b>Rewards &amp; Recognition</b>
                    </Typography>
                </Grid>
                
                {eventRR.map((postOne)=>(
                

                    <Paper style={paperStyle} elevation={15} className={classes.paper}>
                                
                    <p align="left">
                        <Typography style={{textTransform: "uppercase"}} variant='h6' align="center">
                            <b>{postOne.name}</b>
                        </Typography>
                        <br />
                        <b> Participant(s): </b>
                        
                        <div className={classes.root}>
                            <Card >
                                {participant.map((postTwo)=>(
                                    <CardContent>
                                    <Avatar src="/broken-image.jpg" className={classes.large} />
                                    <Typography>
                                        {postTwo.user_user_id} 
                                    </Typography>
                                </CardContent>
                                ))}
                                
                                <Checkbox color='primary' inputProps = {{'aria-label': 'uncontrolled-checkbox'}} />
                            </Card>

                            <Card>
                                <CardContent>
                                    <Avatar src="/broken-image.jpg" className={classes.large} />
                                    
                                    <Typography>
                                        Participant2
                                    </Typography>
                                </CardContent>
                                <Checkbox color='primary' inputProps = {{'aria-label': 'uncontrolled-checkbox'}} />
                            </Card>
                            
                            <Card>
                                <CardContent>
                                    <Avatar src="/broken-image.jpg" className={classes.large} />
                                    <Typography>
                                        Participant3
                                    </Typography>
                                </CardContent>
                                <Checkbox color='primary' inputProps = {{'aria-label': 'uncontrolled-checkbox'}} />
                            </Card>
                        </div>                    
                    </p>
                    <Button style={btnStyle} type='submit' color='primary' variant="contained">Nominate</Button>
                
            
        </Paper>
                ))}
                
                            
                            

                        
            
        
    </Grid>

    </Box>

    )
}

export default LeaderRR;
