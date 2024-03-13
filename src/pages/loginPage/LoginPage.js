import './style.css';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../../Context/User/userContext.js";

import {
    Avatar, Button, CssBaseline, TextField,
    FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container,
    IconButton, InputAdornment, Modal
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const severLink = 'http://localhost:8000/api';


const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#178383',
        },
    },
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

    //check wheter user is already login or not;
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate("/home")
        }
    }, [user, navigate]);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        // Your login logic here
        e.preventDefault()
        axios.post(`${severLink}/auth/login`, {
            email,
            password,
        })
            .then((res) => {
                console.log(res.data.message);
                console.log(res.data.user);
                localStorage.setItem('token', res.data.token)
            })
            .catch((error) => {
                console.log(error.response.data.message)
                Swal.fire({
                    icon: "error",
                    title: "Terms And Conditions...",
                    text: error.response.data.message,
                });
            });
    };

    const handleForgotPassword = () => {
        setForgotPasswordModalOpen(true);
    };

    const handleCloseForgotPasswordModal = () => {
        setForgotPasswordModalOpen(false);
    };

    const handleSendRecoveryEmail = () => {
        // Your logic to send recovery email
        handleCloseForgotPasswordModal();
    };

    return (<>
        <div className='main-container'>
            <div className='content'>
                <div>
                    <h1 className='heading' >Research <span>Mate</span></h1>
                    <p className='title'>Enjoy Your Clinical Trial With <span>Research Mate</span></p>
                    <img className='characterImg' alt='characterImg' src={require('../../images/kerlocopy.png')} ></img>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handlePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    // onClick={HandleSubmit}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2" onClick={handleForgotPassword}>
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="/Signup" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>

                        {/* Forgot Password Modal */}
                        <Modal
                            open={forgotPasswordModalOpen}
                            onClose={handleCloseForgotPasswordModal}
                            aria-labelledby="forgot-password-modal-title"
                            aria-describedby="forgot-password-modal-description"
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography variant="h6" id="forgot-password-modal-title" gutterBottom>
                                    Forgot Password
                                </Typography>
                                <Typography variant="body1" id="forgot-password-modal-description" gutterBottom>
                                    Please enter your email address below to receive instructions on how to reset your password.
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="forgot-password-email"
                                    label="Email Address"
                                    name="forgot-password-email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSendRecoveryEmail}
                                >
                                    Send Recovery Email
                                </Button>
                            </Box>
                        </Modal>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    </>
    );
};

export default Login;
