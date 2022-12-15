import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import './App.css';


const API = 'https://happyhourserver.herokuapp.com'
// const API = ''

function App() {
  const [eventsState, setEventsState] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault()

    if (!e.target.nameInput.value) {
      console.log("missing Name input")
      setInputError(true);
      return;
    }
    
    axios.post(`${API}/api/event/addPerson`, {id: selectedEvent._id, name: e.target.nameInput.value })
    .then((res) => {
      console.log(res);
      setInputError(false);
      loadData();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const onRemovePersonClick = (name) => {
    axios.post(`${API}/api/event/removePerson`, {id: selectedEvent._id, name: name })
    .then((res) => {
      console.log(res);
      loadData();
    })
    .catch((error) => {
      console.log(error);
    });  }

  function loadData() {
    axios.get(`${API}/api/events`)
    .then((data) => {
      setEventsState(data.data.events)
      setSelectedEvent(data.data.events[0])
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <Container maxWidth="sm">
        {/* <Stack spacing={2}>
          {eventsState?.map((i, k) => {
            return (
              <Button variant="contained" key={k}>{i.title}</Button>
              )
          })}
        </Stack> */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {selectedEvent?.title}
            </Typography>
            <Typography variant="h5" component="div">
              {selectedEvent?.location}
            </Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedEvent?.description}
            </Typography> */}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedEvent?.date}, {selectedEvent?.time}
            </Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedEvent?.time}
            </Typography> */}

            <List dense={true}>
              {selectedEvent?.people?.map((i,k) => {
                return (
                  <ListItem
                    key={k}
                    secondaryAction={
                      <IconButton value={i.name} edge="end" onClick={() => onRemovePersonClick(i.name)} aria-label="delete">
                        <DeleteIcon/>
                      </IconButton>
                    }
                  >
                    <ListItemText primary={i.name} secondary="" />
                  </ListItem>
                )
              })}
            </List>

          </CardContent>
          <CardActions>
            <form onSubmit={onSubmit} id="gameForm">
              <TextField id="nameInput" label="Name" variant="outlined" error={inputError} />
              <Button type="submit" size="small">Add</Button>
            </form>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default App;
