import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation-bar';
import Footer from './components/footer';
import CustomCursor from './components/custom-cursor';

// Pages
import Home from './pages/home-page';
import Auth from './pages/authentication-page';
import Contact from './pages/contact-page';
import Pricing from './pages/pricing-page';
import Capabilities from './pages/capabilities-page';
import Pipeline from './pages/pipeline-page';
import Applications from './pages/applications-page';

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
