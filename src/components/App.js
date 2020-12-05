import React, { useEffect, useState } from "react";
import '../static/App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from "../routes/Routes";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("_jwt")) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
  }, [loggedIn, setLoggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("_jwt", "");
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes 
          loggedIn={loggedIn} 
          handleLogin={setLoggedIn.bind(true)} 
          handleLogout={handleLogout} 
        />
      </BrowserRouter>
    </div>
  );
}

export default App;