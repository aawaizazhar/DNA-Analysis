import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Capabilities from './pages/Capabilities';
import Pipeline from './pages/Pipeline';
import Applications from './pages/Applications';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-void text-white md:cursor-none selection:bg-phosphor selection:text-void">
        <CustomCursor />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
