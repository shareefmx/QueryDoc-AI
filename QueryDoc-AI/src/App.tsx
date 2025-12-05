import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { FeaturedIn } from './components/home/FeaturedIn';
import { HowItWorks } from './components/home/HowItWorks';
import { Features } from './components/home/Features';
import { Mission } from './components/home/Mission';
import { Testimonials } from './components/home/Testimonials';
import { Pricing } from './components/home/Pricing';
import { FAQ } from './components/home/FAQ';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <FeaturedIn />
        <HowItWorks />
        <Features />
        <Mission />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
