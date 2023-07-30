import React from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // this for page login desgn
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Banner />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        
        {/* Your other components */}
      </div>
    </Router>
  );
}

export default App;
