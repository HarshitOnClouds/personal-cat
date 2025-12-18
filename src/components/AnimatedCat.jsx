import React from 'react';

const AnimatedCat = ({ mood, color = '#6B7280' }) => {
  // Different animations based on mood
  const getTailAnimation = () => {
    switch (mood) {
      case 'grumpy':
      case 'scared':
        return 'animate-tail-angry';
      case 'sleepy':
        return 'animate-tail-slow';
      case 'happy':
      case 'playful':
        return 'animate-tail-happy';
      default:
        return 'animate-tail-normal';
    }
  };

  const getEyeState = () => {
    switch (mood) {
      case 'sleepy':
        return { left: 'M15,30 Q17,32 19,30', right: 'M31,30 Q33,32 35,30' }; // Closed eyes
      case 'scared':
        return { left: 'M17,28 A2,2 0 1,1 17,32', right: 'M33,28 A2,2 0 1,1 33,32' }; // Wide open
      case 'grumpy':
        return { left: 'M15,32 L19,28', right: 'M31,28 L35,32' }; // Angry eyes
      default:
        return { left: 'M17,30 A1.5,1.5 0 1,1 17,30.1', right: 'M33,30 A1.5,1.5 0 1,1 33,30.1' }; // Normal dots
    }
  };

  const getMouthShape = () => {
    switch (mood) {
      case 'happy':
      case 'playful':
        return 'M22,38 Q25,40 28,38'; // Smile
      case 'grumpy':
        return 'M22,40 Q25,38 28,40'; // Frown
      case 'scared':
        return 'M25,38 A2,2 0 1,1 25,38.1'; // Small O
      default:
        return 'M22,38 L28,38'; // Neutral line
    }
  };

  const eyes = getEyeState();

  return (
    <div className="relative inline-block">
      <style>{`
        @keyframes tail-wag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes tail-angry {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes tail-slow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes tail-happy {
          0%, 100% { transform: rotate(-5deg); }
          25% { transform: rotate(25deg); }
          75% { transform: rotate(-25deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes ear-twitch {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        
        .animate-tail-normal {
          animation: tail-wag 2s ease-in-out infinite;
          transform-origin: top center;
        }
        .animate-tail-angry {
          animation: tail-angry 0.5s ease-in-out infinite;
          transform-origin: top center;
        }
        .animate-tail-slow {
          animation: tail-slow 4s ease-in-out infinite;
          transform-origin: top center;
        }
        .animate-tail-happy {
          animation: tail-happy 1s ease-in-out infinite;
          transform-origin: top center;
        }
        .animate-bounce-cat {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .animate-ear-left {
          animation: ear-twitch 5s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .animate-ear-right {
          animation: ear-twitch 5s ease-in-out infinite 0.5s;
          transform-origin: bottom center;
        }
      `}</style>
      
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        className="animate-bounce-cat"
      >
        {/* Tail */}
        <g className={getTailAnimation()}>
          <path
            d="M75,65 Q85,50 90,35 Q92,25 88,20"
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="88" cy="20" r="3" fill={color} />
        </g>

        {/* Body */}
        <ellipse cx="50" cy="70" rx="25" ry="20" fill={color} />

        {/* Head */}
        <circle cx="25" cy="30" r="20" fill={color} />

        {/* Left Ear */}
        <path
          d="M10,20 L5,5 L18,15 Z"
          fill={color}
          className="animate-ear-left"
        />
        <path
          d="M10,20 L8,10 L15,16 Z"
          fill="#FFC0CB"
        />

        {/* Right Ear */}
        <path
          d="M40,20 L45,5 L32,15 Z"
          fill={color}
          className="animate-ear-right"
        />
        <path
          d="M40,20 L42,10 L35,16 Z"
          fill="#FFC0CB"
        />

        {/* Eyes */}
        <path
          d={eyes.left}
          stroke="#000"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={eyes.right}
          stroke="#000"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Nose */}
        <circle cx="25" cy="35" r="2" fill="#FF69B4" />

        {/* Mouth */}
        <path
          d={getMouthShape()}
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Whiskers - Left */}
        <line x1="10" y1="32" x2="2" y2="30" stroke="#000" strokeWidth="1" />
        <line x1="10" y1="35" x2="2" y2="35" stroke="#000" strokeWidth="1" />
        <line x1="10" y1="38" x2="2" y2="40" stroke="#000" strokeWidth="1" />

        {/* Whiskers - Right */}
        <line x1="40" y1="32" x2="48" y2="30" stroke="#000" strokeWidth="1" />
        <line x1="40" y1="35" x2="48" y2="35" stroke="#000" strokeWidth="1" />
        <line x1="40" y1="38" x2="48" y2="40" stroke="#000" strokeWidth="1" />

        {/* Front Legs */}
        <rect x="40" y="75" width="6" height="15" rx="3" fill={color} />
        <rect x="50" y="75" width="6" height="15" rx="3" fill={color} />

        {/* Back Legs */}
        <rect x="65" y="80" width="6" height="12" rx="3" fill={color} />
        <rect x="73" y="80" width="6" height="12" rx="3" fill={color} />

        {/* Paws */}
        <ellipse cx="43" cy="90" rx="4" ry="2" fill={color} />
        <ellipse cx="53" cy="90" rx="4" ry="2" fill={color} />
        <ellipse cx="68" cy="92" rx="4" ry="2" fill={color} />
        <ellipse cx="76" cy="92" rx="4" ry="2" fill={color} />
      </svg>
    </div>
  );
};

export default AnimatedCat;
