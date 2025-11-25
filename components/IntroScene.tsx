import React from 'react';
import { Confetti } from './Confetti';

interface Props {
  onOpen: () => void;
}

export const IntroScene: React.FC<Props> = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-pink-300 via-pink-400 to-purple-400 relative overflow-hidden px-4">
      <Confetti />
      <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-md mb-12 text-center animate-bounce font-serif tracking-wider leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        恭喜公主<br/>24 岁啦！
      </h1>
      
      <div 
        className="relative group cursor-pointer animate-float" 
        onClick={onOpen}
      >
        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-8 bg-black/20 rounded-[50%] blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-black/30"></div>

        {/* Gift Box Container */}
        <div className="relative w-72 h-64 transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2">
            
            {/* Box Body */}
            <div className="absolute bottom-0 w-full h-56 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-rose-400 to-pink-600 border border-pink-300/50">
                {/* Subtle Polka Dot Pattern */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '24px 24px' }}>
                </div>
                
                {/* Vertical Ribbon */}
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-14 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-sm border-x border-yellow-200/50"></div>
            </div>

            {/* Lid */}
            <div className="absolute top-4 -left-2 w-[112%] h-16 rounded-md shadow-lg bg-gradient-to-br from-rose-500 to-pink-700 border-t border-pink-400 z-10">
                 {/* Lid Ribbon */}
                 <div className="absolute left-1/2 -translate-x-1/2 h-full w-14 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 border-x border-yellow-200/50"></div>
            </div>

            {/* Bow (Inline SVG for custom shape) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 z-20 drop-shadow-lg">
                <svg viewBox="0 0 100 60" className="w-full h-full fill-current text-yellow-400">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor:'#FCD34D', stopOpacity:1}} />
                            <stop offset="50%" style={{stopColor:'#F59E0B', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:'#FCD34D', stopOpacity:1}} />
                        </linearGradient>
                        <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style={{stopColor:'#FCD34D', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:'#B45309', stopOpacity:1}} />
                        </radialGradient>
                    </defs>
                    <path d="M50 30 C 50 30, 30 0, 10 10 C -5 20, 20 40, 45 32 L 50 30" fill="url(#grad1)" stroke="#d4af37" strokeWidth="0.5" />
                    <path d="M50 30 C 50 30, 70 0, 90 10 C 105 20, 80 40, 55 32 L 50 30" fill="url(#grad1)" stroke="#d4af37" strokeWidth="0.5" />
                    <circle cx="50" cy="30" r="6" fill="url(#grad2)" stroke="#d4af37" strokeWidth="0.5" />
                    <path d="M45 35 Q 30 55, 15 50 L 25 55 Q 40 55, 48 35" fill="url(#grad1)" />
                    <path d="M55 35 Q 70 55, 85 50 L 75 55 Q 60 55, 52 35" fill="url(#grad1)" />
                </svg>
            </div>
            
             {/* Sparkles */}
             <div className="absolute -top-8 -right-8 text-yellow-200 animate-pulse text-3xl">✨</div>
             <div className="absolute top-1/2 -left-12 text-yellow-200 animate-pulse delay-75 text-2xl">✨</div>
             <div className="absolute -bottom-4 -right-4 text-white animate-pulse delay-150 text-xl">✨</div>
        </div>
      </div>

      <button 
        onClick={onOpen}
        className="mt-16 px-10 py-3 bg-white/90 backdrop-blur-sm text-pink-600 text-lg md:text-xl font-bold rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all z-20 border-2 border-pink-200 animate-pulse hover:animate-none"
      >
        点击打开包装 🎁
      </button>
    </div>
  );
};