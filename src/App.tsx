import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { HowItWorks } from './components/home/HowItWorks';
import { ProjectDescription } from './components/home/ProjectDescription';
import { Footer } from './components/layout/Footer';
import { Contact } from './pages/Contact';
import { About } from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <HowItWorks />
                <ProjectDescription />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
