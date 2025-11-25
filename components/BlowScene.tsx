import React, { useEffect, useRef, useState } from 'react';
import { Wind } from 'lucide-react';

interface Props {
  onBlowOut: () => void;
}

export const BlowScene: React.FC<Props> = ({ onBlowOut }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  const [isLit, setIsLit] = useState(true);
  const [volume, setVolume] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' }, 
          audio: true 
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Audio Analysis Setup
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        
        source.connect(analyser);
        analyser.fftSize = 256;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
        
        setHasPermission(true);
        checkBlow();
      } catch (err) {
        console.error("Media Access Error:", err);
        setHasPermission(false);
      }
    };

    startMedia();

    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkBlow = () => {
    if (!analyserRef.current || !dataArrayRef.current || !isLit) return;

    const detect = () => {
      if (!isLit) return; // Stop checking if already blown out
      
      analyserRef.current!.getByteFrequencyData(dataArrayRef.current!);
      
      let sum = 0;
      const length = dataArrayRef.current!.length;
      for (let i = 0; i < length / 2; i++) {
        sum += dataArrayRef.current![i];
      }
      const average = sum / (length / 2);
      
      setVolume(average);

      if (average > 80) { // Threshold
        handleBlowSuccess();
        return; 
      }

      requestAnimationFrame(detect);
    };
    detect();
  };

  const handleBlowSuccess = () => {
    if (!isLit) return;
    setIsLit(false);
    setTimeout(() => {
        onBlowOut();
    }, 2000); // Wait 2 seconds before changing scene to show extinguished candles
  };

  return (
    <div className="relative h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Camera Feed */}
      {hasPermission !== false && (
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-40 transform scale-x-[-1]" 
        />
      )}

      {/* Background Overlay for Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

      {/* Instructions Overlay */}
      <div className="absolute top-16 z-50 flex flex-col items-center w-full animate-bounce px-4 text-center">
         <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
             {isLit ? "请对准蜡烛用力吹气 🌬️" : "愿望达成！✨"}
         </h2>
         {isLit && <p className="text-white/80 text-sm mt-2 font-light">许个愿，然后吹灭它！</p>}
      </div>

      {/* CAKE VISUALS (Scale adjusted for Portrait) */}
      <div className="relative mt-20 transform scale-90 md:scale-150 z-20">
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
             {/* Wick shifted to 38% */}
             <div className="absolute -top-4 left-[38%] -translate-x-1/2 w-1 h-4 bg-gray-700"></div>
             {isLit && (
               <>
                <div className="absolute -top-12 left-[38%] -translate-x-1/2 w-8 h-12 bg-orange-500 rounded-full blur-sm animate-flicker box-shadow-fire"></div>
                <div className="absolute -top-10 left-[38%] -translate-x-1/2 w-4 h-8 bg-yellow-300 rounded-full animate-flicker"></div>
               </>
             )}
             {!isLit && (
                 <div className="absolute -top-16 left-[38%] -translate-x-1/2 text-gray-400 animate-float opacity-50">💨</div>
             )}
           </div>

           {/* Number 4 */}
           <div className="relative">
             <div className="text-8xl font-bold text-gold drop-shadow-lg" style={{ fontFamily: 'serif' }}>4</div>
             {/* Wick shifted to 38% */}
             <div className="absolute -top-4 left-[38%] -translate-x-1/2 w-1 h-4 bg-gray-700"></div>
             {isLit && (
               <>
                <div className="absolute -top-12 left-[38%] -translate-x-1/2 w-8 h-12 bg-orange-500 rounded-full blur-sm animate-flicker box-shadow-fire"></div>
                <div className="absolute -top-10 left-[38%] -translate-x-1/2 w-4 h-8 bg-yellow-300 rounded-full animate-flicker"></div>
               </>
             )}
             {!isLit && (
                 <div className="absolute -top-16 left-[38%] -translate-x-1/2 text-gray-400 animate-float opacity-50 delay-100">💨</div>
             )}
           </div>
        </div>
      </div>

      {/* Permission / Fallback Controls */}
      {hasPermission === false ? (
        <div className="absolute bottom-20 z-50 flex flex-col items-center text-white">
           <p className="mb-4 text-sm bg-black/50 px-4 py-2 rounded-lg">无法访问麦克风</p>
           <button 
             onClick={handleBlowSuccess}
             className="px-8 py-3 bg-pink-500 rounded-full font-bold shadow-lg animate-pulse hover:bg-pink-600 active:scale-95 transition-all"
           >
             点击手动吹灭 🌬️
           </button>
        </div>
      ) : (
        <>
            {/* Visual Volume Indicator */}
             <div className="absolute bottom-32 w-48 h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-green-400 transition-all duration-100 ease-out shadow-[0_0_10px_#4ade80]"
                  style={{ width: `${Math.min(volume, 100)}%` }}
                ></div>
              </div>
        </>
      )}
    </div>
  );
};