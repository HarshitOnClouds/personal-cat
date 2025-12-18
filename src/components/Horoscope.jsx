import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Loader2, Home } from 'lucide-react';

function Horoscope({ onNavigateHome }) {
  const [dob, setDob] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true);

  // Zodiac signs data
  const zodiacSigns = {
    'aries': { name: 'Aries', dates: '3/21-4/19', emoji: '♈' },
    'taurus': { name: 'Taurus', dates: '4/20-5/20', emoji: '♉' },
    'gemini': { name: 'Gemini', dates: '5/21-6/20', emoji: '♊' },
    'cancer': { name: 'Cancer', dates: '6/21-7/22', emoji: '♋' },
    'leo': { name: 'Leo', dates: '7/23-8/22', emoji: '♌' },
    'virgo': { name: 'Virgo', dates: '8/23-9/22', emoji: '♍' },
    'libra': { name: 'Libra', dates: '9/23-10/22', emoji: '♎' },
    'scorpio': { name: 'Scorpio', dates: '10/23-11/21', emoji: '♏' },
    'sagittarius': { name: 'Sagittarius', dates: '11/22-12/21', emoji: '♐' },
    'capricorn': { name: 'Capricorn', dates: '12/22-1/19', emoji: '♑' },
    'aquarius': { name: 'Aquarius', dates: '1/20-2/18', emoji: '♒' },
    'pisces': { name: 'Pisces', dates: '2/19-3/20', emoji: '♓' }
  };

  // Calculate zodiac sign from date of birth
  const getZodiacSign = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    return 'pisces';
  };

  // Analyze horoscope sentiment
  const analyzeSentiment = (text) => {
    const positiveWords = ['success', 'joy', 'happy', 'wonderful', 'excellent', 'lucky', 'fortunate', 'great', 'positive', 'love', 'romance', 'opportunity', 'abundance', 'blessed'];
    const negativeWords = ['caution', 'careful', 'challenge', 'difficult', 'stress', 'tension', 'avoid', 'warning'];
    const calmWords = ['peace', 'calm', 'meditate', 'reflect', 'rest', 'patience', 'balance'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    const calmCount = calmWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount + calmCount) return 'positive';
    if (negativeCount > positiveCount) return 'cautious';
    if (calmCount > 0) return 'peaceful';
    return 'neutral';
  };

  // Load saved DOB from localStorage
  useEffect(() => {
    const savedDob = localStorage.getItem('userDob');
    if (savedDob) {
      setDob(savedDob);
      const sign = getZodiacSign(savedDob);
      setZodiacSign(sign);
      setShowForm(false);
      fetchHoroscope(sign);
    }
  }, []);

  // Generate horoscope based on zodiac sign traits
  const generateHoroscope = (sign) => {
    const horoscopes = {
      aries: {
        descriptions: [
          "Your fiery energy is at its peak today! Channel your passion into a creative project or a meaningful conversation. Bold moves in your career could pay off, but remember to listen before you leap. Romance sparkles in unexpected places.",
          "Adventure calls your name today, dear Aries! Your natural leadership shines through, making it a perfect day to take initiative. Financial opportunities may arise through networking. Trust your instincts but stay grounded.",
          "Today brings dynamic energy for new beginnings. Your courage and determination will help you overcome any obstacles. A friend may seek your advice - your honest perspective will be valued. Balance ambition with patience."
        ],
        colors: ['red', 'crimson', 'scarlet'],
        moods: ['energetic', 'passionate', 'bold'],
        compatible: ['leo', 'sagittarius', 'gemini']
      },
      taurus: {
        descriptions: [
          "Stability and comfort are your gifts today. Focus on building something lasting, whether it's a relationship, project, or financial plan. Your practical wisdom guides you well. Indulge in life's simple pleasures this evening.",
          "Your determination shines brightly today. Financial matters look favorable - trust your instincts about investments. Relationships deepen through honest communication. Nature and beauty bring you peace and inspiration.",
          "Ground yourself in what truly matters. Your patience and reliability make you a rock for others today. A creative pursuit could bring unexpected satisfaction. Treat yourself to something that nourishes your senses."
        ],
        colors: ['green', 'emerald', 'pink'],
        moods: ['stable', 'content', 'sensual'],
        compatible: ['virgo', 'capricorn', 'cancer']
      },
      gemini: {
        descriptions: [
          "Your mind is buzzing with brilliant ideas! Communication flows effortlessly today - share your thoughts and connect with others. A learning opportunity presents itself. Your adaptability turns challenges into adventures.",
          "Curiosity leads you to fascinating discoveries today. Multiple interests pull at your attention - follow what excites you most. Social connections bring joy and possibly important information. Stay flexible and open-minded.",
          "Your wit and charm are irresistible today! Conversations spark new possibilities. A decision requires weighing options carefully - trust your analytical mind. Balance mental stimulation with moments of calm reflection."
        ],
        colors: ['yellow', 'light blue', 'silver'],
        moods: ['curious', 'social', 'versatile'],
        compatible: ['libra', 'aquarius', 'aries']
      },
      cancer: {
        descriptions: [
          "Your intuition is particularly strong today. Trust your gut feelings about people and situations. Nurture yourself as generously as you care for others. Home and family matters bring comfort and possibly important news.",
          "Emotional depth and sensitivity guide you to meaningful connections. Creative projects flourish under your caring attention. Someone close may need your support - your empathy is a gift. Create a cozy sanctuary this evening.",
          "Your protective instincts are heightened. While caring for others, remember to set healthy boundaries. Past lessons inform present decisions wisely. A sentimental moment brings unexpected joy and clarity."
        ],
        colors: ['silver', 'white', 'sea green'],
        moods: ['nurturing', 'intuitive', 'protective'],
        compatible: ['scorpio', 'pisces', 'taurus']
      },
      leo: {
        descriptions: [
          "Your natural charisma lights up every room today! Express yourself boldly and authentically. Recognition for your efforts may come from unexpected sources. Share your warmth generously, but save energy for personal passions.",
          "Creativity flows through you like sunshine! This is your day to shine and inspire others. Romance and joy are favored. Your generous spirit attracts positive attention. Remember that true leadership includes lifting others up.",
          "Your confidence and enthusiasm are contagious! Take center stage in a project that matters to you. Playfulness and fun are important today - don't take everything too seriously. Your heart knows the way forward."
        ],
        colors: ['gold', 'orange', 'yellow'],
        moods: ['confident', 'generous', 'dramatic'],
        compatible: ['aries', 'sagittarius', 'gemini']
      },
      virgo: {
        descriptions: [
          "Your attention to detail reveals hidden opportunities today. Organization and planning bring satisfying results. Health and wellness practices support your goals. Your practical help makes a real difference for someone.",
          "Analytical thinking serves you perfectly now. A complex problem yields to your methodical approach. Work and service bring fulfillment. Remember to appreciate your progress rather than focusing only on what's left to do.",
          "Your discerning eye catches what others miss. This clarity helps you make wise decisions. Self-improvement efforts show promising results. Balance perfectionism with self-compassion - you're doing better than you think."
        ],
        colors: ['navy', 'gray', 'beige'],
        moods: ['analytical', 'helpful', 'precise'],
        compatible: ['taurus', 'capricorn', 'cancer']
      },
      libra: {
        descriptions: [
          "Harmony and balance guide your choices today. Your diplomatic skills resolve conflicts gracefully. Beauty and art inspire you - indulge your aesthetic sense. Partnerships flourish through equal give and take.",
          "Your charm and fairness attract positive connections. A decision requires weighing all perspectives - take your time. Social events could lead to meaningful relationships. Create beauty in your surroundings.",
          "Relationships take center stage today. Your ability to see all sides brings clarity to complex situations. Justice and fairness matter - stand up for what's right. Romance and creativity intertwine beautifully."
        ],
        colors: ['pink', 'light blue', 'lavender'],
        moods: ['balanced', 'diplomatic', 'romantic'],
        compatible: ['gemini', 'aquarius', 'leo']
      },
      scorpio: {
        descriptions: [
          "Your intensity and focus are powerful tools today. Deep insights emerge from introspection. Trust and intimacy deepen in important relationships. Your determination to transform challenges into strengths serves you well.",
          "Mystery and depth characterize your day. Your investigative nature uncovers hidden truths. Powerful emotions guide you to authentic connections. Financial or shared resources may require attention and wise management.",
          "Your passionate nature drives meaningful progress. Psychological insight helps you understand motivations - your own and others'. Transformation is possible in areas you've been working on. Embrace your power wisely."
        ],
        colors: ['deep red', 'black', 'burgundy'],
        moods: ['intense', 'mysterious', 'passionate'],
        compatible: ['cancer', 'pisces', 'capricorn']
      },
      sagittarius: {
        descriptions: [
          "Adventure and expansion call to you! Your optimism is infectious and opens doors. Learning something new brings joy and opportunity. Long-term plans take shape. Your honesty and enthusiasm inspire others.",
          "Freedom and exploration feed your soul today. Travel, education, or philosophical pursuits bring satisfaction. Your generous spirit and good humor attract positive experiences. Aim high but stay grounded in reality.",
          "Your vision sees possibilities others miss. Share your enthusiasm and wisdom freely. A lucky break could come through being in the right place at the right time. Follow your wanderlust, even if just mentally today."
        ],
        colors: ['purple', 'royal blue', 'turquoise'],
        moods: ['optimistic', 'adventurous', 'philosophical'],
        compatible: ['aries', 'leo', 'libra']
      },
      capricorn: {
        descriptions: [
          "Your discipline and ambition pave the way to success. Long-term goals come into focus. Responsibility sits comfortably on your shoulders. Your practical wisdom helps others while advancing your own plans.",
          "Structure and planning bring excellent results today. Authority figures may recognize your capabilities. Your patient approach to challenges shows maturity. Balance work achievements with personal time and connections.",
          "Your persistence pays off in tangible ways. Business and career matters progress favorably. Your reputation for reliability opens doors. Remember that success includes personal fulfillment, not just external achievement."
        ],
        colors: ['brown', 'dark green', 'black'],
        moods: ['ambitious', 'disciplined', 'practical'],
        compatible: ['taurus', 'virgo', 'scorpio']
      },
      aquarius: {
        descriptions: [
          "Your innovative thinking sparks exciting possibilities! Humanitarian concerns may draw your attention and energy. Friends and groups provide inspiration and support. Your unique perspective is exactly what's needed now.",
          "Independence and originality define your day. Technology or progressive ideas open new paths. Community involvement brings satisfaction. Your visionary nature sees solutions to complex problems. Embrace your individuality.",
          "Unconventional approaches work in your favor today. Social connections expand your horizons. Your intellectual curiosity leads to fascinating discoveries. Balance idealism with practical action for best results."
        ],
        colors: ['electric blue', 'silver', 'violet'],
        moods: ['innovative', 'independent', 'humanitarian'],
        compatible: ['gemini', 'libra', 'sagittarius']
      },
      pisces: {
        descriptions: [
          "Your imagination and intuition are flowing beautifully. Creative and spiritual pursuits bring joy and insight. Compassion connects you deeply with others. Trust your dreams and inner wisdom - they guide you truly.",
          "Sensitivity and empathy are your superpowers today. Artistic expression channels your emotions perfectly. Help others but maintain healthy boundaries. Your connection to something greater provides comfort and direction.",
          "Your intuitive understanding of life's mysteries deepens. Music, art, or nature bring healing and inspiration. Romance and spirituality intertwine. Your gentle strength helps you navigate emotional waters with grace."
        ],
        colors: ['sea green', 'purple', 'aquamarine'],
        moods: ['dreamy', 'compassionate', 'mystical'],
        compatible: ['cancer', 'scorpio', 'taurus']
      }
    };

    const signData = horoscopes[sign];
    const randomIndex = Math.floor(Math.random() * signData.descriptions.length);
    const randomColorIndex = Math.floor(Math.random() * signData.colors.length);
    const randomMoodIndex = Math.floor(Math.random() * signData.moods.length);
    const randomCompatIndex = Math.floor(Math.random() * signData.compatible.length);

    return {
      description: signData.descriptions[randomIndex],
      color: signData.colors[randomColorIndex],
      mood: signData.moods[randomMoodIndex],
      compatibility: signData.compatible[randomCompatIndex],
      lucky_number: Math.floor(Math.random() * 100) + 1,
      lucky_time: ['6:00 AM - 9:00 AM', '10:00 AM - 12:00 PM', '2:00 PM - 5:00 PM', '7:00 PM - 9:00 PM'][Math.floor(Math.random() * 4)],
      current_date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  // Fetch horoscope from API
  const fetchHoroscope = async (sign) => {
    setLoading(true);
    setError('');
    
    try {
      // Generate base horoscope for the sign
      const baseHoroscope = generateHoroscope(sign);
      
      // Fetch cosmic advice from API Ninjas
      const API_KEY = '3GCN9BGYjRLs1nPJiJLxsQ==q1WKnhaInBdwPIwO';
      const response = await fetch('https://api.api-ninjas.com/v1/advice', {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY
        }
      });
      
      let cosmicAdvice = '';
      if (response.ok) {
        const data = await response.json();
        cosmicAdvice = data.advice || '';
      }
      
      // Combine horoscope with cosmic advice
      const finalDescription = cosmicAdvice 
        ? `${baseHoroscope.description}\n\nCosmic Wisdom: ${cosmicAdvice}`
        : baseHoroscope.description;
      
      const horoscopeData = {
        ...baseHoroscope,
        description: finalDescription,
        sentiment: analyzeSentiment(finalDescription)
      };
      
      setHoroscope(horoscopeData);
    } catch (err) {
      console.error('Error:', err);
      // Fallback to generated horoscope
      const fallbackHoroscope = generateHoroscope(sign);
      setHoroscope({
        ...fallbackHoroscope,
        sentiment: analyzeSentiment(fallbackHoroscope.description)
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dob) {
      setError('Please enter your date of birth!');
      return;
    }

    const sign = getZodiacSign(dob);
    setZodiacSign(sign);
    localStorage.setItem('userDob', dob);
    setShowForm(false);
    fetchHoroscope(sign);
  };

  // Reset to change DOB
  const resetDob = () => {
    setShowForm(true);
    setHoroscope(null);
    setError('');
  };

  // Yogi Cat Component
  const YogiCat = ({ sentiment }) => {
    const getCatExpression = () => {
      switch (sentiment) {
        case 'positive':
          return {
            eyes: 'M17,30 Q17,32 17,30 M33,30 Q33,32 33,30', // Happy closed eyes
            mouth: 'M22,38 Q25,41 28,38', // Big smile
            color: '#FFB347',
            animation: 'animate-bounce-slow'
          };
        case 'cautious':
          return {
            eyes: 'M15,30 L19,30 M31,30 L35,30', // Concerned eyes
            mouth: 'M22,38 L28,38', // Neutral mouth
            color: '#9CA3AF',
            animation: ''
          };
        case 'peaceful':
          return {
            eyes: 'M15,31 Q17,30 19,31 M31,31 Q33,30 35,31', // Serene closed eyes
            mouth: 'M23,38 Q25,39 27,38', // Gentle smile
            color: '#A7C7E7',
            animation: 'animate-pulse-slow'
          };
        default:
          return {
            eyes: 'M17,30 A1.5,1.5 0 1,1 17,30.1 M33,30 A1.5,1.5 0 1,1 33,30.1',
            mouth: 'M22,38 Q25,39.5 28,38',
            color: '#D8B5FF',
            animation: ''
          };
      }
    };

    const expression = getCatExpression();

    return (
      <div className={`relative ${expression.animation}`}>
        <svg width="120" height="140" viewBox="0 0 50 60" className="mx-auto">
          {/* Lotus position legs */}
          <ellipse cx="18" cy="48" rx="8" ry="4" fill={expression.color} opacity="0.8" />
          <ellipse cx="32" cy="48" rx="8" ry="4" fill={expression.color} opacity="0.8" />
          
          {/* Body in meditation pose */}
          <ellipse cx="25" cy="38" rx="12" ry="14" fill={expression.color} />
          
          {/* Arms crossed in meditation */}
          <ellipse cx="15" cy="38" rx="3" ry="8" fill={expression.color} transform="rotate(-20 15 38)" />
          <ellipse cx="35" cy="38" rx="3" ry="8" fill={expression.color} transform="rotate(20 35 38)" />
          
          {/* Head */}
          <circle cx="25" cy="25" r="12" fill={expression.color} />
          
          {/* Ears */}
          <path d="M15,18 L13,10 L20,15 Z" fill={expression.color} />
          <path d="M35,18 L37,10 L30,15 Z" fill={expression.color} />
          
          {/* Inner ears */}
          <path d="M16,17 L15,12 L18,16 Z" fill="#FFE5E5" />
          <path d="M34,17 L35,12 L32,16 Z" fill="#FFE5E5" />
          
          {/* Face features */}
          <path d={expression.eyes} stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="20" cy="32" rx="1.5" ry="1" fill="#FFB6C1" opacity="0.6" />
          <ellipse cx="30" cy="32" rx="1.5" ry="1" fill="#FFB6C1" opacity="0.6" />
          <path d="M25,34 L25,36" stroke="#2C3E50" strokeWidth="1" />
          <path d={expression.mouth} stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Whiskers */}
          <path d="M12,32 L8,31 M12,34 L8,34 M12,36 L8,37" stroke="#2C3E50" strokeWidth="0.8" opacity="0.6" />
          <path d="M38,32 L42,31 M38,34 L42,34 M38,36 L42,37" stroke="#2C3E50" strokeWidth="0.8" opacity="0.6" />
          
          {/* Third eye chakra for peaceful mood */}
          {sentiment === 'peaceful' && (
            <circle cx="25" cy="20" r="1.5" fill="#9D4EDD" opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          
          {/* Sparkles for positive mood */}
          {sentiment === 'positive' && (
            <>
              <circle cx="10" cy="15" r="1" fill="#FFD700">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="40" cy="15" r="1" fill="#FFD700">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
        
        {/* Decorative elements */}
        {sentiment === 'peaceful' && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-6 h-6 text-purple-400 opacity-60" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Home Button */}
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="mb-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all shadow-lg flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        )}
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            🌟 Mystic Meow 🌟
          </h1>
          <p className="text-gray-600">Your daily cosmic guidance from a wise cat</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Decorative stars */}
          <div className="absolute top-4 right-4 text-yellow-400 opacity-30">✨</div>
          <div className="absolute bottom-4 left-4 text-purple-400 opacity-30">🌙</div>

          {/* Yogi Cat */}
          <div className="mb-8">
            <YogiCat sentiment={horoscope?.sentiment || 'neutral'} />
          </div>

          {/* Form Section */}
          {showForm ? (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <p className="text-lg text-center text-purple-800 mb-4 font-medium">
                  😺 Meow! Tell me your birth date, and I'll reveal your cosmic destiny today! 🔮
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-lg"
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-center text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Reveal My Horoscope ✨
                  </button>
                </form>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Consulting the cosmic kitty wisdom...</p>
            </div>
          ) : horoscope ? (
            <div className="space-y-6">
              {/* Zodiac Sign Header */}
              <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6">
                <div className="text-5xl mb-2">{zodiacSigns[zodiacSign]?.emoji}</div>
                <h2 className="text-3xl font-bold mb-1">{zodiacSigns[zodiacSign]?.name}</h2>
                <p className="text-purple-100 text-sm">{zodiacSigns[zodiacSign]?.dates}</p>
                <p className="text-white mt-2 text-lg font-semibold">{horoscope.current_date}</p>
              </div>

              {/* Horoscope Content */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 space-y-4">
                <div className="prose prose-purple max-w-none">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {horoscope.description}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Lucky Number</p>
                    <p className="text-2xl font-bold text-purple-600">{horoscope.lucky_number}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Lucky Time</p>
                    <p className="text-lg font-semibold text-pink-600">{horoscope.lucky_time}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-2">Lucky Color</p>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full shadow-md border-2 border-gray-200"
                      style={{ backgroundColor: horoscope.color }}
                    ></div>
                    <p className="text-lg font-semibold text-gray-800 capitalize">{horoscope.color}</p>
                  </div>
                </div>

                {/* Mood & Compatibility */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Today's Mood</p>
                    <p className="text-lg font-semibold text-purple-600 capitalize">{horoscope.mood}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Compatible Sign</p>
                    <p className="text-lg font-semibold text-pink-600 capitalize">{horoscope.compatibility}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => fetchHoroscope(zodiacSign)}
                  className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all transform hover:scale-105 shadow-md"
                >
                  🔄 Refresh
                </button>
                <button
                  onClick={resetDob}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all transform hover:scale-105 shadow-md"
                >
                  📅 Change Date
                </button>
              </div>

              {/* Cat's Message */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 text-center">
                <p className="text-gray-700 italic">
                  "Remember, the stars guide but you decide! Purr-fect things await you! 🐱✨"
                </p>
              </div>
            </div>
          ) : null}
        </div>

      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Horoscope;
