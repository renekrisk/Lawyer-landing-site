import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BackToTop from './components/BackToTop';

// Lazy load components that are not immediately visible to improve initial load time.
// This splits the code into smaller chunks that are loaded on demand.
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const FAQ = React.lazy(() => import('./components/FAQ'));

// Simple loading spinner to show while lazy-loaded components are being fetched
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Suspense fallback={<LoadingSpinner />}>
          <FAQ />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20 bg-primary" />}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
}

export default App;
