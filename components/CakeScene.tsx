import React, { useState, useEffect, useRef } from 'react';
import { Flame } from 'lucide-react';

interface Props {
  isLit: boolean;
  onLight: () => void;
  onBlowStart?: () => void;
}

export const CakeScene: React.FC<Props> = ({ isLit, onLight, onBlowStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lighterPos, setLighterPos] = useState({ x: 0, y: 0 });
  const [showLighter, setShowLighter] = useState(true);

  useEffect(() => {
    if (isLit) {
      setTimeout(() => setShowLighter(false), 1000);
    }
  }, [isLit]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLit) return;
    
    // Use the ref to get the bounding rectangle of the container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setLighterPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isLit) return;
    
    // Use the ref to get the bounding rectangle of the container
    if (containerRef.current && e.touches.length > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      setLighterPos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center h-full w-full bg-slate-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={!isLit ? onLight : undefined}
    >
      {/* Background Ambience - CSS Only */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 pointer-events-none">
         {/* Simulated Bokeh Lights */}
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
         <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      {isLit && (
        <div className="absolute top-12 w-full text-center z-20 animate-fade-in pointer-events-none px-4">
           <h2 className="text-2xl md:text-3xl text-gold font-serif italic drop-shadow-md tracking-widest">许个愿吧，公主殿下...</h2>
           <p className="text-white/60 text-xs md:text-sm mt-2">闭上眼睛，在心里默念你的愿望</p>
        </div>
      )}

      {/* Cake Container - Scale adjusted for Portrait */}
      <div className="relative mt-20 transform scale-90 md:scale-150 transition-all duration-1000 z-10 pointer-events-none">
        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-gray-200 rounded-[50%] shadow-xl"></div>
        
        {/* Cake Body Layer 1 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-24 bg-pink-300 rounded-b-lg shadow-inner border-b-4 border-pink-400"></div>
        {/* Cake Body Layer 2 */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-20 bg-pink-200 rounded-b-lg shadow-inner border-b-4 border-pink-300"></div>
        
        {/* Frosting Details */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-56 h-4 bg-white rounded-full opacity-80"></div>

        {/* Candles Container */}
        <div className="absolute bottom-44 left-1/2 -translate-x-1/2 flex space-x-4">
           {/* Number 2 */}
           <div className="relative">
             <div className="text-8xl font-bold text-gold drop-shadow-lg" style={{ fontFamily: 'serif' }}>2</div>
             {/* Candle Wick 2 - Shifted to 38% */}
             <div className="absolute -top-4 left-[38%] -translate-x-1/2 w-1 h-4 bg-gray-700"></div>
             {isLit && (
               <div className="absolute -top-12 left-[38%] -translate-x-1/2 w-8 h-12 bg-orange-500 rounded-full blur-sm animate-flicker box-shadow-fire"></div>
             )}
             {isLit && (
               <div className="absolute -top-10 left-[38%] -translate-x-1/2 w-4 h-8 bg-yellow-300 rounded-full animate-flicker"></div>
             )}
           </div>

           {/* Number 4 */}
           <div className="relative">
             <div className="text-8xl font-bold text-gold drop-shadow-lg" style={{ fontFamily: 'serif' }}>4</div>
             {/* Candle Wick 4 - Shifted to 38% */}
             <div className="absolute -top-4 left-[38%] -translate-x-1/2 w-1 h-4 bg-gray-700"></div>
             {isLit && (
               <div className="absolute -top-12 left-[38%] -translate-x-1/2 w-8 h-12 bg-orange-500 rounded-full blur-sm animate-flicker box-shadow-fire"></div>
             )}
             {isLit && (
               <div className="absolute -top-10 left-[38%] -translate-x-1/2 w-4 h-8 bg-yellow-300 rounded-full animate-flicker"></div>
             )}
           </div>
        </div>
      </div>

      {/* Lighter Cursor (Custom visual) */}
      {!isLit && showLighter && (
        <div 
          className="absolute pointer-events-none transition-transform duration-75 z-50"
          style={{ 
            left: lighterPos.x, 
            top: lighterPos.y,
            transform: 'translate(-50%, -50%) rotate(-15deg)'
          }}
        >
          <div className="w-12 h-24 bg-gray-800 rounded-md border-2 border-gray-600 flex flex-col items-center shadow-2xl">
             <div className="w-full h-8 bg-gray-400 rounded-t-md border-b border-gray-900"></div>
             <Flame className="text-orange-500 absolute -top-8 animate-pulse" fill="orange" />
          </div>
        </div>
      )}
      
      {isLit && onBlowStart && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBlowStart();
          }}
          className="absolute bottom-24 px-8 py-3 bg-pink-500/80 backdrop-blur-sm text-white rounded-full font-bold shadow-lg animate-pulse hover:bg-pink-600 transition-colors z-50 border border-pink-300"
        >
          许愿完成，吹蜡烛 🎂
        </button>
      )}
    </div>
  );
};