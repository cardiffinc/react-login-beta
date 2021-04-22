import { makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'
import GoogleSignInLogo from '../../staticAssets/google_signin.png'

const useStyles = makeStyles((themes)=>({
    googleSignIn:{
        margin: '0 auto',
        width: 'fit-content',
    },
    googleImage:{
        height:  50
    },
}));

function GoogleSignIn() {
    const classes = useStyles();
    return (
        <div className={classes.googleSignIn}>
            <Tooltip title="Google Sign In Not Implemented">
                <img alt="Google Signin" src={GoogleSignInLogo} className={classes.googleImage}/>
            </Tooltip>
        </div>
    )
}

export default GoogleSignIn
