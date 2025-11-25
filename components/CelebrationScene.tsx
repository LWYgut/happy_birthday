import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const CelebrationScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fireworks Loop
  useEffect(() => {
    const duration = 60 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // 模拟更真实的烟花效果
      const particleCount = 50;
      
      // 随机在屏幕上方区域绽放
      const originX = randomInRange(0.1, 0.9);
      const originY = randomInRange(0.1, 0.4);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: { x: originX, y: originY },
        colors: ['#FFD700', '#FF69B4', '#00FFFF', '#FFFFFF', '#FF4500'],
        shapes: ['star', 'circle'], // 增加星星形状
        scalar: 1.2, // 稍微变大
        drift: 0,
        ticks: 200, // 停留时间更长
        gravity: 0.8
      });

      // 偶尔增加一些小的闪烁粒子
      if (Math.random() > 0.5) {
         confetti({
           particleCount: 30,
           startVelocity: 45,
           spread: 100,
           origin: { x: originX, y: originY },
           colors: ['#FFFFFF', '#FFD700'],
           shapes: ['circle'],
           scalar: 0.5,
           decay: 0.9,
           gravity: 1.5
         });
      }

    }, 800); // 频率适中

    return () => clearInterval(interval);
  }, []);

  // Drone Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Define drone formation points (spelling "24")
    const points: {x: number, y: number, color: string, phase: number}[] = [];
    
    // ADJUSTED CENTER Y: Moved up from 1/3 to 1/5 to avoid overlap with the card
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 5; 

    // A simple "2" shape
    const shape2 = [[0,0], [1,0], [2,0], [2,1], [2,2], [1,2], [0,2], [0,3], [0,4], [1,4], [2,4]];
    // A simple "4" shape
    const shape4 = [[4,0], [4,1], [4,2], [5,2], [6,2], [6,1], [6,0], [6,3], [6,4]];
    
    // Convert logic grid to canvas coordinates
    [...shape2, ...shape4].forEach(([px, py], index) => {
      points.push({
        x: centerX + (px - 3) * 40, // Offset to center and scale up
        y: centerY + (py - 2) * 40,
        color: '#00FFFF', // Cyan drones
        phase: Math.random() * Math.PI * 2
      });
    });

    let frame = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars (Background)
      for(let i=0; i<5; i++) {
        ctx.fillStyle = 'white';
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Drones
      points.forEach((p) => {
        ctx.globalAlpha = 1;
        // Hover effect
        const hoverY = Math.sin(frame * 0.05 + p.phase) * 5;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y + hoverY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Drone Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
      });
      ctx.shadowBlur = 0;

      frame++;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="h-full w-full bg-slate-950 relative flex flex-col items-center justify-center pb-20 overflow-hidden">
      
      {/* Background Blooming Fireworks (CSS Animation) */}
      <style>{`
        @keyframes firework-bloom {
          0% { transform: scale(0); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        .bloom-effect {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: firework-bloom 5s infinite ease-out;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="bloom-effect bg-pink-500 w-64 h-64 top-10 left-10" style={{ animationDelay: '0s' }}></div>
          <div className="bloom-effect bg-blue-500 w-72 h-72 top-1/4 right-20" style={{ animationDelay: '1.5s' }}></div>
          <div className="bloom-effect bg-yellow-400 w-56 h-56 bottom-20 left-1/3" style={{ animationDelay: '2.5s' }}></div>
          <div className="bloom-effect bg-purple-500 w-80 h-80 top-1/2 right-1/4" style={{ animationDelay: '3.5s' }}></div>
          <div className="bloom-effect bg-red-500 w-60 h-60 bottom-1/4 left-10" style={{ animationDelay: '1s' }}></div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none z-10" />
      
      {/* Message Card */}
      <div className="relative z-20 bg-white/10 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/20 max-w-3xl text-center mx-4 animate-float shadow-[0_0_50px_rgba(255,105,180,0.3)] transform hover:scale-105 transition-transform duration-500 mt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-300 drop-shadow-lg mb-8 animate-pulse">
            ✨ 生日快乐 ✨
        </h1>
        <p className="text-2xl md:text-4xl text-white font-serif tracking-wider leading-relaxed drop-shadow-md">
           恭喜小宝<br/>
           <span className="text-3xl md:text-5xl text-yellow-300 mt-4 block font-bold">
             获得惊喜小礼物 🎁
           </span>
        </p>
      </div>
      
    </div>
  );
};