/**
 * Sentiment and Intent Detector
 * Lightweight keyword-based analysis without ML
 */

import { SENTIMENTS } from './responseBank';

// Keyword banks for sentiment detection
const SENTIMENT_KEYWORDS = {
  happy: [
    'happy', 'joy', 'great', 'awesome', 'wonderful', 'love', 'good', 'nice',
    'excellent', 'amazing', 'fantastic', 'yay', 'haha', 'lol', 'thank', 'thanks',
    'appreciate', 'perfect', 'best', 'glad', 'excited', '😊', '😄', '😃', '🥰',
    '❤️', '💕', '💖', '✨', 'beautiful', 'lovely', 'sweet', 'cute'
  ],
  
  sad: [
    'sad', 'cry', 'crying', 'unhappy', 'depressed', 'lonely', 'hurt', 'pain',
    'bad', 'terrible', 'awful', 'miss', 'lost', 'gone', 'alone', 'sorry',
    'apologize', 'regret', 'wish', 'sigh', '😢', '😭', '😔', '💔', '😞',
    'down', 'blue', 'upset', 'disappointed', 'heartbroken'
  ],
  
  angry: [
    'angry', 'mad', 'hate', 'annoyed', 'irritated', 'frustrated', 'furious',
    'rage', 'stupid', 'dumb', 'idiot', 'damn', 'hell', 'shut', 'stop',
    'leave', 'go away', 'annoying', 'wtf', 'ugh', '😠', '😡', '🤬', '💢',
    'pissed', 'fed up', 'enough', 'grr'
  ]
};

// Intent detection keywords
const INTENT_KEYWORDS = {
  affection: [
    'love', 'hug', 'pet', 'cuddle', 'snuggle', 'kiss', 'adorable', 'cute',
    'sweet', 'precious', 'baby', 'good cat', 'good kitty', 'pat', 'stroke',
    'scratch', 'rub', 'belly', 'head', 'chin', '🥰', '❤️', '💕', '💖'
  ],
  
  food: [
    'food', 'eat', 'hungry', 'feed', 'treat', 'snack', 'fish', 'tuna',
    'chicken', 'meat', 'kibble', 'dinner', 'breakfast', 'lunch', 'meal',
    'nom', 'yummy', 'hungry', 'starving', 'belly', '🍽️', '🐟', '🍗'
  ],
  
  question: [
    'what', 'why', 'how', 'when', 'where', 'who', 'can you', 'could you',
    'would you', 'will you', 'do you', 'are you', 'is it', 'explain',
    'tell me', 'know', 'understand', '?', 'meaning', 'think'
  ],
  
  play: [
    'play', 'toy', 'game', 'chase', 'catch', 'hunt', 'pounce', 'ball',
    'string', 'laser', 'mouse', 'feather', 'run', 'jump', 'fun', 'energy'
  ],
  
  complex: [
    'calculate', 'compute', 'solve', 'analyze', 'explain', 'detailed',
    'technical', 'specific', 'exactly', 'precisely', 'algorithm', 'code',
    'program', 'website', 'help me with', 'need you to', 'can you help'
  ]
};

export function detectSentiment(message) {
  const lowerMessage = message.toLowerCase();
  const scores = {
    happy: 0,
    sad: 0,
    angry: 0
  };

  // Count keyword matches
  Object.entries(SENTIMENT_KEYWORDS).forEach(([sentiment, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        scores[sentiment]++;
      }
    });
  });

  // Find dominant sentiment
  const maxScore = Math.max(...Object.values(scores));
  
  if (maxScore === 0) {
    return SENTIMENTS.NEUTRAL;
  }

  const dominant = Object.entries(scores).find(([_, score]) => score === maxScore);
  return SENTIMENTS[dominant[0].toUpperCase()];
}

export function detectIntent(message) {
  const lowerMessage = message.toLowerCase();
  const scores = {};

  // Count intent keyword matches
  Object.entries(INTENT_KEYWORDS).forEach(([intent, keywords]) => {
    scores[intent] = 0;
    keywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        scores[intent]++;
      }
    });
  });

  // Find strongest intent
  const maxScore = Math.max(...Object.values(scores));
  
  if (maxScore === 0) {
    return 'neutral';
  }

  const dominant = Object.entries(scores).find(([_, score]) => score === maxScore);
  return dominant[0];
}

export function analyzeMessage(message) {
  const sentiment = detectSentiment(message);
  const intent = detectIntent(message);
  
  // Check message length and complexity
  const words = message.trim().split(/\s+/).length;
  const isComplex = words > 15 || intent === 'complex';
  const isQuestion = message.includes('?') || intent === 'question';
  
  return {
    sentiment,
    intent,
    isComplex,
    isQuestion,
    length: words
  };
}
