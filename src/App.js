import React, { useState, useEffect } from 'react';
import Search from './components/Search';

function App() {

  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        setHotelData(data[1].entries);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Search hotels={hotelData}></Search>
      </div>
    </div>
  );
}

export default App;
