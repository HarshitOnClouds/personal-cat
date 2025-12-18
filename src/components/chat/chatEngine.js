/**
 * Chat Engine
 * Handles probabilistic decision making and response selection
 */

import { getResponses, getIntentResponses, INTENT_RESPONSES } from './responseBank';
import { analyzeMessage } from './sentimentDetector';
import { MOODS } from './catState';

export class ChatEngine {
  constructor(catState) {
    this.catState = catState;
  }

  // Main method to generate a response
  async generateResponse(userMessage) {
    const analysis = analyzeMessage(userMessage);
    const state = this.catState.getState();

    // Apply probabilistic decision making
    const decision = this.makeDecision(state, analysis);

    if (decision === 'ignore') {
      return this.selectResponse(INTENT_RESPONSES.ignore, state);
    }

    if (decision === 'delay') {
      // Return null to indicate delayed response
      return { delayed: true, delayMs: Math.random() * 3000 + 2000 }; // 2-5 seconds
    }

    // Handle specific intents
    if (analysis.intent === 'food' && state.hunger > 50) {
      const response = this.selectResponse(
        getIntentResponses('food', state),
        state
      );
      this.catState.feed();
      return response;
    }

    if (analysis.intent === 'affection') {
      this.catState.pet();
    }

    // Complex requests get deflected by cats (but playfully)
    if (analysis.isComplex) {
      const deflectResponses = [
        { id: 'deflect-1', text: '*stares blankly* ...that is a lot of words! mrrp?', variations: ['*confused* ...big human thoughts!', '...? *tilts head* say that in meow?'] },
        { id: 'deflect-2', text: 'I am just a cat! *shrugs* but I support you!', variations: ['mrrp! I believe in you tho!', 'you got this! *cheers* mew!'] },
        { id: 'deflect-3', text: '*knocks thing off table* oops! distraction!', variations: ['*swats object* look at this instead!', '*pushes item* this is more fun!'] },
        { id: 'deflect-4', text: '*grooms paw* hmm yes... very interesting... *not listening*', variations: ['*licks fur* uh huh... sure... *daydreaming*', '*cleans* fascinating... *thinking about tuna*'] },
        { id: 'deflect-5', text: 'meow! *that is my contribution*', variations: ['mrrp! *helpful cat noises*', 'mew! *moral support*'] },
        { id: 'deflect-6', text: 'I do not understand but I love you! ❤️', variations: ['no idea what you said but you are great!', '*supportive meow* you are amazing!'] }
      ];
      return this.selectResponse(deflectResponses, state);
    }

    // Questions get cat-like but sweet responses
    if (analysis.isQuestion) {
      const questionResponses = [
        { id: 'question-1', text: 'mew? *blinks thoughtfully*', variations: ['mrrp? *ponders*', '...? *thinks hard*'] },
        { id: 'question-2', text: '*tilts head* hmm good question!', variations: ['*considers* interesting question!', '...let me think... mrrp!'] },
        { id: 'question-3', text: 'I am just a cat! *shrugs cutely*', variations: ['*cat wisdom* just follow your heart!', 'mrrp! trust your instincts!'] },
        { id: 'question-4', text: 'the answer is... *dramatic pause* ...mew!', variations: ['obviously... *wise look* ...prr!', 'clearly... *nods* ...mrrp!'] },
        { id: 'question-5', text: '*looks wise* you already know the answer! ✨', variations: ['*mysterious* the answer is within you!', '*sage cat* trust yourself!'] }
      ];
      return this.selectResponse(questionResponses, state);
    }

    // Standard mood-based response
    const responsePool = getResponses(state.mood, analysis.sentiment);
    return this.selectResponse(responsePool, state);
  }

  // Probabilistic decision making based on cat state
  makeDecision(state, analysis) {
    // Probabilities vary by mood - adjusted to be kinder
    const probabilities = {
      [MOODS.SLEEPY]: { ignore: 0.2, delay: 0.3, respond: 0.5 },
      [MOODS.PLAYFUL]: { ignore: 0.02, delay: 0.08, respond: 0.9 },
      [MOODS.ANNOYED]: { ignore: 0.25, delay: 0.25, respond: 0.5 },
      [MOODS.AFFECTIONATE]: { ignore: 0.01, delay: 0.09, respond: 0.9 },
      [MOODS.CURIOUS]: { ignore: 0.08, delay: 0.15, respond: 0.77 }
    };

    // Low trust increases ignore chance
    const trustModifier = (100 - state.trust) / 200; // 0 to 0.5
    
    // Low energy increases ignore and delay
    const energyModifier = (100 - state.energy) / 200;

    let probs = probabilities[state.mood] || probabilities[MOODS.CURIOUS];
    
    // Apply modifiers
    probs = {
      ignore: Math.min(0.7, probs.ignore + trustModifier + energyModifier),
      delay: Math.min(0.4, probs.delay + energyModifier * 0.5),
      respond: probs.respond
    };

    // Normalize probabilities
    const total = probs.ignore + probs.delay + probs.respond;
    probs = {
      ignore: probs.ignore / total,
      delay: probs.delay / total,
      respond: probs.respond / total
    };

    // Affection and food reduce ignore chance
    if (analysis.intent === 'affection' || analysis.intent === 'food') {
      probs.ignore *= 0.3;
      probs.respond += probs.ignore * 0.7;
    }

    // Roll the dice
    const roll = Math.random();
    
    if (roll < probs.ignore) {
      return 'ignore';
    } else if (roll < probs.ignore + probs.delay) {
      return 'delay';
    } else {
      return 'respond';
    }
  }

  // Select response with anti-repetition logic
  selectResponse(responsePool, state) {
    if (!responsePool || responsePool.length === 0) {
      return { text: 'mrrp?', sound: null };
    }

    // Filter out recently used responses
    const availableResponses = responsePool.filter(
      response => !this.catState.wasRecentlyUsed(response.id)
    );

    // If all responses were used recently, use full pool
    const pool = availableResponses.length > 0 ? availableResponses : responsePool;

    // Select random response
    const selected = pool[Math.floor(Math.random() * pool.length)];

    // Select variation if available
    let text = selected.text;
    if (selected.variations && selected.variations.length > 0) {
      const allOptions = [selected.text, ...selected.variations];
      text = allOptions[Math.floor(Math.random() * allOptions.length)];
    }

    // Record this response
    this.catState.recordResponse(selected.id);

    // Determine if sound should play (20% chance for certain moods)
    const shouldPlaySound = Math.random() < 0.2 && 
      (state.mood === MOODS.PLAYFUL || state.mood === MOODS.AFFECTIONATE);

    return {
      text,
      sound: shouldPlaySound ? this.getSoundForMood(state.mood) : null
    };
  }

  // Get sound cue based on mood (optional feature)
  getSoundForMood(mood) {
    const sounds = {
      [MOODS.SLEEPY]: 'meow-soft',
      [MOODS.PLAYFUL]: 'meow-excited',
      [MOODS.ANNOYED]: 'hiss',
      [MOODS.AFFECTIONATE]: 'purr',
      [MOODS.CURIOUS]: 'meow-chirp'
    };
    return sounds[mood] || null;
  }

  // Add random typing delay for realism
  getTypingDelay(text) {
    // Base delay + per character
    const baseDelay = 500;
    const perCharDelay = 30;
    return baseDelay + (text.length * perCharDelay) + (Math.random() * 500);
  }
}
