import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import artwork from '../../staticAssets/login-artwork.jpg'
import EduParkLogo from '../../staticAssets/Edupark-Login-Logo-ali.png'
import { Avatar, Button, Checkbox, Divider, FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router';
import './styles.css'
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import StyledTextInput from '../StyledTextInput/StylesTextInput';

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
        marginBottom: 10
    },
    authInput: {
        marginTop: 15,
    },
    loginSubOptions: {
        marginTop: 25,
    },
    checkbox: {
        paddingLeft: 0,
    },
    authButton: {
        width: '-webkit-fill-available',
        textTransform: 'none',
        color: '#fff',
        background: 'linear-gradient(to right, #5da4fa, #529afd, #4c8fff, #4c83ff, #5276fe, #5c72fd, #656efc, #6e6afa, #7670fa, #7e75fb, #867bfb, #8d81fb)',
    },
    divider: {
        marginTop: 25,
        marginBottom: 25,
    },
    heading: {
        color: theme.palette.primary
    },
    forgotPassword: {
        textAlign: 'end',
        color: 'linear-gradient(to right, #5da4fa, #529afd, #4c8fff, #4c83ff, #5276fe, #5c72fd, #656efc, #6e6afa, #7670fa, #7e75fb, #867bfb, #8d81fb)'
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
    },
    error: {
        marginRight: '5em',
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
    document.title = 'SJoshuadarth\'s Template | Login';

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
                                <span className="art-text">▷ Digital</span>
                                <span className="art-text">Platform</span>
                                <span className="art-text">for distance</span>
                                <span className="art-text primary-theme-color">learning.</span>
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
                    <Avatar src={EduParkLogo} className={classes.large}/>
                        <h1 className={classes.heading}>
                            Hey, hello 👋
                        </h1>
                        <span>Enter the information you entered while registering.</span>

                        <form onSubmit={handleLogin}>
                            <div className={classes.formInputContentHolder}>
                                <StyledTextInput {...configEmailInput} handleChange={event => setEmail(event.target.value)} />
                                <StyledTextInput {...configPasswordInput} handleChange={event => setPassword(event.target.value)} />
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
                                        className='art-checkbox-label text-gradient'
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
                                <p className={classes.error}>{error}
                                </p>}
                        </form>
                        <div className='divider-text'>
                            <span className='divider-text-title'>or</span>
                        </div>
                        <GoogleSignIn/>
                        <Divider className={classes.divider} />
                        <Grid container alignItems="center">
                                <Grid item xs={6}>
                                   <span>Don't have an account?</span>
                                </Grid>
                                <Grid item xs={6} className={classes.forgotPassword}>
                                    <Button
                                        fullWidth
                                        id="signin-button"
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                        className={classes.authButton}
                                        type="button"
                                        onClick={() => history.push('/signup')}>
                                        Sign Up
                                    </Button>
                                </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login
