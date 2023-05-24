import logo from './logo.svg';
import 'typeface-montserrat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Single from './pages/Single';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
        <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/single/:id' element={<Single/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
