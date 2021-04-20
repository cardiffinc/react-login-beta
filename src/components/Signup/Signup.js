import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import artwork from '../../staticAssets/login-artwork.jpg';
import GoogleSignIn from '../../staticAssets/google_signin.png'
import EduParkLogo from '../../staticAssets/Edupark-Login-Logo-ali.png'
import { Avatar, Button, Checkbox, Divider, FormControlLabel } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useHistory } from 'react-router';
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
        margin: '5em',
        marginRight: '10em'
    },
    socialGrid: {
        marginTop: 20,
        marginBottom: 20
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
    buttonGrid: {
        marginTop: 10,
    },
    authButtonBG: {
        width: '-webkit-fill-available',
        textTransform: 'none',
        background: 'linear-gradient(to right, #5da4fa, #529afd, #4c8fff, #4c83ff, #5276fe, #5c72fd, #656efc, #6e6afa, #7670fa, #7e75fb, #867bfb, #8d81fb)',
        '&$disabled': {
            color: '#ff0000'
        }
    },
    divider: {
        marginTop: 25,
        marginBottom: 25,
    },
    heading: {
        color: theme.palette.primary
    },
    error: {
        color: '#ff4747'
    },
    errorIcon: {
        verticalAlign: 'middle'
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
    divider: {
        marginTop: 25,
        marginBottom: 25,
    },
    googleSignIn:{
        margin: '0 auto',
        width: 'fit-content',
    },
    googleImage:{
        height:  50
    },
}));

function Signup() {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [policy, setPolicy] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [error, setError] = useState(null);
    document.title = 'SJoshuaDarth\'s Template | Signup';

    const checkUserExists = user => {
        return email === user.email;
    }

    const isUniqueEmail = () => {
        try {
            const users = JSON.parse(localStorage.getItem('darthUsers'));
            const userExists = users.filter(checkUserExists);
            if (userExists.length > 0) {
                setError('This email is already being used by another member.\nPlease signup with another email!')
                return false;
            } else {
                setError(null);
                return true;
            }
        } catch (error) {
            setError(null);
            return true;
        }
    }

    const handleSignup = event => {
        event.preventDefault();
        if (isUniqueEmail()) {
            const user = { name, email, password }
            var users = [];
            try {
                users = JSON.parse(localStorage.getItem('darthUsers'));
                users.push(user);
            } catch (error) {
                users = [user]
                console.log(error)
            }
            localStorage.setItem('darthUsers', JSON.stringify(users));
            localStorage.setItem('currentDarthUser', JSON.stringify(user));
            history.push('/');
        } else setError('This email is already being used by another member.\nPlease signup with another email!');
    }

    useEffect(() => {
        setError(null);
        if (name !== '' && email !== '' && password !== '' && policy) {
            setDisableButton(false)
        } else setDisableButton(true)
    }, [name, email, password, policy])

    useEffect(() => {
        isUniqueEmail();
    }, [email])

    useEffect(() => {
        if (error) setDisableButton(true)
        else setDisableButton(false);
    }, [error])

    const configNameInput = {
        id: "name-input",
        label: "Name",
        type: "name"
    }

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
                        <Avatar src={EduParkLogo} />
                        <h1 className={classes.heading}>
                            Hey, Welcome! 🙋‍♂️
                        </h1>
                        <span>Signup using your email and password.</span>

                        <form onSubmit={handleSignup}>
                            <div className={classes.inputWrapper}>
                                <TextInput
                                    {...configNameInput}
                                    handleChange={event => setName(event.target.value)} />
                                <TextInput
                                    {...configEmailInput}
                                    handleChange={event => setEmail(event.target.value)} />
                                <TextInput
                                    {...configPasswordInput}
                                    handleChange={event => setPassword(event.target.value)} />
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="secondary"
                                        className={classes.checkbox}
                                        onClick={event => event.target.checked ? setPolicy(true) : setPolicy(false)}
                                    />
                                }
                                label="I agree to the Terms and Privacy Conditions"
                                className='art-checkbox-label-signup text-gradient'
                            />
                            {error &&
                                <p className={classes.error}><ErrorOutlineIcon className={classes.errorIcon} /> {error}
                                </p>}
                            <Grid container alignItems="center" spacing={2} className={classes.buttonGrid}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        id="signup-button"
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        className={classes.authButtonBG}
                                        type="submit"
                                        style={{ color: '#fff' }}
                                        disabled={disableButton}>
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        id="signin-button"
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                        className={classes.authButton}
                                        type="button"
                                        onClick={() => history.push('/login')}>
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
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

export default Signup
