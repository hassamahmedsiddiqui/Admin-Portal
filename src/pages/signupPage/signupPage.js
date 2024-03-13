import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../../Context/User/userContext.js";
import './style.css';
import {
  Avatar, TextField, Button, FormControl, InputLabel,
  MenuItem, Select, IconButton, InputAdornment, Grid, Checkbox,
  FormControlLabel, Typography, Card, Modal, Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const severLink = 'http://localhost:8000/api';

const SignUpForm = () => {
  //check wheter user is already login or not;
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [user, navigate]);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
    organizationName: '',
    organizationType: '',
    region: '',
    country: '',
    city: '',
    state: '',
    zipcode: '',
    receiveUpdates: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setValues({ ...values, receiveUpdates: event.target.checked });
    if (event.target.checked) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationName,
      organizationType,
      region,
      country,
      city,
      state,
      receiveUpdates
    } = values;
    if (receiveUpdates) {
      console.log(values);

      axios.post(`${severLink}/auth/signin`, {
        firstName,
        lastName,
        email,
        password,
        organizationName,
        organizationType,
        region,
        country,
        city,
        state,
        receiveUpdates
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

      setValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
        organizationName: '',
        organizationType: '',
        region: '',
        country: '',
        city: '',
        state: '',
        zipcode: '',
        receiveUpdates: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Terms And Conditions...",
        text: "Please agree to our Terms And Conditions",
      });
    }
  }

  return (
    <div className='main-container'>
      <div className='content'>
        <div>
          <h1 className='heading' >Research <span>Mate</span></h1>
          <p className='title'>Enjoy Your Clinical Trial With <span>Research Mate</span></p>
          <img className='characterImg' alt='characterImg' src={require('../../images/kerlocopy.png')} ></img>
        </div>
        <div>
          <div className='form-cont'>
            <Card style={{ maxWidth: '650px', marginTop: '180px', padding: '20px', border: '1px solid #ffffff', boxShadow: '0px 3px 8px grey' }}>
              <Avatar sx={{ m: 1, marginLeft: '50%', bgcolor: '#178383' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom style={{ color: '#178383', fontWeight: 500, }}>
                Register Your Site ..!
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    margin="normal"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Organization Name"
                    value={values.organizationName}
                    onChange={handleChange('organizationName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Organization Type</InputLabel>
                    <Select
                      value={values.organizationType}
                      onChange={handleChange('organizationType')}
                    >
                      <MenuItem value="Type1">Type 1</MenuItem>
                      <MenuItem value="Type2">Type 2</MenuItem>
                      <MenuItem value="Type3">Type 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Region</InputLabel>
                    <Select
                      value={values.region}
                      onChange={handleChange('region')}
                    >
                      <MenuItem value="Region1">Asia</MenuItem>
                      <MenuItem value="Region2">Africa</MenuItem>
                      <MenuItem value="Region3">North America</MenuItem>
                      <MenuItem value="Region2">South America</MenuItem>
                      <MenuItem value="Region2">Europe</MenuItem>
                      <MenuItem value="Region2">Antarctica</MenuItem>
                      <MenuItem value="Region2">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country"
                    value={values.country}
                    onChange={handleChange('country')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    value={values.city}
                    onChange={handleChange('city')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    value={values.state}
                    onChange={handleChange('state')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <FormControlLabel
                control={<Checkbox checked={values.receiveUpdates} onChange={handleCheckboxChange} />}
                label="I agree to these terms and conditions          "
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Sign Up
              </Button>
              <Typography variant="body2" align="center" gutterBottom>
                Already have an account? <Link to={"/"}>Sign in</Link>
              </Typography>
            </Card>

            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: 700, height: 450, bgcolor: 'background.paper', p: 4 }}>
                <Typography id="modal-title" variant="h6" component="h2">
                  Instructions
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque justo eget risus fringilla, sed eleifend sem posuere.
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
