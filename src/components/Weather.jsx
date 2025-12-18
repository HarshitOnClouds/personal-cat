import React, { useState, useEffect } from 'react';
import { Search, MapPin, Cloud, CloudRain, Sun, CloudSnow, Wind } from 'lucide-react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Initialize with stored city or default to Delhi
    useEffect(() => {
        const storedCity = localStorage.getItem('selectedCity') || 'Delhi';
        setCity(storedCity);
        fetchWeather(storedCity);
    }, []);

    // Get weather code description
    const getWeatherDescription = (code) => {
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return weatherCodes[code] || 'Unknown';
    };

    const fetchWeather = async (cityName) => {
        if (!cityName.trim()) return;

        setLoading(true);
        setError('');

        try {
            // First, geocode the city to get coordinates
            const geocodeResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
            );

            if (!geocodeResponse.ok) {
                throw new Error('Failed to search city');
            }

            const geocodeData = await geocodeResponse.json();

            if (!geocodeData.results || geocodeData.results.length === 0) {
                throw new Error('City not found');
            }

            const { latitude, longitude, name, country } = geocodeData.results[0];

            // Now fetch weather data using coordinates
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&timezone=auto`
            );

            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weatherData = await weatherResponse.json();

            // Format data to match our component structure
            const formattedWeather = {
                name: name,
                sys: { country: country },
                main: {
                    temp: weatherData.current.temperature_2m,
                    feels_like: weatherData.current.temperature_2m, // Open-Meteo doesn't provide feels_like
                    humidity: weatherData.current.relative_humidity_2m,
                    pressure: weatherData.current.surface_pressure
                },
                weather: [{
                    main: getWeatherMain(weatherData.current.weather_code),
                    description: getWeatherDescription(weatherData.current.weather_code)
                }],
                wind: {
                    speed: weatherData.current.wind_speed_10m
                }
            };

            setWeather(formattedWeather);
            setCity(name);
            localStorage.setItem('selectedCity', name);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // Convert weather code to main category
    const getWeatherMain = (code) => {
        if (code === 0 || code === 1) return 'Clear';
        if (code === 2 || code === 3) return 'Clouds';
        if (code === 45 || code === 48) return 'Mist';
        if (code >= 51 && code <= 57) return 'Drizzle';
        if (code >= 61 && code <= 67) return 'Rain';
        if (code >= 71 && code <= 77) return 'Snow';
        if (code >= 80 && code <= 82) return 'Rain';
        if (code >= 85 && code <= 86) return 'Snow';
        if (code >= 95 && code <= 99) return 'Thunderstorm';
        return 'Clouds';
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchCity.trim()) {
            fetchWeather(searchCity);
            setSearchCity('');
        }
    };

    // Get cat mood and ASCII art based on weather
    const getCatMood = () => {
        if (!weather) return { mood: 'waiting', cat: '🐱', posture: 'sitting', message: 'Waiting for weather...' };

        const weatherMain = weather.weather[0].main.toLowerCase();
        const temp = weather.main.temp;

        if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
            return {
                mood: 'grumpy',
                cat: `
    /\\_/\\  
   ( o.o ) 
    > ^ <  
   /|   |\\
  (_|___|_)
        `,
                posture: 'annoyed',
                message: "Ugh, it's raining... I hate getting wet!",
                color: 'text-gray-600'
            };
        } else if (weatherMain.includes('thunder') || weatherMain.includes('storm')) {
            return {
                mood: 'scared',
                cat: `
    /\\_/\\  
   ( >_< ) 
    > ^ <  
   /|   |\\
  (_|___|_)
        `,
                posture: 'hiding',
                message: 'Thunder! I need to hide!',
                color: 'text-purple-600'
            };
        } else if (weatherMain.includes('snow')) {
            return {
                mood: 'curious',
                cat: `
    /\\_/\\  
   ( °.° ) 
    > ^ <  
   /|   |\\
  (_|___|_)
        `,
                posture: 'watching',
                message: 'Ooh, white fluffy things falling!',
                color: 'text-blue-400'
            };
        } else if (weatherMain.includes('clear') && temp > 25) {
            return {
                mood: 'sleepy',
                cat: `
    /\\_/\\  
   ( -.- ) 
    > ^ <  
   /|___|\\ 
  (_______)
        `,
                posture: 'napping',
                message: "It's so warm and sunny... perfect nap weather!",
                color: 'text-orange-500'
            };
        } else if (weatherMain.includes('cloud')) {
            return {
                mood: 'content',
                cat: `
    /\\_/\\  
   ( ^.^ ) 
    > ^ <  
   /|   |\\
  (_|___|_)
        `,
                posture: 'sitting',
                message: 'Nice and cozy weather for sitting by the window!',
                color: 'text-gray-500'
            };
        } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
            return {
                mood: 'mysterious',
                cat: `
    /\\_/\\  
   ( -.° ) 
    > ^ <  
   /|   |\\
  (_|___|_)
        `,
                posture: 'stalking',
                message: 'Perfect hunting weather... so mysterious!',
                color: 'text-gray-400'
            };
        } else {
            return {
                mood: 'happy',
                cat: `
    /\\_/\\  
   ( ^_^ ) 
    > ^ <  
   /|   |\\
  (_|___|_)
        `,
                posture: 'playful',
                message: "What a lovely day!",
                color: 'text-green-600'
            };
        }
    };

    const getWeatherIcon = () => {
        if (!weather) return <Cloud className="w-16 h-16 text-gray-400" />;

        const weatherMain = weather.weather[0].main.toLowerCase();

        if (weatherMain.includes('rain')) {
            return <CloudRain className="w-16 h-16 text-blue-500" />;
        } else if (weatherMain.includes('clear')) {
            return <Sun className="w-16 h-16 text-yellow-500" />;
        } else if (weatherMain.includes('snow')) {
            return <CloudSnow className="w-16 h-16 text-blue-300" />;
        } else if (weatherMain.includes('wind')) {
            return <Wind className="w-16 h-16 text-gray-500" />;
        } else {
            return <Cloud className="w-16 h-16 text-gray-400" />;
        }
    };

    const catMood = getCatMood();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
            <div className="max-w-2xl mx-auto">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                placeholder="Search for a city..."
                                className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-white/30 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-white shadow-lg"
                            />
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all shadow-lg flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12 text-white text-xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        Loading weather...
                    </div>
                )}

                {!loading && weather && (
                    <>
                        {/* Weather Card */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                                    <MapPin className="w-6 h-6" />
                                    {weather.name}, {weather.sys.country}
                                </h2>
                                <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
                            </div>

                            <div className="flex items-center justify-center gap-8 mb-6">
                                {getWeatherIcon()}
                                <div>
                                    <div className="text-6xl font-bold text-gray-800">
                                        {Math.round(weather.main.temp)}°C
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2">
                                        Feels like {Math.round(weather.main.feels_like)}°C
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <div className="text-sm text-gray-600">Humidity</div>
                                    <div className="text-xl font-semibold text-gray-800">{weather.main.humidity}%</div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <div className="text-sm text-gray-600">Wind Speed</div>
                                    <div className="text-xl font-semibold text-gray-800">{weather.wind.speed} m/s</div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <div className="text-sm text-gray-600">Pressure</div>
                                    <div className="text-xl font-semibold text-gray-800">{weather.main.pressure} hPa</div>
                                </div>
                            </div>
                        </div>

                        {/* Cat Mood Display */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Cat's Mood: <span className={catMood.color}>{catMood.mood}</span>
                            </h3>

                            <div className="bg-gray-50 rounded-xl p-6 mb-4">
                                <pre className={`text-2xl font-mono ${catMood.color} leading-tight`}>
                                    {catMood.cat}
                                </pre>
                            </div>

                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                                <p className="text-lg text-gray-700 italic">
                                    "{catMood.message}"
                                </p>
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                The cat is {catMood.posture} based on the current weather
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;