import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { timelineData } from '../data';

type FilterType = 'all' | 'experience' | 'education' | 'achievement';

export default function Timeline() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Filter logic
  const filteredData = timelineData.filter(item => filter === 'all' || item.type === filter);

  useEffect(() => {
    // Reset opacity and scale for new items
    anime.set('.timeline-node-container', { opacity: 0, scale: 1, translateX: 0 });

    // Entrance animation for line
    anime({
      targets: lineRef.current,
      height: ['0%', '100%'],
      easing: 'easeInOutSine',
      duration: 1000,
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateX: entry.target.classList.contains('left-card') ? [-50, 0] : [50, 0],
            easing: 'easeOutElastic(1, .8)',
            duration: 800,
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Need a small timeout to ensure DOM is updated before observing
    setTimeout(() => {
      cardsRef.current.forEach(card => {
        if (card) observer.observe(card);
      });
    }, 50);

    return () => observer.disconnect();
  }, [filter]); // Re-run when filtered data changes

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filter) return;
    
    // Animate out current cards
    anime({
      targets: '.timeline-node-container',
      scale: 0.9,
      opacity: 0,
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        setFilter(newFilter);
        setExpandedId(null); // Reset expanded state on filter change
      }
    });
  };

  return (
    <div id="app-container" ref={containerRef} className="min-h-screen pt-32 pb-24 px-4 md:px-8 relative z-10 origin-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight">ACHIEVEMENTS</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['all', 'experience', 'education', 'achievement'].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f as FilterType)}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${
                filter === f 
                  ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]' 
                  : 'bg-transparent border-white/20 text-white/50 hover:border-[#00F0FF]/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2">
            <div ref={lineRef} className="w-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] origin-top"></div>
          </div>

          {/* Nodes */}
          <div className="space-y-12">
            {filteredData.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;
              
              return (
                <div 
                  key={item.id}
                  ref={el => { if (el) cardsRef.current[index] = el; }}
                  className={`timeline-node-container relative flex items-center w-full opacity-0 ${isEven ? 'md:justify-start left-card' : 'md:justify-end right-card'}`}
                >
                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.5)] -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-[#00F0FF]"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                    <div 
                      className="bg-[#0a0a0a] border border-white/10 hover:border-[#00F0FF]/50 p-6 rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)] group cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        <Icon className="w-5 h-5 text-[#00F0FF] opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[#00F0FF] font-mono text-xs tracking-widest">{item.date}</span>
                        {item.inProgress && (
                          <span className="text-yellow-400/90 font-mono text-[8px] uppercase border border-yellow-400/20 bg-yellow-400/10 px-1.5 py-0.5 rounded-full">In Progress</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00F0FF] transition-colors">{item.title}</h3>
                      <h4 className="text-sm font-mono text-white/50 mb-4 uppercase">{item.organization}</h4>
                      <p className="text-white/70 leading-relaxed text-sm">{item.description}</p>
                      
                      {/* Expandable Details */}
                      <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className={`pt-4 border-t border-white/10 text-white/60 text-sm leading-relaxed ${isEven ? 'md:text-right' : 'text-left'}`}>
                            {item.extendedDescription}
                          </div>
                        </div>
                      </div>

                      <div className={`mt-4 text-[10px] font-mono tracking-widest text-[#00F0FF]/50 group-hover:text-[#00F0FF] transition-colors ${isEven ? 'md:text-right' : 'text-left'}`}>
                        {isExpanded ? '[-] COLLAPSE DETAILS' : '[+] EXPAND DETAILS'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
