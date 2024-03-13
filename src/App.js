import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterPages from './routes/route.js';
import UserContextProvider from "./Context/User/UserContextProvider.jsx";


function App() {
  return (
    <UserContextProvider>
      <RouterPages />
    </UserContextProvider >
  );
}

export default App;
