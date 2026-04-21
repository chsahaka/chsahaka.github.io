import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { projectsData } from '../data';

export default function ProjectHub() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js Entrance Animations
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // 1. Draw main track
    tl.add({
      targets: '.main-track',
      opacity: [0, 1],
      scaleX: [0, 1],
      scaleY: [0, 1], // Animating both handles mobile (vertical) and desktop (horizontal) gracefully
      duration: 600,
    })
    // 2. Pop the dots
    .add({
      targets: '.project-dot',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 300,
      delay: anime.stagger(50),
    }, '-=400')
    // 3. Grow branches
    .add({
      targets: '.branch-line',
      opacity: [0, 1],
      duration: 300,
      delay: anime.stagger(50),
    }, '-=200')
    // 4. Snap cards
    .add({
      targets: '.project-card',
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 400,
      delay: anime.stagger(50),
    }, '-=200');

  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only apply horizontal scroll hijacking on desktop (>= 768px)
      if (window.innerWidth >= 768) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    // passive: false is required to call e.preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleProjectClick = (e: React.MouseEvent, link: string, inProgress?: boolean) => {
    e.preventDefault();
    if (inProgress) return;

    const card = e.currentTarget;

    // Exit Animation: Rapid zoom-in and fade out
    anime({
      targets: card,
      scale: 1.1,
      opacity: 0,
      duration: 400,
      easing: 'easeInExpo',
    });

    anime({
      targets: containerRef.current,
      opacity: 0,
      duration: 500,
      easing: 'linear',
      complete: () => navigate(link)
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen pt-32 pb-24 md:py-0 flex flex-col md:flex-row items-start md:items-center overflow-x-hidden md:overflow-x-auto overflow-y-auto md:overflow-y-hidden relative z-10 px-8 md:px-32"
    >
      
      {/* Main Track (Vertical on mobile, Horizontal on desktop) */}
      <div className="main-track fixed left-8 md:left-0 top-0 md:top-1/2 w-1 md:w-screen h-screen md:h-1 bg-white/10 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-0 origin-top md:origin-left pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-16 md:gap-32 relative z-10 w-full md:w-max ml-8 md:ml-0">
        {projectsData.map((project, index) => {
          const isTop = index % 2 === 0;
          
          return (
            <div 
              key={project.id} 
              className={`relative flex md:flex-col items-center md:justify-center w-full md:w-80 shrink-0 group ${project.inProgress ? 'cursor-default' : 'cursor-pointer'} ${isTop ? 'md:justify-end' : 'md:justify-start'}`}
              onClick={(e) => handleProjectClick(e, project.link_to_template, project.inProgress)}
            >
              {/* Dot on track */}
              <div className="project-dot absolute left-0 md:left-1/2 top-1/2 md:top-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/30 z-20 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_10px_#00F0FF] transition-all -translate-x-1/2 -translate-y-1/2"></div>

              {/* Branch Line */}
              <div className={`branch-line absolute bg-white/20 group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_10px_#00F0FF] transition-all z-10
                /* Mobile: horizontal line */
                left-0 top-1/2 w-8 h-px -translate-y-1/2
                /* Desktop: vertical line */
                md:left-1/2 md:w-px md:h-16 md:-translate-x-1/2
                ${isTop ? 'md:bottom-1/2 md:top-auto' : 'md:top-1/2 md:bottom-auto'}
              `}></div>

              {/* Card */}
              <div className={`project-card relative z-30 w-full md:w-80 bg-[#0a0a0a] border border-white/10 group-hover:border-[#00F0FF]/50 p-4 rounded-xl transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)]
                ml-12 md:ml-0
                ${isTop ? 'md:mb-24 md:mt-0' : 'md:mt-24 md:mb-0'}
              `}>
                {!project.inProgress && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg mb-4 bg-white/5 relative">
                    <div className="absolute inset-0 bg-[#00F0FF]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img src={project.thumbnail_image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00F0FF] font-mono text-[10px] tracking-widest uppercase">{project.date}</span>
                    {project.inProgress && (
                      <span className="text-yellow-400/90 font-mono text-[8px] uppercase border border-yellow-400/20 bg-yellow-400/10 px-1.5 py-0.5 rounded-full">In Progress</span>
                    )}
                  </div>
                  <span className="text-white/40 font-mono text-[10px] uppercase border border-white/10 px-2 py-0.5 rounded-full">{project.difficulty}</span>
                </div>
                
                <h3 className="text-lg font-medium text-white mb-4 group-hover:text-[#00F0FF] transition-colors">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-white/60 group-hover:border-[#00F0FF]/30 group-hover:text-white/90 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
