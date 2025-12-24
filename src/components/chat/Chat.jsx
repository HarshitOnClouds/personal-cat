import React, { useState, useEffect, useRef } from 'react';
import { CatState } from './catState';
import { ChatEngine } from './chatEngine';
import { analyzeMessage } from './sentimentDetector';
import './Chat.css';

function Chat({ onNavigateHome }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [catState, setCatState] = useState(null);
  const [stateDisplay, setStateDisplay] = useState(null);
  
  const chatEngineRef = useRef(null);
  const catStateRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Generate messages for time user was away
  const generateMissedMessages = (lastVisit, currentTime) => {
    const missedMessages = [];
    const timeDiff = currentTime - lastVisit; // in milliseconds
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Only generate messages if user was away for more than 30 minutes
    if (hoursDiff < 0.5) return missedMessages;

    const messageTemplates = [
      { minHours: 0.5, messages: ['*looks around* mew?', '*ears perk* where did you go?', '*sniff sniff* hmm...'] },
      { minHours: 1, messages: ['*sits by window* waiting...', 'mrrp? *tail swish*', '*stretches* come back soon...'] },
      { minHours: 2, messages: ['*meows softly* i miss you...', '*curls up* where are youuu? 🥺', '*sad chirp* lonely...'] },
      { minHours: 4, messages: ['*stares at door* ...waiting...', 'mew mew mew! where ARE you??', '*dramatic sigh* abandoned... 😿'] },
      { minHours: 8, messages: ['*lies down sadly* have you forgotten me...?', 'i miss you SO much... *whimpers*', '*big sad eyes* please come back...'] },
      { minHours: 24, messages: ['*rushes to door* YOU\'RE BACK!! I thought you left forever! 😭', 'WHERE HAVE YOU BEEN?! *angry but relieved*', '*tackles you* NEVER leave me that long again!! 💔'] }
    ];

    // Determine which message sets to use based on hours away
    const applicableTemplates = messageTemplates.filter(t => hoursDiff >= t.minHours);
    
    if (applicableTemplates.length === 0) return missedMessages;

    // Generate 1-4 messages depending on time away
    let messageCount = Math.min(Math.floor(hoursDiff / 2) + 1, 4);
    const timeInterval = timeDiff / (messageCount + 1);

    for (let i = 0; i < messageCount; i++) {
      const templateSet = applicableTemplates[Math.min(i, applicableTemplates.length - 1)];
      const randomMsg = templateSet.messages[Math.floor(Math.random() * templateSet.messages.length)];
      const messageTime = new Date(lastVisit.getTime() + (timeInterval * (i + 1)));

      missedMessages.push({
        id: Date.now() + i,
        text: randomMsg,
        sender: 'cat',
        timestamp: messageTime,
        isMissed: true
      });
    }

    return missedMessages;
  };

  // Load messages from localStorage on mount and check for missed messages
  useEffect(() => {
    const now = new Date();
    const lastVisitStr = localStorage.getItem('catapp_last_visit');
    let loadedMessages = [];

    // Load existing messages
    const savedMessages = localStorage.getItem('catapp_messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        loadedMessages = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error loading messages from localStorage:', error);
      }
    }

    // Check if user was away and generate missed messages
    if (lastVisitStr && loadedMessages.length > 0) {
      const lastVisit = new Date(lastVisitStr);
      const missedMessages = generateMissedMessages(lastVisit, now);
      
      if (missedMessages.length > 0) {
        // Insert missed messages in chronological order
        loadedMessages = [...loadedMessages, ...missedMessages].sort(
          (a, b) => a.timestamp - b.timestamp
        );
      }
    }

    if (loadedMessages.length > 0) {
      setMessages(loadedMessages);
    }

    // Update last visit time
    localStorage.setItem('catapp_last_visit', now.toISOString());
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('catapp_messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to localStorage:', error);
      }
    }
  }, [messages]);

  // Initialize cat state and engine
  useEffect(() => {
    const newCatState = new CatState();
    catStateRef.current = newCatState;
    chatEngineRef.current = new ChatEngine(newCatState);
    
    // Update state display periodically
    const stateInterval = setInterval(() => {
      setStateDisplay(newCatState.getState());
    }, 1000);

    // Add welcome message only if no messages exist
    if (messages.length === 0) {
      const welcomeMessages = [
      '*stretches* mrrp... hello there! *tail swish*',
      'oh! a human! *perks up* hi hi! \ud83d\ude3a',
      '*yawns* oh hello! *happy chirp* nice to see you!',
      'mew! *runs up excitedly* you are here! prrr!',
      '*slow blinks* hello friend... *purrs* \u2764\ufe0f'
    ];
      setMessages([{
        id: Date.now(),
        text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
        sender: 'cat',
        timestamp: new Date()
      }]);
    }

    return () => {
      clearInterval(stateInterval);
      newCatState.destroy();
    };
  }, [messages.length]);
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Idle behavior - cat might say something randomly
  useEffect(() => {
    const idleTimer = setInterval(() => {
      if (catStateRef.current && Math.random() < 0.1) { // 10% chance every 30 seconds
        const state = catStateRef.current.getState();
        const idleMessages = {
          sleepy: ['*yawns*', 'zzz...', '*stretches lazily*'],
          playful: ['*zooms*', '*attacks shadow*', 'mew!'],
          annoyed: ['*tail lash*', '...', '*huffs*'],
          affectionate: ['prrr...', '*purrs*', 'mrrp?'],
          curious: ['*sniff sniff*', '*ears perk*', 'mew?']
        };

        const moodMessages = idleMessages[state.mood] || idleMessages.curious;
        const randomMessage = moodMessages[Math.floor(Math.random() * moodMessages.length)];

        setMessages(prev => [...prev, {
          id: Date.now(),
          text: randomMessage,
          sender: 'cat',
          timestamp: new Date(),
          isIdle: true
        }]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(idleTimer);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatEngineRef.current) return;

    // Update last visit time on interaction
    localStorage.setItem('catapp_last_visit', new Date().toISOString());

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Record interaction
    const analysis = analyzeMessage(inputValue);
    catStateRef.current.recordInteraction(analysis.sentiment);

    // Show typing indicator
    setIsTyping(true);

    // Generate response with delay
    try {
      const response = await chatEngineRef.current.generateResponse(inputValue);

      if (response.delayed) {
        // Handle delayed response
        setTimeout(() => {
          handleActualResponse();
        }, response.delayMs);
      } else {
        // Simulate typing with realistic delay
        const typingDelay = chatEngineRef.current.getTypingDelay(response.text);
        setTimeout(() => {
          handleActualResponse(response);
        }, typingDelay);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
    }

    async function handleActualResponse(resp) {
      if (!resp) {
        // Generate actual response after delay
        resp = await chatEngineRef.current.generateResponse(inputValue);
      }

      setIsTyping(false);

      if (resp.text) {
        const catMessage = {
          id: Date.now(),
          text: resp.text,
          sender: 'cat',
          timestamp: new Date(),
          sound: resp.sound
        };

        setMessages(prev => [...prev, catMessage]);

        // Play sound if available (optional feature)
        if (resp.sound) {
          playSound(resp.sound);
        }
      }
    }
  };

  const playSound = (soundName) => {
    // Optional: Implement sound playing logic
    // This would require sound files in public/catsounds/
    try {
      const audio = new Audio(`/catsounds/${soundName}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(err => console.log('Could not play sound:', err));
    } catch (err) {
      console.log('Sound not available:', soundName);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      sleepy: '😴',
      playful: '😸',
      annoyed: '😾',
      affectionate: '🥰',
      curious: '😺'
    };
    return emojis[mood] || '😺';
  };

  const getEnergyColor = (energy) => {
    if (energy > 70) return '#4ade80';
    if (energy > 40) return '#fbbf24';
    return '#f87171';
  };

  const getHungerColor = (hunger) => {
    if (hunger > 70) return '#f87171';
    if (hunger > 40) return '#fbbf24';
    return '#4ade80';
  };

  const handleFeed = () => {
    if (catStateRef.current) {
      localStorage.setItem('catapp_last_visit', new Date().toISOString());
      catStateRef.current.feed();
      const responses = [
        '*chomps* nom nom nom!',
        'mew mew! *happy eating* 😋',
        '*purrs while eating* thank you!',
        'FOOD! *tail high* you\'re the best!',
        '*munches* mrrp mrrp!'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomResponse,
        sender: 'cat',
        timestamp: new Date(),
        isAction: true
      }]);
    }
  };

  const handlePet = () => {
    if (catStateRef.current) {
      localStorage.setItem('catapp_last_visit', new Date().toISOString());
      catStateRef.current.pet();
      const state = catStateRef.current.getState();
      const responses = state.mood === 'annoyed' 
        ? ['*tolerates petting* ...fine', '*ear flick* ...okay I guess', 'hff... *actually enjoys it*']
        : ['prrrrr! *leans into pets*', '*happy purring* more please!', 'mrrp! *loves this*', '*melts* prrrrr', '*slow blinks* ❤️'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomResponse,
        sender: 'cat',
        timestamp: new Date(),
        isAction: true
      }]);
    }
  };

  const handlePlay = () => {
    if (catStateRef.current) {
      localStorage.setItem('catapp_last_visit', new Date().toISOString());
      const state = catStateRef.current.getState();
      if (state.energy < 20) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: '*yawns* too tired... maybe later... zzz',
          sender: 'cat',
          timestamp: new Date(),
          isAction: true
        }]);
      } else {
        catStateRef.current.setState({ 
          energy: Math.max(0, state.energy - 15),
          mood: 'playful'
        });
        const responses = [
          '*ZOOMIES* catch me if you can!!',
          '*pounces on toy* got it! *victory dance*',
          'wheee! *runs everywhere* this is fun!!',
          '*batting toy around* mew mew mew!',
          '*does acrobatics* watch this! *backflip*'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: randomResponse,
          sender: 'cat',
          timestamp: new Date(),
          isAction: true
        }]);
      }
    }
  };

  const handleResetMood = () => {
    if (catStateRef.current) {
      localStorage.setItem('catapp_last_visit', new Date().toISOString());
      catStateRef.current.setState({
        mood: 'affectionate',
        energy: 70,
        hunger: 30,
        trust: 75
      });
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: '*feels refreshed* mrrp! *happy stretch* feeling good! prrr ✨',
        sender: 'cat',
        timestamp: new Date(),
        isAction: true
      }]);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      setMessages([{
        id: Date.now(),
        text: '*blinks* oh... fresh start? okay! mew! 😸',
        sender: 'cat',
        timestamp: new Date()
      }]);
      localStorage.removeItem('catapp_messages');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-top">
          <h2>Chat with Cat</h2>
          {onNavigateHome && (
            <button onClick={onNavigateHome} className="home-button" title="Go to Home">
              🏠 Home
            </button>
          )}
        </div>
        {stateDisplay && (
          <div className="cat-status">
            <span className="mood-indicator">
              {getMoodEmoji(stateDisplay.mood)} {stateDisplay.mood}
            </span>
            <div className="stat-bars">
              <div className="stat-bar">
                <span className="stat-label">Energy</span>
                <div className="stat-bar-bg">
                  <div 
                    className="stat-bar-fill" 
                    style={{ 
                      width: `${stateDisplay.energy}%`,
                      backgroundColor: getEnergyColor(stateDisplay.energy)
                    }}
                  />
                </div>
                <span className="stat-value">{Math.round(stateDisplay.energy)}</span>
              </div>
              <div className="stat-bar">
                <span className="stat-label">Hunger</span>
                <div className="stat-bar-bg">
                  <div 
                    className="stat-bar-fill" 
                    style={{ 
                      width: `${stateDisplay.hunger}%`,
                      backgroundColor: getHungerColor(stateDisplay.hunger)
                    }}
                  />
                </div>
                <span className="stat-value">{Math.round(stateDisplay.hunger)}</span>
              </div>
              <div className="stat-bar">
                <span className="stat-label">Trust</span>
                <div className="stat-bar-bg">
                  <div 
                    className="stat-bar-fill" 
                    style={{ 
                      width: `${stateDisplay.trust}%`,
                      backgroundColor: '#a78bfa'
                    }}
                  />
                </div>
                <span className="stat-value">{Math.round(stateDisplay.trust)}</span>
              </div>
            </div>
            <div className="action-buttons">
              <button onClick={handleFeed} className="action-btn feed-btn" title="Feed the cat">
                🍖 Feed
              </button>
              <button onClick={handlePet} className="action-btn pet-btn" title="Pet the cat">
                🤚 Pet
              </button>
              <button onClick={handlePlay} className="action-btn play-btn" title="Play with cat">
                🎾 Play
              </button>
              <button onClick={handleResetMood} className="action-btn reset-btn" title="Reset mood">
                ✨ Reset
              </button>
              <button onClick={handleClearChat} className="action-btn clear-btn" title="Clear chat history">
                🗑️ Clear
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender} ${message.isIdle ? 'idle' : ''} ${message.isAction ? 'action' : ''}`}
          >
            <div className="message-content">
              <span className="message-text">{message.text}</span>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message cat typing-indicator">
            <div className="message-content">
              <span className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message to the cat... (or use action buttons!)"
            className="message-input"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
