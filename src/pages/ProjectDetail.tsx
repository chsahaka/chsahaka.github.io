import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { projectsData } from '../data';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bomRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!project) return;

    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Hero Entrance Animation
    anime({
      targets: heroRef.current,
      scale: [1.1, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo'
    });

    // Scroll-triggered animations for BOM and Steps
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)' // Mechanical snap
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (bomRef.current) observer.observe(bomRef.current);
    stepsRef.current.forEach(step => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, [project]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Standardized I/O Routing Exit (CRT TV turn off)
    const tl = anime.timeline({
      easing: 'easeInOutQuart',
      complete: () => navigate('/projects')
    });

    tl.add({
      targets: containerRef.current,
      scaleY: 0.01,
      duration: 400,
    }).add({
      targets: containerRef.current,
      scaleX: 0,
      opacity: 0,
      duration: 400,
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <h1 className="text-2xl font-mono text-[#00F0FF]">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div id="app-container" ref={containerRef} className="min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden pb-32 origin-center">
      
      {/* Back Button */}
      <button 
        onClick={handleBack} 
        className="fixed top-24 left-8 md:left-12 z-50 flex items-center gap-2 text-[#00F0FF] hover:text-white transition-colors font-mono text-xs tracking-widest uppercase bg-black/50 px-4 py-2 rounded-full border border-[#00F0FF]/30 hover:border-white/50 backdrop-blur-md hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden opacity-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
        <img src={project.thumbnail_image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-24 z-20">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[#00F0FF] font-mono text-sm tracking-widest">{project.date}</span>
            <span className="px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full text-[#00F0FF] font-mono text-xs uppercase shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              {project.difficulty}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/20 rounded-full text-white/80 font-mono text-xs uppercase">
              {project.time_to_complete}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">{project.title}</h1>
        </div>
      </div>

      {/* Bill of Materials */}
      <div ref={bomRef} className="max-w-6xl mx-auto px-8 md:px-12 mt-16 opacity-0">
        <h2 className="text-2xl font-mono text-[#00F0FF] mb-8 tracking-widest uppercase border-b border-white/10 pb-4">Bill of Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-medium mb-6 text-white/80 uppercase tracking-wider">Hardware</h3>
            <ul className="space-y-3">
              {project.hardware.map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-mono text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_5px_#00F0FF]"></div> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-6 text-white/80 uppercase tracking-wider">Software</h3>
            <ul className="space-y-3">
              {project.software.map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-mono text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_5px_#00F0FF]"></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Steps Sequence */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 mt-32 space-y-32">
        {project.steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              ref={el => { if (el) stepsRef.current[index] = el; }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center opacity-0`}
            >
              {/* Media Pane */}
              <div className="w-full md:w-1/2 aspect-video bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden relative group shadow-2xl">
                {step.media_type === 'image' && (
                  <img src={step.media_url} alt={step.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                {step.media_type === 'code' && (
                  <div className="w-full h-full p-6 font-mono text-xs text-[#00F0FF] bg-black/80 overflow-auto">
                    <pre><code>{step.media_url}</code></pre>
                  </div>
                )}
                <div className="absolute inset-0 border border-[#00F0FF]/0 group-hover:border-[#00F0FF]/30 transition-colors duration-500 rounded-xl pointer-events-none"></div>
              </div>

              {/* Text Pane */}
              <div className="w-full md:w-1/2">
                <div className="font-mono text-[#00F0FF] text-6xl font-bold opacity-20 mb-4 select-none">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-medium mb-4 text-white/90">{step.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
