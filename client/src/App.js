import React, {useEffect} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home';
import Projects from './Components/Projects/Projects'
import Work from './Components/Work/Work'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import MyApp from './Components/Myapps/MyApp';
import PrivateMessage from './Components/Messages/PrivateMessage';


function App() {

  useEffect(() => {
    document.title = "Yojen Grover";  
  }, []);
  return (
    <div className="App">
     <title>Yojen Grover</title>
     
      <Router>
      <Routes>
        <Route path="/" exact="true" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work" element={<Work />} />
        <Route path="/myapps" element={<MyApp />} />
        <Route path="/message" element={<PrivateMessage/>}/>
      </Routes>
      </Router>
     
    </div>
  );
}

export default App;
