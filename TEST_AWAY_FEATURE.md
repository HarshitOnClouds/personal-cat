# Test "Away Messages" Feature

## How It Works

The cat now sends messages while you're away! When you return after being gone for a while, you'll see messages the cat "sent" during your absence.

## Testing the Feature

### Quick Test (Simulated):
1. Open the app and chat with the cat
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run this code to simulate being away for 3 hours:
   ```javascript
   const threeHoursAgo = new Date(Date.now() - (3 * 60 * 60 * 1000));
   localStorage.setItem('catapp_last_visit', threeHoursAgo.toISOString());
   location.reload();
   ```
5. The page will reload and you'll see missed messages!

### Different Time Periods:

**30 minutes ago** (no messages - threshold not met):
```javascript
const time = new Date(Date.now() - (30 * 60 * 1000));
localStorage.setItem('catapp_last_visit', time.toISOString());
location.reload();
```

**1 hour ago** (1-2 messages):
```javascript
const time = new Date(Date.now() - (1 * 60 * 60 * 1000));
localStorage.setItem('catapp_last_visit', time.toISOString());
location.reload();
```

**5 hours ago** (2-3 messages):
```javascript
const time = new Date(Date.now() - (5 * 60 * 60 * 1000));
localStorage.setItem('catapp_last_visit', time.toISOString());
location.reload();
```

**1 day ago** (4 messages, very dramatic):
```javascript
const time = new Date(Date.now() - (24 * 60 * 60 * 1000));
localStorage.setItem('catapp_last_visit', time.toISOString());
location.reload();
```

## Message Progression

- **< 30 min**: No messages (not long enough to miss you)
- **30 min - 1 hour**: "where did you go?", "*looks around*"
- **1-2 hours**: "*sits by window* waiting...", "come back soon..."
- **2-4 hours**: "i miss you...", "*sad chirp* lonely..."
- **4-8 hours**: "where ARE you??", "*dramatic sigh* abandoned..."
- **8-24 hours**: "have you forgotten me...?", "I miss you SO much..."
- **24+ hours**: "YOU'RE BACK!! I thought you left forever!", very emotional reunion

## Features

✅ **Time-based**: Messages scale with how long you were away  
✅ **Realistic timestamps**: Messages spread across the time you were gone  
✅ **Smart tracking**: Updates on any interaction (chat, feed, pet, play)  
✅ **Persistent**: Works across browser sessions  
✅ **Progressive emotion**: Cat gets more worried the longer you're away
