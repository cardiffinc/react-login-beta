import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import artwork from '../../staticAssets/login-artwork.jpg'
import facebook from '../../staticAssets/facebook.png'
import instagram from '../../staticAssets/instagram.png'
import linkedin from '../../staticAssets/linkedin.png'
import twitter from '../../staticAssets/twitter.png'
import { Avatar, Button, Checkbox, Divider, FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    leftDiv: {
        margin: '5em',
    },
    rightDiv: {
        border: 'none',
        height: '100vh',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundImage: `url(${artwork})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    socialGrid: {
        marginTop: 10,
        marginBottom: 10
    },
    inputWrapper: {
        marginLeft: '5em',
        marginRight: '5em'
    },
    authInput: {
        marginTop: 15,
    },
    checkFormControlLabel: {
        marginTop: 25,
        margin: '0 5em',
        width: 'fit-content',
        display: 'block'
    },
    checkbox: {
        paddingLeft: 0
    },
    authButton: {
        marginTop: 25,
        marginLeft: '5em',
        marginRight: '5em',
        width: '-webkit-fill-available',
        textTransform: 'none',
        color: '#fff'
    },
    divider: {
        marginTop: 25,
        marginBottom: 25,
    },
    heading: {
        color: '#ff4747'
    }
  }));

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [error, setError] = useState(null);
    document.title = 'SJoshuaDarth\'s Template | Login';

    const checkUserExists = user => {
        return email === user.email;
    }

    const handleLogin = event => {
        event.preventDefault();
        var userExists = [];
        try {
            const users = JSON.parse(localStorage.getItem('darthUsers'));
            userExists = users.filter(checkUserExists);
            history.push('/');
        } catch(error){
            console.log(error)
        }
        if(userExists.length > 0){
                if( userExists[0].password === password){
                    localStorage.setItem('currentDarthUser', JSON.stringify(userExists[0]));
                    history.push('/');
                } else setError('Password is incorrect. Please try again!')
        } else setError('No such user found. Please signup!')
    }

    useEffect(() => {
        setError(null);
        if(email !== '' && password !== ''){
            setDisableButton(false)
        } else setDisableButton(true)
    }, [email, password])

    const configEmailInput = {
        id:"email-input", 
        label:"Email",
        type: "email"
    }

    const configPasswordInput = {
        id:"password-input",
        label:"Password",
        type: "password"
    }
    return (
        <div className={classes.root}>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <div className={classes.leftDiv}>
                        <h1 className={classes.heading}>
                            Welcome Back!
                        </h1>
                        <span>Sign in using your socials</span>
                        <Grid container justify="center" className={classes.socialGrid} spacing={2}>
                            <Grid item xs={1}>
                                <Avatar alt="Facebook" src={facebook} />
                            </Grid>
                            <Grid item xs={1}>
                                <Avatar alt="Instagram" src={instagram} />
                            </Grid>
                            <Grid item xs={1}>
                                <Avatar alt="LinkedIn" src={linkedin} />
                            </Grid>
                            <Grid item xs={1}>
                                <Avatar alt="Twitter" src={twitter} />
                            </Grid>
                        </Grid>
                        <span>or use your email and password</span>
                        
                        <form onSubmit={handleLogin}>
                            <div className={classes.inputWrapper}>
                                <TextInput {...configEmailInput } handleChange={event=>setEmail(event.target.value)}/>
                                <TextInput {...configPasswordInput } handleChange={event=>setPassword(event.target.value)}/>
                            </div>
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        name="checkedB"
                                        color="secondary"
                                        className={classes.checkbox}
                                    />
                                    }
                                    label="Keep me logged in"
                                    className={classes.checkFormControlLabel}
                            />
                            <Button id="signin-button" variant="contained" size="large" color="secondary" className={classes.authButton} type="submit" disabled={disableButton}>
                                Sign In
                            </Button>
                            {error && 
                            <p>{error}
                            </p>}
                        </form>
                        <Divider className={classes.divider} />
                        <div>
                            Don't have an account? <Link to='/signup' style={{color: "#ff4747"}}>Sign Up!</Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.rightDiv}>
                        
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login
