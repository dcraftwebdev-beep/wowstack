import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Menu, X, Search, User, Star, Clock, Calendar, 
  ArrowRight, ArrowLeft, MapPin 
} from 'lucide-react';

const WINDUP_MS = 150;
const PUSH_MS = 1250;
const SWAP_MS = WINDUP_MS + PUSH_MS; // 1400ms
const SETTLE_MS = 800; // 2200ms total

export default function CinematicHero() {
  const [stage, setStage] = useState(1);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'windup' | 'push' | 'settle' | 'reverse-windup' | 'reverse-push'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const heroVideoRef = useRef(null);
  const interiorVideoRef = useRef(null);
  const initialPinchDistance = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleEnter = useCallback(() => {
    if (stage !== 1 || transitionState !== 'idle') return;

    if (isReducedMotion) {
      setTransitionState('push');
      setTimeout(() => {
        setStage(2);
        setTransitionState('idle');
      }, 400);
      return;
    }

    setTransitionState('windup');
    setTimeout(() => {
      setTransitionState('push');
      setTimeout(() => {
        setStage(2);
        setTransitionState('settle');
        setTimeout(() => setTransitionState('idle'), SETTLE_MS);
      }, PUSH_MS);
    }, WINDUP_MS);
  }, [stage, transitionState, isReducedMotion]);

  const handleExit = useCallback(() => {
    if (stage !== 2 || transitionState !== 'idle') return;

    if (isReducedMotion) {
      setTransitionState('reverse-push');
      setTimeout(() => {
        setStage(1);
        setTransitionState('idle');
      }, 400);
      return;
    }

    setTransitionState('reverse-windup');
    setTimeout(() => {
      setStage(1);
      setTransitionState('reverse-push');
      setTimeout(() => {
        setTransitionState('settle');
        setTimeout(() => setTransitionState('idle'), SETTLE_MS);
      }, PUSH_MS);
    }, WINDUP_MS);
  }, [stage, transitionState, isReducedMotion]);

  // Touch handlers for pinch-to-zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDistance.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      
      if (dist - initialPinchDistance.current > 60) {
        handleEnter();
        initialPinchDistance.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    initialPinchDistance.current = null;
  };

  // Determine scaling based on transition states
  let heroScaleClass = "scale-100";
  if (!isReducedMotion) {
    if (stage === 1 && transitionState === 'push') heroScaleClass = "scale-[3.2]";
    if (stage === 2 && ['idle', 'settle', 'reverse-windup'].includes(transitionState)) heroScaleClass = "scale-[3.2]";
  }

  const isTransitioning = transitionState !== 'idle' && transitionState !== 'settle';
  const isStage1Exiting = transitionState === 'windup' || transitionState === 'push';
  const isStage2Exiting = transitionState === 'reverse-windup' || transitionState === 'reverse-push';

  const navLinks = ['Movies', 'TV Series', 'Editor\'s Pick', 'Interviews', 'User Reviews'];

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-black text-white font-inter select-none"
      onDoubleClick={handleEnter}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .liquid-glass:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @keyframes blurFadeUp {
          from {
            opacity: 0;
            filter: blur(20px);
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        .animate-blur-fade-up {
          animation: blurFadeUp 1s ease-out forwards;
          opacity: 0;
        }

        .bottom-blur-mask {
          -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
          mask-image: linear-gradient(to top, black 0%, transparent 45%);
        }

        .ui-exit {
          opacity: 0 !important;
          filter: blur(12px) !important;
          transform: translateY(-10px) !important;
          transition: all 150ms ease-in !important;
        }
      `}} />

      {/* BACKGROUND VIDEOS */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900 pointer-events-none">
        <video
          ref={heroVideoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
          className={`absolute inset-0 w-full h-full object-cover origin-center transition-all 
            ${isReducedMotion ? 'duration-400' : 'duration-[1250ms] ease-[cubic-bezier(0.76,0,0.24,1)]'} 
            ${heroScaleClass} 
            ${stage === 2 ? 'opacity-0' : 'opacity-100'}
          `}
          autoPlay loop muted playsInline
        />
        <video
          ref={interiorVideoRef}
          src="https://cdn.coverr.co/videos/coverr-modern-living-room-interior-3277/1080p.mp4"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400
            ${stage === 1 ? 'opacity-0' : 'opacity-100'}
          `}
          autoPlay loop muted playsInline preload="auto"
        />

        {/* Transition Vignette & Flash */}
        <div className={`absolute inset-0 bg-[radial-gradient(circle,transparent_0%,black_90%)] transition-opacity duration-[1000ms]
            ${(transitionState === 'push' || transitionState === 'reverse-push') ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>

      {/* BOTTOM BLUR OVERLAY */}
      <div className={`absolute inset-0 z-[1] bottom-blur-mask backdrop-blur-xl pointer-events-none transition-opacity duration-700
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}`} 
      />

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
        <div className="text-xl md:text-2xl font-bold tracking-widest animate-blur-fade-up" style={{ animationDelay: '0ms' }}>
          CINEMATIC
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a key={link} href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors animate-blur-fade-up" style={{ animationDelay: `${100 + (i * 50)}ms` }}>
              {link}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 liquid-glass rounded-full px-4 md:px-6 py-2 text-sm font-medium animate-blur-fade-up" style={{ animationDelay: '350ms' }}>
            <Search size={18} />
            Search
          </button>
          
          <button className="hidden sm:flex items-center justify-center w-10 h-10 liquid-glass rounded-full animate-blur-fade-up" style={{ animationDelay: '400ms' }}>
            <User size={18} />
          </button>

          <button 
            className="lg:hidden flex items-center justify-center w-10 h-10 liquid-glass rounded-full animate-blur-fade-up relative overflow-hidden" 
            style={{ animationDelay: '350ms' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             <div className={`absolute transition-all duration-500 ease-out ${isMobileMenuOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                <Menu size={18} />
             </div>
             <div className={`absolute transition-all duration-500 ease-out ${isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`}>
                <X size={18} />
             </div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`absolute top-[72px] left-4 right-4 z-40 bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl transition-all duration-500 ease-out overflow-hidden lg:hidden
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-2">
          {navLinks.map((link, i) => (
            <a key={link} href="#" className="py-3 px-4 rounded-lg hover:bg-gray-800/50 text-sm font-medium transition-colors" style={{ transitionDelay: `${i * 50}ms` }}>
              {link}
            </a>
          ))}
          <div className="sm:hidden border-t border-gray-800 mt-2 pt-2 px-2 flex gap-3">
             <button className="flex-1 flex items-center justify-center gap-2 liquid-glass rounded-full py-2 text-sm">
                <Search size={16} /> Search
             </button>
             <button className="w-10 h-10 flex items-center justify-center liquid-glass rounded-full shrink-0">
                <User size={16} />
             </button>
          </div>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16 z-10 pointer-events-none">
        
        {/* STAGE 1 CONTENT */}
        {stage === 1 && (
          <div className={`flex flex-col md:flex-row items-end gap-8 w-full ${isStage1Exiting ? 'ui-exit' : 'opacity-100 transition-opacity duration-300'}`}>
            <div className="flex-1 pointer-events-auto">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm animate-blur-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2">
                  <Star size={16} className="fill-white sm:w-5 sm:h-5" />
                  <span className="font-medium">8.7/10 IMDB</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock size={16} />
                  <span>132 min</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar size={16} />
                  <span>April, 2025</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6 animate-blur-fade-up" style={{ animationDelay: '400ms' }}>
                Step Through. Work Smarter.
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up" style={{ animationDelay: '500ms' }}>
                Every great workflow starts somewhere. Step through and see where yours could live.
              </p>
            </div>

            <div className="w-full md:w-auto pointer-events-auto shrink-0 pb-2">
              <button 
                onClick={handleEnter}
                className="w-full md:w-auto liquid-glass rounded-full px-8 py-4 flex items-center justify-center gap-3 text-lg font-medium group animate-blur-fade-up"
                style={{ animationDelay: '600ms' }}
              >
                Step In
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2 CONTENT */}
        {stage === 2 && (
          <div className={`flex flex-col md:flex-row items-end gap-8 w-full ${isStage2Exiting ? 'ui-exit' : 'opacity-100 transition-opacity duration-300'}`}>
            <div className="flex-1 pointer-events-auto">
              <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 mb-6 md:mb-8 text-xs sm:text-sm animate-blur-fade-up" style={{ animationDelay: '100ms' }}>
                <MapPin size={14} />
                <span>Now Inside — Luxury Pavilion</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6 animate-blur-fade-up" style={{ animationDelay: '250ms' }}>
                You're In.
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up" style={{ animationDelay: '400ms' }}>
                The noise is gone. Take a look around the space designed for pure focus and elegance.
              </p>
            </div>

            <div className="w-full md:w-auto pointer-events-auto shrink-0 pb-2 flex justify-start">
              <button 
                onClick={handleExit}
                className="liquid-glass rounded-full px-6 py-4 flex items-center justify-center gap-3 text-sm font-medium group animate-blur-fade-up"
                style={{ animationDelay: '500ms' }}
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Exit Space
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STAGE 2 HOTSPOTS */}
      {stage === 2 && !isStage2Exiting && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <button className="absolute top-[40%] left-[25%] liquid-glass rounded-full px-4 py-2 text-xs font-medium pointer-events-auto animate-blur-fade-up hover:scale-105" style={{ animationDelay: '600ms' }}>
            Living Area
          </button>
          <button className="absolute top-[60%] left-[75%] liquid-glass rounded-full px-4 py-2 text-xs font-medium pointer-events-auto animate-blur-fade-up hover:scale-105" style={{ animationDelay: '700ms' }}>
            Terrace View
          </button>
          <button className="absolute top-[30%] left-[60%] liquid-glass rounded-full px-4 py-2 text-xs font-medium pointer-events-auto animate-blur-fade-up hover:scale-105" style={{ animationDelay: '800ms' }}>
            Gallery
          </button>
        </div>
      )}

    </div>
  );
}