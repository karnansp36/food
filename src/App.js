import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Navbar from './pages/Navbar';
import UserDetails from './components/UserDetails';
import UserComments from './components/UserComments';
import UserProfile from './components/UserProfile';



function App() {
  return (

   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/service' element={<Service/>}/>
        {/* <Route path='/posts/:id' element={<UserDetails/>}/>
        <Route path='/comments/:id' element={<UserComments/>}/>
        <Route path='/profile/:id' element={<UserProfile/>}/> */}
      </Routes>
      <Navbar/>
    </BrowserRouter>
  );
}

export default App
