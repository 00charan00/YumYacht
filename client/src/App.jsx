import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Home from './components/Home.jsx';
import Mhome from './components/Mhome.jsx';
import Admin from './components/Admin.jsx';
import Delivery from './components/Delivery.jsx';
import Hotel from './components/Hotel.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";



function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Mhome />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/hotel' element={<Hotel />}></Route>
            <Route path='/delivery' element={<Delivery />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
