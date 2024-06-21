import React, { useEffect, useState } from 'react';
import { getData } from '../controllers/HomeController';
import Dashboard from './Forms/Dashboard';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="home">
      <Dashboard />
    </div>
  );
};

export default Home;
