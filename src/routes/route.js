import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

//Pages
import Login from '../pages/loginPage/LoginPage.js';
import Signup from '../pages/signupPage/signupPage.js';

const RouterPages = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
            </Routes>
        </Router>
    )
}
export default RouterPages;