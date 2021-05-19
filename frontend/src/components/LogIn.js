import React, {useState} from 'react';
import Notification from './Notification';
import { Container, 
         Typography, 
         Box, 
         Grid, 
         Link, 
         Checkbox, 
         FormControlLabel, 
         TextField, 
         CssBaseline, 
         Button, 
         Avatar,
         FormControl } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

axios.defaults.headers.common["Bearer"] = localStorage.getItem('token');
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mehreteabkifle.netlify.app/">
        Sample Management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }  
}));

export default function LogIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  const login = async (email, password) => {
    try {
        const {data: jwt} = await axios.post('/user/login', { email, password });
        console.log(jwt);
        localStorage.setItem('token', jwt);    
        window.location = '/home';                     
    } catch (er) {       
        console.log("Error credentials", er);
        setNotify({
          isOpen: true,
          message: 'Invalid username or password',
          type: 'error'
      })
    }
  }

  const submitHandler = (e) => {   
   e.preventDefault();
   login(email, password);
  }

  return (
   <FormControl onSubmit={submitHandler}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    <Notification 
      notify={notify}
      setNotify={setNotify}
    />
   </FormControl>
  );
}