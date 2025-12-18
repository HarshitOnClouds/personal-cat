# Cat Chat System Documentation

## Overview
A sophisticated rule-based chatbot that simulates realistic cat behavior with state management, mood-based responses, and probabilistic decision-making.

## Architecture

### Files Structure
```
chat/
├── Chat.jsx           # Main UI component
├── Chat.css           # Styling
├── catState.js        # State management
├── responseBank.js    # Response library
├── sentimentDetector.js # Keyword analysis
└── chatEngine.js      # Decision logic
```

## Core Features

### 1. State Management (catState.js)
The cat maintains an internal state with:
- **Mood**: sleepy, playful, annoyed, affectionate, curious
- **Energy**: 0-100 (decreases over time and with interactions)
- **Hunger**: 0-100 (increases over time)
- **Trust**: 0-100 (affected by user interactions)
- **Response History**: Anti-repetition tracking

**State Evolution**:
- Energy decreases 0.5 per 5 seconds
- Hunger increases 0.3 per 5 seconds
- Mood changes automatically based on energy/hunger/trust levels
- Trust decays slowly without interaction

### 2. Response Bank (responseBank.js)
Large collection of responses organized by:
- **Mood × Sentiment Matrix**: Each mood has responses for happy, sad, angry, neutral sentiments
- **Action Tags**: Responses include cat behaviors like `*tail flick*`, `prrr`, `*yawns*`
- **Variations**: Each response has 2-3 variations to prevent repetition
- **Special Intents**: Dedicated responses for food, questions, ignoring

**Example Response Structure**:
```javascript
{
  id: 'playful-happy-1',
  text: '*pounces* mew mew!',
  variations: ['*jumps* mew!', '*bounces* mew mew!']
}
```

### 3. Sentiment Detection (sentimentDetector.js)
Lightweight keyword-based analysis:
- **Sentiment Categories**: Happy, sad, angry, neutral
- **Intent Detection**: Affection, food, play, questions, complex requests
- **No ML Required**: Pure keyword matching with scoring

**Keywords Examples**:
- Happy: love, joy, great, awesome, thank, 😊
- Sad: sad, cry, lonely, hurt, 😢
- Food: food, hungry, treat, fish, tuna
- Affection: hug, pet, cuddle, love, adorable

### 4. Chat Engine (chatEngine.js)
Handles all decision-making logic:

**Probabilistic Decisions**:
- **Ignore**: Cat might not respond (higher when sleepy/annoyed)
- **Delay**: Response comes after 2-5 seconds (simulates thinking)
- **Respond**: Normal response

**Decision Factors**:
- Current mood affects ignore/delay probability
- Low trust increases ignore chance
- Low energy increases delay
- Affection/food reduce ignore chance

**Anti-Repetition**:
- Tracks last 10 response IDs
- Filters out recently used responses
- Selects random variation of chosen response

**Behavior Priority**:
- Complex requests → deflect with cat behavior
- Questions → non-answers ("mrrp?", "*blinks*")
- Standard → mood-based emotional responses

### 5. UI Component (Chat.jsx)
Full-featured chat interface:
- Real-time state display (mood, energy, hunger, trust)
- Typing indicators with realistic delays
- Idle behaviors (cat randomly says things)
- Message history with timestamps
- Sound cues (optional, needs audio files)
- Auto-scrolling

## Usage Example

```javascript
// User: "I love you!"
// Analysis: sentiment=happy, intent=affection
// Cat State: mood=affectionate, trust increases
// Decision: 95% respond (affection reduces ignore)
// Response: "prrrrrrr! *head bonks*" + trust +3, energy -2

// User: "Can you help me with my coding problem?"
// Analysis: sentiment=neutral, intent=complex, isComplex=true
// Decision: deflect (complex request)
// Response: "*stares blankly*" or "*walks away*"

// User: "I'm sad..."
// Analysis: sentiment=sad
// Cat State: mood=affectionate
// Response: "*concerned purr* mew...?" or "*cuddles close* prrr..."
```

## Micro-Behaviors

### Typing Delays
- Base 500ms + 30ms per character + random 0-500ms
- Makes responses feel natural and cat-like

### Idle Reactions
- Every 30 seconds, 10% chance cat does something
- Mood-specific idle behaviors (yawns when sleepy, zooms when playful)

### Sound Cues (Optional)
- 20% chance for playful/affectionate moods
- Sound files should be in `/public/catsounds/`:
  - meow-soft.mp3
  - meow-excited.mp3
  - hiss.mp3
  - purr.mp3
  - meow-chirp.mp3

### State-Driven Interactions
- Feed action: hunger -30, trust +5, energy +10
- Pet action: trust +3 (or -3 if annoyed), energy -2
- Automatic mood changes based on state values

## Behavioral Philosophy

The system prioritizes **realistic cat behavior** over helpfulness:
- **Short responses**: "mrrp", "*tail flick*", "..."
- **Emotional**: Mood-driven rather than logical
- **Indirect**: Rarely answers questions directly
- **Occasionally silent**: Empty string or "*ignores*"
- **Unpredictable**: Probabilistic decision-making

## Integration

To use in your app:

```jsx
import Chat from './components/chat/Chat';

function App() {
  return <Chat />;
}
```

The component is fully self-contained with automatic state management and evolution.

## Customization

### Add More Responses
Edit `responseBank.js` and add responses to the mood×sentiment matrix:
```javascript
[MOODS.CURIOUS]: {
  [SENTIMENTS.HAPPY]: [
    { id: 'new-1', text: 'your text', variations: ['var1', 'var2'] }
  ]
}
```

### Adjust State Evolution
Modify `catState.js`:
```javascript
// Change evolution speed
this.state.energy = Math.max(0, this.state.energy - 0.5); // Faster/slower

// Change mood thresholds
if (energy < 30) { // More/less sleepy
```

### Modify Decision Probabilities
Edit `chatEngine.js`:
```javascript
probabilities = {
  [MOODS.SLEEPY]: { ignore: 0.4, delay: 0.3, respond: 0.3 }
  // Adjust these values
}
```

### Add New Intents
1. Add keywords to `sentimentDetector.js`
2. Add responses to `responseBank.js`
3. Handle in `chatEngine.js` generateResponse()

## Performance

- Lightweight: No external dependencies beyond React
- Efficient: State updates every 5 seconds, idle checks every 30 seconds
- Memory-safe: Cleanup on unmount, limited response history
- No network calls: Entirely client-side

## Future Enhancements

Potential additions:
- Voice synthesis for meows
- Animated cat avatar that changes with mood
- More complex intent patterns
- Learning from user interactions (persistent trust)
- Multiple cats with different personalities
- Integration with actual cat sounds/images
