import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function Home() {
  const [catState, setCatState] = useState('sleeping'); // sleeping, awake
  const [touchStart, setTouchStart] = useState(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audioPoolRef = useRef({});
  const catRef = useRef(null);

  // Sound file mapping
  const soundMap = {
    'up': '/catsounds/1.mp3',
    'down': '/catsounds/2.mp3',
    'left': '/catsounds/3.mp3',
    'right': '/catsounds/4.mp3',
    'up-left': '/catsounds/5.mp3',
    'up-right': '/catsounds/6.mp3',
    'down-left': '/catsounds/7.mp3',
    'down-right': '/catsounds/8.mp3',
  };

  // Pre-load all audio files and create audio pool
  useEffect(() => {
    const pool = {};
    Object.entries(soundMap).forEach(([direction, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.load();
      pool[direction] = audio;
    });
    audioPoolRef.current = pool;
  }, []);

  // Unlock audio on first user interaction (required for mobile)
  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    
    // Play and immediately pause all audio to unlock them on mobile
    Object.values(audioPoolRef.current).forEach((audio) => {
      // Create a silent play to unlock
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
        }).catch(() => {
          // Ignore errors during unlock attempt
          audio.volume = 1;
        });
      }
    });
    
    setAudioUnlocked(true);
  }, [audioUnlocked]);

  const getSwipeDirection = (startX, startY, endX, endY) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    // Determine if horizontal or vertical swipe dominates
    if (absDx > absDy) {
      // Horizontal swipe
      if (absDx < 30) return null; // Too short
      return dx > 0 ? 'right' : 'left';
    } else {
      // Vertical swipe
      if (absDy < 30) return null; // Too short
      return dy > 0 ? 'down' : 'up';
    }
  };

  const getDiagonalDirection = (startX, startY, endX, endY) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 30) return null;
    
    // Calculate angle in degrees
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Map angle to 8 directions
    if (angle >= -22.5 && angle < 22.5) return 'right';
    if (angle >= 22.5 && angle < 67.5) return 'down-right';
    if (angle >= 67.5 && angle < 112.5) return 'down';
    if (angle >= 112.5 && angle < 157.5) return 'down-left';
    if (angle >= 157.5 || angle < -157.5) return 'left';
    if (angle >= -157.5 && angle < -112.5) return 'up-left';
    if (angle >= -112.5 && angle < -67.5) return 'up';
    if (angle >= -67.5 && angle < -22.5) return 'up-right';
    
    return null;
  };

  const playSound = (direction) => {
    if (!direction) return;
    
    const audio = audioPoolRef.current[direction];
    if (audio) {
      // Reset and play from the pre-loaded audio pool
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
    
    // Wake up cat
    setCatState('awake');
    
    // Return to sleeping after sound duration (approx 2 seconds)
    setTimeout(() => {
      setCatState('sleeping');
    }, 2000);
  };

  const handleTouchStart = (e) => {
    // Unlock audio on first touch
    unlockAudio();
    
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touch = e.changedTouches[0];
    const direction = getDiagonalDirection(
      touchStart.x,
      touchStart.y,
      touch.clientX,
      touch.clientY
    );
    
    playSound(direction);
    setTouchStart(null);
  };

  const handleMouseDown = (e) => {
    // Unlock audio on first click
    unlockAudio();
    
    setTouchStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    if (!touchStart) return;
    
    const direction = getDiagonalDirection(
      touchStart.x,
      touchStart.y,
      e.clientX,
      e.clientY
    );
    
    playSound(direction);
    setTouchStart(null);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="text-center">
        <p className="text-4xl font-bold text-purple-800 mb-8">Swipe to pet in the 8 directions</p>
        {audioUnlocked ? null : (
          <button
            onClick={unlockAudio}
            className="mb-4 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Click here to enable sound
          </button>
        )}
        
        <div 
          ref={catRef}
          className="relative w-80 h-80 cursor-pointer select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Cat SVG */}
          <svg
            viewBox="0 0 200 200"
            className={`w-full h-full transition-transform duration-300 ${
              catState === 'awake' ? 'scale-110' : 'scale-100'
            }`}
          >
            {/* Cat body */}
            <ellipse
              cx="100"
              cy="120"
              rx="60"
              ry="40"
              fill="#FF8C42"
              className="transition-all duration-500"
            />
            
            {/* Cat head */}
            <circle
              cx="100"
              cy={catState === 'awake' ? '70' : '80'}
              r="40"
              fill="#FF8C42"
              className="transition-all duration-500"
            />
            
            {/* Left ear */}
            <polygon
              points={catState === 'awake' ? '75,45 70,25 85,40' : '75,55 70,35 85,50'}
              fill="#FF8C42"
              className="transition-all duration-500"
            />
            
            {/* Right ear */}
            <polygon
              points={catState === 'awake' ? '125,45 130,25 115,40' : '125,55 130,35 115,50'}
              fill="#FF8C42"
              className="transition-all duration-500"
            />
            
            {/* Inner ears */}
            <polygon
              points={catState === 'awake' ? '77,42 75,30 83,40' : '77,52 75,40 83,50'}
              fill="#FFB4B4"
              className="transition-all duration-500"
            />
            <polygon
              points={catState === 'awake' ? '123,42 125,30 117,40' : '123,52 125,40 117,50'}
              fill="#FFB4B4"
              className="transition-all duration-500"
            />
            
            {/* Eyes */}
            {catState === 'sleeping' ? (
              <>
                <line x1="85" y1="75" x2="95" y2="75" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                <line x1="105" y1="75" x2="115" y2="75" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="90" cy="70" r="5" fill="#000" />
                <circle cx="110" cy="70" r="5" fill="#000" />
                <circle cx="91" cy="69" r="2" fill="#fff" />
                <circle cx="111" cy="69" r="2" fill="#fff" />
              </>
            )}
            
            {/* Nose */}
            <polygon
              points={`100,${catState === 'awake' ? '78' : '83'} 97,${catState === 'awake' ? '82' : '87'} 103,${catState === 'awake' ? '82' : '87'}`}
              fill="#FF69B4"
              className="transition-all duration-500"
            />
            
            {/* Mouth */}
            <path
              d={catState === 'awake' 
                ? 'M 100 82 Q 95 86 90 84 M 100 82 Q 105 86 110 84'
                : 'M 100 87 Q 95 89 90 88 M 100 87 Q 105 89 110 88'
              }
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            
            {/* Whiskers */}
            <line x1="60" y1={catState === 'awake' ? '68' : '73'} x2="80" y2={catState === 'awake' ? '70' : '75'} stroke="#000" strokeWidth="1.5" className="transition-all duration-500" />
            <line x1="60" y1={catState === 'awake' ? '75' : '80'} x2="80" y2={catState === 'awake' ? '75' : '80'} stroke="#000" strokeWidth="1.5" className="transition-all duration-500" />
            <line x1="140" y1={catState === 'awake' ? '68' : '73'} x2="120" y2={catState === 'awake' ? '70' : '75'} stroke="#000" strokeWidth="1.5" className="transition-all duration-500" />
            <line x1="140" y1={catState === 'awake' ? '75' : '80'} x2="120" y2={catState === 'awake' ? '75' : '80'} stroke="#000" strokeWidth="1.5" className="transition-all duration-500" />
            
            {/* Tail */}
            <path
              d={catState === 'awake' 
                ? 'M 155 125 Q 175 115 180 100'
                : 'M 155 130 Q 170 135 175 140'
              }
              stroke="#FF8C42"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            
            {/* Front paws */}
            <ellipse cx="85" cy="155" rx="8" ry="12" fill="#FF8C42" />
            <ellipse cx="115" cy="155" rx="8" ry="12" fill="#FF8C42" />
          </svg>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>gently pet it hear different meows!</p>
        </div>
      </div>
    </div>
  );
}