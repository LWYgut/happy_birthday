import React, { useState, useRef } from 'react';
import { Scene } from './types';
import { IntroScene } from './components/IntroScene';
import { CakeScene } from './components/CakeScene';
import { BlowScene } from './components/BlowScene';
import { CelebrationScene } from './components/CelebrationScene';
import { HAPPY_BIRTHDAY_MUSIC_URL } from './constants';

const App: React.FC = () => {
  const [scene, setScene] = useState<Scene>(Scene.Intro);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(HAPPY_BIRTHDAY_MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 1.0; // Set to max volume
      audioRef.current.load(); // Ensure it loads
    }
    audioRef.current.play().catch(e => console.log("Audio play failed (user must interact first)", e));
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
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