/**
 * Cat State Management
 * Manages the internal state of the cat including mood, energy, hunger, trust
 */

export const MOODS = {
  SLEEPY: 'sleepy',
  PLAYFUL: 'playful',
  ANNOYED: 'annoyed',
  AFFECTIONATE: 'affectionate',
  CURIOUS: 'curious'
};

export class CatState {
  constructor() {
    this.state = {
      mood: MOODS.CURIOUS,
      energy: 70,        // 0-100
      hunger: 30,        // 0-100
      trust: 50,         // 0-100
      lastResponse: null,
      lastInteractionTime: Date.now(),
      consecutiveIgnores: 0,
      recentResponseIds: [] // Track recent responses for anti-repetition
    };

    // Start automatic state evolution
    this.startStateEvolution();
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.updateMoodBasedOnState();
  }

  // Update mood based on current state values
  updateMoodBasedOnState() {
    const { energy, hunger, trust } = this.state;

    if (energy < 30) {
      this.state.mood = MOODS.SLEEPY;
    } else if (hunger > 70) {
      this.state.mood = MOODS.ANNOYED;
    } else if (trust > 70 && energy > 60) {
      this.state.mood = MOODS.AFFECTIONATE;
    } else if (energy > 70 && hunger < 40) {
      this.state.mood = MOODS.PLAYFUL;
    } else {
      this.state.mood = MOODS.CURIOUS;
    }
  }

  // Record interaction and update trust
  recordInteraction(sentiment) {
    const now = Date.now();
    const timeSinceLastInteraction = now - this.state.lastInteractionTime;
    this.state.lastInteractionTime = now;

    // Trust changes based on sentiment and consistency
    if (sentiment === 'happy' || sentiment === 'affection') {
      this.state.trust = Math.min(100, this.state.trust + 2);
    } else if (sentiment === 'angry') {
      this.state.trust = Math.max(0, this.state.trust - 5);
    }

    // Energy decreases with interaction
    this.state.energy = Math.max(0, this.state.energy - 1);
  }

  // Record a response to prevent repetition
  recordResponse(responseId) {
    this.state.lastResponse = responseId;
    this.state.recentResponseIds.push(responseId);
    
    // Keep only last 10 responses
    if (this.state.recentResponseIds.length > 10) {
      this.state.recentResponseIds.shift();
    }
  }

  // Check if a response was used recently
  wasRecentlyUsed(responseId) {
    return this.state.recentResponseIds.includes(responseId);
  }

  // Automatic state evolution over time
  startStateEvolution() {
    this.evolutionInterval = setInterval(() => {
      // Energy decreases over time
      this.state.energy = Math.max(0, this.state.energy - 0.5);
      
      // Hunger increases over time
      this.state.hunger = Math.min(100, this.state.hunger + 0.3);

      // Trust slowly decays if no recent interaction
      const timeSinceLastInteraction = Date.now() - this.state.lastInteractionTime;
      if (timeSinceLastInteraction > 60000) { // 1 minute
        this.state.trust = Math.max(0, this.state.trust - 0.1);
      }

      this.updateMoodBasedOnState();
    }, 5000); // Update every 5 seconds
  }

  // Feed the cat
  feed() {
    this.state.hunger = Math.max(0, this.state.hunger - 30);
    this.state.trust = Math.min(100, this.state.trust + 5);
    this.state.energy = Math.min(100, this.state.energy + 10);
    this.updateMoodBasedOnState();
  }

  // Pet the cat
  pet() {
    if (this.state.mood === MOODS.ANNOYED) {
      this.state.trust = Math.max(0, this.state.trust - 3);
    } else {
      this.state.trust = Math.min(100, this.state.trust + 3);
      this.state.energy = Math.max(0, this.state.energy - 2);
    }
    this.updateMoodBasedOnState();
  }

  // Cleanup
  destroy() {
    if (this.evolutionInterval) {
      clearInterval(this.evolutionInterval);
    }
  }
}
