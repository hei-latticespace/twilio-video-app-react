import React, { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef } from 'react';

import { Typography, makeStyles, TextField, Grid, Button, InputLabel, Theme } from '@material-ui/core';
import { useAppState } from '../../../state';

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1.5em 0 3.5em',
    '& div:not(:last-child)': {
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.5em 0 2em',
    },
  },
  textFieldContainer: {
    width: '100%',
  },
  continueButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

interface RoomNameScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({ name, roomName, setName, setRoomName, handleSubmit }: RoomNameScreenProps) {
  const classes = useStyles();
  const { user } = useAppState();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
    console.log(event.target.value);
  };

  const hasUsername = !window.location.search.includes('customIdentity=true') && user?.displayName;

  let form = useRef(null);
  useEffect(() => {
    //console.clear();
    //console.log('------ use effect -------');
    //console.log(form.current);
    //form.current.submit();

    const query = new URLSearchParams(window.location.search);
    //console.log('Room Name Screen ....');
    //console.log("Storage Room Name : " + window.sessionStorage.getItem('roomname'));
    //console.log("Storage User Name : " + window.sessionStorage.getItem('username'));

    name = window.sessionStorage.getItem('username') as string;
    if (name != '') setName(name);
    roomName = window.sessionStorage.getItem('roomname') as string;
    if (roomName != '') setRoomName(roomName);

    if (name != '' && roomName != '') {
      //console.log('DO FORM SUBMIT...');
      //document.forms[0].submit();
      //document.forms[0].elements["continue-button"].click();
      //document.forms[0].elements[4].click();
      //let element: HTMLElement = document.getElementById('continue-button')[0] as HTMLElement;
      //element.click();
      let element: HTMLElement = document.getElementById('continue-button') as HTMLElement;
      //console.log(element);
      setTimeout(() => {
        //console.log('Click');
        element.click();
      }, 300);
    }
  }, [form]);

  const disabled = true;

  return (
    <>
      <Typography variant="h5" className={classes.gutterBottom} style={{ display: 'none' }}>
        Join a Room
      </Typography>
      <Typography variant="body1" style={{ display: 'none' }}>
        {hasUsername
          ? "Enter the name of a room you'd like to join."
          : "Enter your name and the name of a room you'd like to join"}
      </Typography>
      <form ref={form} onSubmit={handleSubmit} style={{ display: 'none' }}>
        <div className={classes.inputContainer}>
          {!hasUsername && (
            <div className={classes.textFieldContainer}>
              <InputLabel shrink htmlFor="input-user-name">
                Your Name
              </InputLabel>
              <TextField
                id="input-user-name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={handleNameChange}
                disabled={disabled}
              />
            </div>
          )}
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-name">
              Room Name
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-name"
              variant="outlined"
              fullWidth
              size="small"
              value={roomName}
              onChange={handleRoomNameChange}
              disabled={disabled}
            />
          </div>
        </div>
        <Grid container justifyContent="flex-end">
          <Button
            id="continue-button"
            variant="contained"
            type="submit"
            color="primary"
            disabled={!name || !roomName}
            className={classes.continueButton}
          >
            Continue
          </Button>
        </Grid>
      </form>
    </>
  );
}
