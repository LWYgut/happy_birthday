import React, { useState, useEffect, useRef } from 'react';
import { Scene } from './types';
import { IntroScene } from './components/IntroScene';
import { CakeScene } from './components/CakeScene';
import { BlowScene } from './components/BlowScene';
import { CelebrationScene } from './components/CelebrationScene';
import { HAPPY_BIRTHDAY_MUSIC_URL } from './constants';

const App: React.FC = () => {
  const [scene, setScene] = useState<Scene>(Scene.Intro);
  const [isPortrait, setIsPortrait] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', checkOrientation);
    checkOrientation();
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const playMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(HAPPY_BIRTHDAY_MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    audioRef.current.play().catch(e => console.log("Audio play failed (user must interact first)", e));
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleNextScene = () => {
    if (scene === Scene.Intro) {
      setScene(Scene.CakeClosed);
    } else if (scene === Scene.CakeClosed) {
      setScene(Scene.CakeOpen);
      // Wait a moment then transition to wish automatically or via lighting?
      // Design: CakeClosed -> User Lights -> Wish -> Blow
    }
  };

  // Scene Flow Logic
  const handleOpenGift = () => {
    setScene(Scene.CakeClosed);
  };

  const handleLightCandles = () => {
    setScene(Scene.Wish);
    playMusic();
  };

  const handleBlowStart = () => {
    setScene(Scene.Blow);
  };

  const handleBlowOut = () => {
    stopMusic();
    setScene(Scene.Celebration);
  };

  if (isPortrait) {
    return (
      <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="text-4xl mb-4">📱➡️🔄</div>
        <h1 className="text-2xl font-bold mb-2">请横屏观看</h1>
        <p className="text-gray-400">为了最好的体验，请旋转手机<br/>(Please rotate your phone)</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden font-sans select-none">
      {scene === Scene.Intro && <IntroScene onOpen={handleOpenGift} />}
      
      {(scene === Scene.CakeClosed || scene === Scene.CakeOpen || scene === Scene.Wish) && (
        <CakeScene 
          isLit={scene === Scene.Wish} 
          onLight={handleLightCandles}
          onBlowStart={scene === Scene.Wish ? handleBlowStart : undefined}
        />
      )}

      {scene === Scene.Blow && <BlowScene onBlowOut={handleBlowOut} />}
      
      {scene === Scene.Celebration && <CelebrationScene />}
    </div>
  );
};

export default App;