import React, {useState, useEffect, useReducer, Fragment } from 'react';
//import { useHistory } from 'react-router-dom';
import {Grid, Paper, Box, Button, Card, CardContent, NativeSelect, MenuItem, InputLabel, FormControl, FormHelperText, Typography, TextField, AppBar, IconButton, Toolbar, Snackbar, makeStyles} from '@material-ui/core';
import {ArrowBack, Home, Menu , CloseIcon } from '@material-ui/icons';
import {Formik, Form, Field, ErrorMesage} from 'formik';
//import logo from './HH-logo.jpg';
import icon from './HH-icon.ico';
import 'date-fns';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
//import Dropdown from 'react-dropdown';
import moment from 'moment';
import axios from 'axios';


const EditEvents = (props, {handleChange}) => {
    const paperStyle = {padding:'10px 25px', height:'auto', width:'auto', margin:'20px 25px', border:' black'}
    const gridStyle = {margin:'auto auto', padding:'auto auto'}
    const headStyle = {margin:'0', fontFamily:'sans-serif', color:'#8A2BE2'}
    const btnStyle = {margin:'15px 15px'}
    const logoStyle = {height:98, width:128}
    const iconStyle = {height:45, width:45}
    const formStyle = {width:'100%'}

    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const [wevent, setWevent] = useReducer([])
    const event = "Weekend event"
    const future=true
    useEffect(() => {
        axios.get('http://localhost:8081/account/events/getEventsList/true/Weekend event')
        //('http://localhost:8081/account/events/getEvents/'.concat('/isFutureEvent').concat('event'))
        //(`http://localhost:8081/account/events/getEventsList/isFutureEvent${future}/eventTypes${event}`)
        .then(response => {
            console.log(response)
            console.log(response.data[0].event_id)
            setWevent(response.data)
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

    const [selectedDate, setSelectedDate] = React.useState();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // let history = useHistory();
    const onSubmit = async (e) => {
        e.preventDefault();
        const event = {
            event_name,
            venue,
            description,
            start_date,
            start_time,
            end_date,
            end_time
        };

        console.log(event)
        //let sdate={post.start_time}
        //let startDate={moment(sdate).format('MMM dd yyyy')}
        
        axios.post(`http://localhost:8081/accounts/events/getEventsList/isFutureEvent${future}/eventType${event}`)
        .then((response) => {
            var res = response.status
            //console.log(response)
            console.log(response.status)
            if(res === 200) {
                setSuccess(true);
                setMsg("Changes Saved");
                setOpen(true);
            }
        })
        .catch((error) => {
            if(error.response.status === 400 || error.response.status === 401) {
                console.log(error.response.data.message)
                setOpen(true);
                setMsg(error.response.data.message);
            }
            else{
                setOpen(true);
                setMsg("Oops! Something went wrong");
            }
            console.log(error)
        });
    };

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
        homeButton: {
            marginRight: theme.spacing(2),
        },
        backButton: {
            marginLeft: theme.spacing(1),
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
        <Box >
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton align='center' edge="start" className={classes.homeButton} color="inherit" aria-label="Home">
                        <img src={icon} style={iconStyle} alt='HH' />
                    </IconButton>
                    <Typography>
                        <b>Helping Hands</b>
                    </Typography>
                </Toolbar>
            </AppBar>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid style={gridStyle} >
                    <Paper style={paperStyle} elevation={2}>
                        <Grid item xs={12} align='center'>
                            <br />
                            <Typography variant='h4' style={headStyle}>
                                <b>Edit Events</b>
                            </Typography>
                            <br /><br />
                        </Grid>

                        <FormControl style={formStyle} variant="outlined" align="center">
                            <InputLabel>Event Type</InputLabel>
                            <NativeSelect label="Event Type" >
                                <option align-items='center' value="" />
                                <option value="weekendevent">Weekend Event</option>
                                <option disabled value="webinarforngo">Webinars for NGO</option>
                                <option disabled value="artsandcraft">Arts &amp; Craft</option>
                                <option disabled value="foodforthought">Food for Thought</option>
                            </NativeSelect>
                            <FormHelperText>Find event by type</FormHelperText>
                            <br />
                        </FormControl>

                        <Grid container spacing={4}>
                            {wevent.map((post)=>(
                                <Grid item xs={12} >
                                    <Card style={{minwidth:200}} className={classes.card}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid style={gridStyle}>
                                                    <Formik>
                                                        {(props) => (
                                                            <Form >
                                                                <p align="left">
                                                                    <TextField fullWidth label="Event ID" value={post.event_id} inputProps={{readOnly: true,}} />
                                                                    <br /><br />
                                                                    <Field as={TextField} fullWidth label="Event Name" name="event_name" value={post.name} required 
                                                                        onChange = {(e) =>
                                                                            setWevent({
                                                                                type: 'field',
                                                                                fieldName: 'event_name',
                                                                                payload: e.currentTarget.value,
                                                                            })
                                                                        } 
                                                                    />
                                                                    <br /><br />
                                                                    <Field as={TextField} fullWidth label="Venue" name="venue" value={post.venue} required 
                                                                        onChange = {(e) => 
                                                                            setWevent({
                                                                                type: 'field',
                                                                                fieldName: 'venue',
                                                                                payload: e.currentTarget.value,
                                                                            })
                                                                        } 
                                                                    />
                                                                    <br /><br />
                                                                    <TextField
                                                                        id="standard-multiline-static"
                                                                        label="Description"
                                                                        name="description"
                                                                        multiline
                                                                        fullWidth
                                                                        maxRows={4}
                                                                        defaultValue={post.description}
                                                                        required
                                                                        onChange = {(e) =>
                                                                            setWevent({
                                                                                type: 'field',
                                                                                fieldName: 'description',
                                                                                payload: e.currentTarget.value,
                                                                            })
                                                                        }
                                                                    />
                                                                </p>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </Grid>
                                                 
                                                <Grid style={gridStyle}>
                                                    <Formik>
                                                        {(props) => (
                                                            <Form >
                                                                <p align="left">                                             
                                                                    <DatePickerComponent
                                                                        disablePast
                                                                        
                                                                        format="MMM dd yyyy"
                                                                    
                                                                        fullWidth
                                                                        
                                                                        label="Start Date"
                                                                        value={moment(post.start_time)}
                                                                        required
                                                                        onChange = {(e) => {
                                                                            console.log(e.target.value)
                                                                            setWevent({
                                                                                type: 'field',
                                                                                fieldName: 'start_date',
                                                                                payload: e.target.value,
                                                                            })
                                                                        } } >

                                                                    </DatePickerComponent>
                                                                    <br /><br />
                                                                    <Field as={TextField} fullWidth label="Start Time" name="starttime" value={moment(post.start_time).format('h:mm a')} required 
                                                                        onChange = {(e) => 
                                                                            setWevent({
                                                                                type: 'field',
                                                                                fieldName: 'start_time',
                                                                                payload: e.currentTarget.value,
                                                                            })} />
                                                                    <br /><br />
                                                                    <TextField
                                                                        
                                                                        disablePast
                                                                        
                                                                        format="MMM dd yyyy"
                                                                        margin="normal"
                                                                        fullWidth
                                                                        id="date"
                                                                        label="End Date"
                                                                        type="date"
                                                                        value={moment(post.end_time)}
                                                                        required
                                                                        onChange={handleDateChange}
                                                                        inputLabelProps ={{
                                                                            shrink: true,
                                                                        }}
                                                                    />
                                                                    <br /><br />
                                                                    <Field as={TextField} fullWidth label="End Time" name="endtime" value={moment(post.end_time).format('h:mm a')} required 
                                                                        onChange = {(e) => 
                                                                            setWevent({
                                                                                type: 'field',
                                                                                fieldName: 'end_time',
                                                                                payload: e.currentTarget.value,
                                                                            })} />
                                                                    <br />
                                                                </p>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </Grid>
                                            </Grid>
                                        </CardContent>

                                        <Button type='submit' style={btnStyle} color='primary' align='right' variant='contained' onChange={onSubmit}>
                                            Save Changes
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>

                    <Snackbar 
                        className = {classes.root}
                        anchorOrigin = {{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open = {open}
                        autoHideDuration = {8000}
                        onClose = {handleClose}
                        message={msg}
                        action = {
                            <Fragment>
                                <IconButton size="small" aria-label="Close" color="inherit" onClick={handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Fragment>
                        }
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </Box>
    )
}

export default EditEvents;
