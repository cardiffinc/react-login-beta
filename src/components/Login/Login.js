import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import artwork from '../../staticAssets/login-artwork.jpg'
import GoogleSignIn from '../../staticAssets/google_signin.png'
import { Button, Checkbox, Divider, FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextField';
import './styles.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    leftDiv: {
        border: 'none',
        height: '100vh',
        backgroundImage: `url(${artwork})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    rightDiv: {
        textAlign: 'left',
        marginLeft: '5em',
        marginRight: '10em'
    },
    formInputContentHolder:{
        marginTop: 25,
        marginBottom: 25
    },
    authInput: {
        marginTop: 15,
    },
    loginSubOptions: {
        marginTop: 25,
    },
    checkFormControlLabel: {
        margin: 0,
        width: 'fit-content',
        display: 'inline-block'
    },
    checkbox: {
        paddingLeft: 0
    },
    authButton: {
        marginTop: 25,
        width: '-webkit-fill-available',
        textTransform: 'none',
        color: '#fff',
        backgroundColor: '#f8f8f8'
    },
    divider: {
        marginTop: 25,
        marginBottom: 25,
    },
    heading: {
        color: '#010013'
    },
    forgotPassword: {
        textAlign: 'end',
        color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    googleSignIn:{
        margin: '0 auto',
        width: 'fit-content',
    },
    googleImage:{
        height:  50
    },
    leftInnerSquare: {
        height: '60vh',
        width: '40%',
        margin: '0 auto',
        top: '20vh',
        left: '5vw',
        position: 'fixed',
        borderRadius: 2,
        backdropFilter: 'blur(5px)',
        backgroundColor: '#ffffff26',
    },
    artTextHolder: {
        margin: '5em'
    },
    artSubtitleHolder: {
        marginTop: 25
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
        } catch (error) {
            console.log(error)
        }
        if (userExists.length > 0) {
            if (userExists[0].password === password) {
                localStorage.setItem('currentDarthUser', JSON.stringify(userExists[0]));
                history.push('/');
            } else setError('Password is incorrect. Please try again!')
        } else setError('No such user found. Please signup!')
    }

    useEffect(() => {
        setError(null);
        if (email !== '' && password !== '') {
            setDisableButton(false)
        } else setDisableButton(true)
    }, [email, password])

    const configEmailInput = {
        id: "email-input",
        label: "Email",
        type: "email"
    }

    const configPasswordInput = {
        id: "password-input",
        label: "Password",
        type: "password"
    }
    return (
        <div className={classes.root}>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <div className={classes.leftDiv}>
                        <div className={classes.leftInnerSquare}>
                            <div className={classes.artTextHolder}>
                                <span className="art-text">Digital</span>
                                <span className="art-text">Platform</span>
                                <span className="art-text">for distance</span>
                                <span className="art-text">learning.</span>
                                <div className={classes.artSubtitleHolder}>
                                    <span className="art-subtitle">You will never know everything.</span>
                                    <span className="art-subtitle">But you will know more.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.rightDiv}>
                        <h1 className={classes.heading}>
                            Hey, hello 👋
                        </h1>
                        <span>Enter the information you entered while registering.</span>

                        <form onSubmit={handleLogin}>
                            <div className={classes.formInputContentHolder}>
                                <TextInput {...configEmailInput} handleChange={event => setEmail(event.target.value)} />
                                <TextInput {...configPasswordInput} handleChange={event => setPassword(event.target.value)} />
                                <Grid container alignItems="center">
                                <Grid item xs={6}>
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
                                </Grid>
                                <Grid item xs={6} className={classes.forgotPassword}>
                                    <span className='text-gradient'>Forgot Password?</span>
                                </Grid>
                            </Grid>
                            </div>
                            
                            <Button 
                                id="signin-button" 
                                variant="contained" 
                                size="large" 
                                color="secondary" 
                                className={classes.authButton} 
                                type="submit" disabled={disableButton}>
                                Sign In
                            </Button>
                            {error &&
                                <p>{error}
                                </p>}
                        </form>
                        <Divider className={classes.divider} />
                        <div className={classes.googleSignIn}>
                            <img src={GoogleSignIn} className={classes.googleImage}></img>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login
