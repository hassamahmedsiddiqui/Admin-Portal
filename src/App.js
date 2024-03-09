import React from 'react';
import './App.css'; // Import your CSS file
import Login from './pages/loginPage/LoginPage';
import SignUpForm from './pages/signupPage/signupPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='main-container'>
      <div className='content'>
        <div>
          <h1 className='heading' >Research <span>Mate</span></h1>
          <p className='title'>Enjoy Your Clinical Trial With <span>Research Mate</span></p>
          <img className='characterImg' src={require('./images/kerlocopy.png')} ></img>
        </div>
        <div>
          {/* <SignUpForm /> */}
          <Login /> 
          
        </div>
      </div>
    </div>
  );
}

export default App;
