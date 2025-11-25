import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const Confetti: React.FC = () => {
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const frame = () => {
      // Left side burst
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        // Balanced mix: Dark Pink, Gold, Light Pink, White
        colors: ['#FF69B4', '#FFD700', '#FFB7C5', '#FFFFFF'], 
        disableForReducedMotion: true,
        scalar: 1.2
      });
      
      // Right side burst
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FFD700', '#FFB7C5', '#FFFFFF'],
        disableForReducedMotion: true,
        scalar: 1.2
      });

      // Continue indefinitely until unmount
      animationFrameId.current = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      // Cleanup: stop animation and clear canvas when user clicks open (component unmounts)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      confetti.reset();
    };
  }, []);

  return null;
};