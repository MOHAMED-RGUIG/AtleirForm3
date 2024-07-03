import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Pcescreen from './screens/Pcescreen';

function App() {
  return (
    
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Pcescreen />} />
          <Route path='/register' element={<Registerscreen />} />
          <Route path='/login' element={<Loginscreen />} />
          <Route path="/pce" element={<Pcescreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
