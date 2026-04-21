import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant entrance animation
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    tl.add({
      targets: '.animate-fade-up',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(150, { start: 300 }),
    });

    return () => {
      anime.remove('.animate-fade-up');
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <div className="max-w-4xl w-full text-center flex flex-col items-center">
        
        {/* Overline */}
        <div className="animate-fade-up opacity-0 flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-white/20"></div>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/50 uppercase">
            Electrical & Mechatronics Engineer
          </span>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>

        {/* Main Headline */}
        <h1 className="animate-fade-up opacity-0 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-8 text-white">
          High voltage.<br />
          <span className="text-white/90">Higher vision.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up opacity-0 text-base md:text-lg text-white/50 max-w-2xl font-light leading-relaxed mb-12">
          Designing and building intelligent systems that seamlessly bridge the physical and digital worlds.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up opacity-0">
          <Link 
            to="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-medium text-sm tracking-wide transition-transform duration-300 hover:scale-105"
          >
            Explore Projects
            <div className="absolute inset-0 rounded-full border border-white/20 scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
          </Link>
        </div>

      </div>
    </div>
  );
}
