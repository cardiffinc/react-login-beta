import { InputLabel, makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: 10
    }, authInput: {
        marginTop: 5,
    }
  }));

function StyledTextInput({handleChange, id, label, type}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <InputLabel shrink htmlFor={id}>
          {label}
        </InputLabel>
        <TextField 
            id={id} 
            type={type}
            variant="outlined" 
            fullWidth 
            color='secondary'
            className={classes.authInput} 
            onChange={handleChange}/>
        </div>
    )
}

export default StyledTextInput
