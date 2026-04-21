/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AnimatedDotGrid from './components/animations/AnimatedDotGrid';
import Home from './pages/Home';
import About from './pages/About';
import Timeline from './pages/Timeline';
import ProjectHub from './pages/ProjectHub';
import ProjectDetail from './pages/ProjectDetail';
import { usePageTitle } from './hooks/usePageTitle';

function AppContent() {
  usePageTitle();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-white/20 selection:text-white">
      {/* Background Animation */}
      <AnimatedDotGrid />

      {/* Layout Elements */}
      <Navbar />
      <Footer />

      {/* Page Content */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/projects" element={<ProjectHub />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
