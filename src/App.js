
import { useEffect, useState } from 'react';
import AboutPage from './AboutPage/AboutPage';
import './App.css';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import Menu from './Menu/Menu';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [budgetData, setBudgetData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const getBudget = () => {
      axios
        .get("http://localhost:8080/budget")
        .then((res) => {
          const { myBudget } = res.data;
          const data = {
            datasets: [
              {
                data: myBudget.map((item) => item.budget),
                backgroundColor: [
                  "#ffcd56",
                  "#ff6384",
                  "#36a2eb",
                  "#fd6b19",
                  "#4bc0c0",
                  "#9966ff",
                  "#ff9f40",
                  "#c9cbcf",
                ],
              },
            ],
            labels: myBudget.map((item) => item.title),
          };
          setBudgetData(myBudget); 
          setChartData(data); 
        })
        .catch((err) => {
          console.error("Error fetching data", err);
          setError(err.message); 
        })
        .finally(() => {
          setLoading(false); 
        });
    };

    getBudget(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }
  return (
    
      <Router>
      <Menu/>
      <Hero/>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage budgetData = {budgetData} chartData={chartData} />}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>

      </div>
      <Footer/>
      </Router>

      
   
  );
}

export default App;
