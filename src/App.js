import React from "react";
import Search from "./Search";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Search defaultCity="Amsterdam" />   
      </div>
      <p><a href="https://github.com/LauraBraun/react-weather-app">Open-source code</a> by Laura Braun</p>
    </div>
  );
}

export default App;
