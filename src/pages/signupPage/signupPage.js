import React, { useState } from 'react';
import {Avatar, TextField, Button, FormControl, InputLabel, MenuItem, Select, IconButton, InputAdornment, Grid, Checkbox, FormControlLabel, Typography, Card, Modal, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const SignUpForm = () => {
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

  return (
    <div className='form-cont'>
      <Card style={{ maxWidth: '650px', marginTop: '180px', padding: '20px', border: '1px solid #ffffff', boxShadow: '0px 3px 8px grey' }}>
      <Avatar sx={{ m: 1, marginLeft:'50%', bgcolor: '#178383' }}>
                        <LockOutlinedIcon />
                    </Avatar>
        <Typography  variant="h5" gutterBottom style={{ color: '#178383',fontWeight: 500, }}>
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
        <MenuItem value="Region1">Region 1</MenuItem>
        <MenuItem value="Region2">Region 2</MenuItem>
        <MenuItem value="Region3">Region 3</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={6}>
    <FormControl fullWidth margin="normal">
      <InputLabel>Country</InputLabel>
      <Select
        value={values.country}
        onChange={handleChange('country')}
      >
        <MenuItem value="Country1">Country 1</MenuItem>
        <MenuItem value="Country2">Country 2</MenuItem>
        <MenuItem value="Country3">Country 3</MenuItem>
      </Select>
    </FormControl>
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
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zipcode"
              value={values.zipcode}
              onChange={handleChange('zipcode')}
              margin="normal"
              fullWidth
            />
          </Grid>
        </Grid> */}
        <FormControlLabel
          control={<Checkbox checked={values.receiveUpdates} onChange={handleCheckboxChange} />}
          label="I agree to these terms and conditions          "
        />
        <Button variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Typography variant="body2" align="center" gutterBottom>
          Already have an account? <a href="#">Sign in</a>
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
        <Box sx={{ width: 700,height:450, bgcolor: 'background.paper', p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Instructions
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque justo eget risus fringilla, sed eleifend sem posuere.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpForm;
