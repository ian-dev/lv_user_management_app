import { useEffect, useState } from 'react';
import { TextField, 
  Checkbox, 
  Button,
  Grid 
} from '@material-ui/core';

import {  
  Radio, 
  RadioGroup, 
  FormGroup, 
  FormControlLabel, 
  FormLabel, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle 
} from '@mui/material';

function ModalWindow({ isOpen, setOpen, userIndex, usersList, setUsersList }) {
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [isNewUser, setIsNewUser] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [radioValue, setRadioValue] = useState('other');
  const [isChecked, setIsChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    { id: '', 
    name: '', 
    email: '', 
    gender: '', 
    status: '' }
    );  
  
  ///
  ///      
  // check if userIndex is null, if true it is a new user
  useEffect(() => {
    if (!userIndex) {
      setIsNewUser(true);
    } else {
      setIsNewUser(false);
    }
  }, [userIndex]);

  // if is not a new user set currentUser to userList[userIndex]
  useEffect(() => {
    if (!isNewUser) {
      setCurrentUser({...usersList[userIndex]});
    }
  }, [isNewUser, usersList, userIndex])
  
  ///
  ///
  // Close window handler
  const handleClose = () => setOpen(false);

  // Return updated array of objects
  const handleSubmit = (e) => {
    e.preventDefault();
    //
    const data = [...usersList];
    // 
    if (isNewUser) {
      // add currentUser to beginning of array
      currentUser.id = usersList[0].id + 1;
      data.unshift(currentUser);
      setUpdatedUsers([...data]);
    } else {
      // update currentUser at index
      data[userIndex] = currentUser;
      setUpdatedUsers([...data]);
    }

    setUsersList([...data])

    setCurrentUser({});
    handleClose();
  }

  console.log(updatedUsers);

  return (
    <Dialog open={isOpen} 
            onClose={handleClose} 
            fullWidth={true}
            maxWidth={'sm'}
            >
      <DialogTitle>{isNewUser ? 'CREATE' : 'EDIT'} USER</DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit}>
          <FormGroup>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <TextField 
                  id="filled-basic" 
                  label="NAME" 
                  variant="filled"
                  size="small"
                  fullWidth={true}
                  value={isNewUser ? nameValue : currentUser.name || ''}
                  onChange={e => {
                    setNameValue(e.target.value);
                    setCurrentUser({ ...currentUser, name: e.target.value })}
                  }
                />
              </Grid>
              <Grid item>
                <TextField 
                  id="filled-basic" 
                  label="EMAIL"
                  variant="filled"
                  size="small"
                  fullWidth={true}
                  value={isNewUser ? emailValue : currentUser.email || ''}
                  onChange={e => {
                    setEmailValue(e.target.value);
                    setCurrentUser({ ...currentUser, email: e.target.value })
                    }
                  }
                />
              </Grid>
              <Grid item>
                <FormLabel>Gender</FormLabel>        
                <RadioGroup
                  value={isNewUser ? radioValue : currentUser.gender || 'other'}
                  onChange={e => {
                    setRadioValue(e.target.value);
                    setCurrentUser({...currentUser, gender: e.target.value})
                    }
                  }
                >
                  <FormControlLabel value='male' control={<Radio />} label='Male'/>
                  <FormControlLabel value='female' control={<Radio />} label='Female'/>
                  <FormControlLabel value='other' control={<Radio />} label='Other'/>
                </RadioGroup>
              </Grid>
              <Grid item>
                <FormControlLabel 
                  control={<Checkbox />}
                  label='Active user' 
                  checked={
                    isNewUser ? isChecked : 
                    currentUser.status === 'active' ? true : false || false
                  }
                  onChange={e => {
                    setIsChecked(e.target.checked);
                    let userStatus = '';

                    if (!isChecked) {
                      userStatus = 'active';
                    } else {
                      userStatus = 'inactive';
                    }

                    setCurrentUser({ ...currentUser, status: userStatus })
                  }
                }
                />
              </Grid>
            </Grid>
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleSubmit}
        >
          {currentUser === null ? 'CREATE' : 'UPDATE'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

//console.log(`ModalWindow > current user index is ${userIndex}`, `new user > ${isNewUser}`);  
//console.log(currentUser);

export default ModalWindow;
