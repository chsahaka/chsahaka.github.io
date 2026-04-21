import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { aboutData } from '../data';

export default function About() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasPhoto, setHasPhoto] = useState(true);
  const skillsRef = useRef<HTMLDivElement>(null);

  // SVG & Skills Animations
  useEffect(() => {
    // Elegant SVG Animations (only run if photo fails and SVG is rendered)
    if (!hasPhoto) {
      anime({
        targets: '.svg-ring-outer',
        rotate: '1turn',
        duration: 40000,
        easing: 'linear',
        loop: true
      });
      
      anime({
        targets: '.svg-ring-inner',
        rotate: '-1turn',
        duration: 30000,
        easing: 'linear',
        loop: true
      });

      anime({
        targets: '.svg-hex',
        rotate: '1turn',
        duration: 60000,
        easing: 'linear',
        loop: true
      });

      anime({
        targets: '.svg-line',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3000,
        delay: anime.stagger(400),
        direction: 'alternate',
        loop: true
      });
    }

    // Text Fade In
    anime({
      targets: '.bio-text',
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: 200
    });

    // Skills Stagger Animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: '.skill-tag',
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [10, 0],
            delay: anime.stagger(40),
            easing: 'easeOutCubic',
            duration: 600
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [hasPhoto]);

  return (
    <div id="app-container" ref={containerRef} className="min-h-screen pt-32 pb-24 px-4 md:px-12 relative z-10 origin-center text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        
        {/* LEFT SIDE: Graphic / Photo */}
        <div className="w-full md:w-5/12 sticky top-32">
          <div className="relative aspect-square w-full max-w-md mx-auto flex items-center justify-center">
            {hasPhoto ? (
              <img 
                src="/myphoto.png" 
                alt="Profile" 
                onError={() => setHasPhoto(false)}
                className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.05)] grayscale hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              // SVG Fallback: Elegant Geometric Blueprint
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                {/* Outer thin ring */}
                <circle className="svg-ring-outer origin-center" cx="100" cy="100" r="90" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="1 4" />
                {/* Inner solid ring */}
                <circle className="svg-ring-inner origin-center" cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="10 2" />
                {/* Hexagon */}
                <polygon className="svg-hex origin-center" points="100,40 152,70 152,130 100,160 48,130 48,70" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5" />
                {/* Core subtle dot */}
                <circle cx="100" cy="100" r="2" fill="#00F0FF" opacity="0.5" />
                {/* Circuit lines */}
                <path className="svg-line" d="M100,100 L100,10 L120,10" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5" />
                <path className="svg-line" d="M100,100 L190,100 L190,120" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5" />
                <path className="svg-line" d="M100,100 L10,100 L10,80" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5" />
                <path className="svg-line" d="M100,100 L100,190 L80,190" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5" />
                
                {/* Decorative nodes */}
                <circle cx="120" cy="10" r="1.5" fill="#00F0FF" opacity="0.5" />
                <circle cx="190" cy="120" r="1.5" fill="#00F0FF" opacity="0.5" />
                <circle cx="10" cy="80" r="1.5" fill="#00F0FF" opacity="0.5" />
                <circle cx="80" cy="190" r="1.5" fill="#00F0FF" opacity="0.5" />
              </svg>
            )}
            
            {/* Overlay Grid Lines */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Data */}
        <div className="w-full md:w-7/12 space-y-20">
          
          {/* Section 1: Biography */}
          <section>
            <h2 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20"></span>
              Biography
            </h2>
            <div className="bio-text opacity-0">
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                {aboutData.biography}
              </p>
            </div>
          </section>

          {/* Section 2: Technical Skills */}
          <section ref={skillsRef}>
            <h2 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20"></span>
              Technical Skills
            </h2>
            
            <div className="space-y-8">
              {Object.entries(aboutData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-[10px] font-mono text-[#00F0FF]/70 uppercase tracking-widest mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="skill-tag opacity-0 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-light text-white/70 hover:border-[#00F0FF]/30 hover:text-white transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Professional Philosophy */}
          <section>
            <h2 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20"></span>
              Professional Philosophy
            </h2>
            <ul className="space-y-6">
              {aboutData.philosophy.map((param, i) => {
                const [title, description] = param.split(': ');
                return (
                  <li key={i} className="flex flex-col gap-1 text-white/70">
                    <span className="text-sm font-medium text-white/90">{title}</span>
                    <p className="text-sm leading-relaxed text-white/70">{description}</p>
                  </li>
                );
              })}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
