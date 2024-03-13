import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

//Pages
import Login from '../pages/loginPage/LoginPage.js';
import Signup from '../pages/signupPage/signupPage.js';
import Protected from "./ProtectedRoutes.jsx"


const RouterPages = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                {/* <Route path='/Signup' element={<Signup />} /> */}
                <Route path="/Signup" element={<Protected Component={Signup} />} />
            </Routes>
        </Router>
    )
}
export default RouterPages;