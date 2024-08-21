
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';

import Dashboard from './Pages/Dashboard';
import Projects from './Pages/Projects';
import Footer from './Components/Footer';
import Auth from './Components/Auth';




function App() {
  return (
  <div className='App'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>

    </Routes>
    <Footer/>

  </div>
  );
}

export default App;
