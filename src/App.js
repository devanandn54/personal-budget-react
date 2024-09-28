
import AboutPage from './AboutPage/AboutPage';
import './App.css';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import Menu from './Menu/Menu';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    
      <Router>
      <Menu/>
      <Hero/>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>

      </div>
      <Footer/>
      </Router>

      
   
  );
}

export default App;
