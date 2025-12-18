import React, { useState, useEffect } from 'react';
import { Search, MapPin, Cloud, CloudRain, Sun, CloudSnow, Wind, Home } from 'lucide-react';
import AnimatedCat from './AnimatedCat';

const Weather = ({ onNavigateHome }) => {
    const [city, setCity] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Suggested cities from different climates
    const suggestedCities = [
        { name: 'Mumbai', emoji: '🌧️', description: 'Tropical' },
        { name: 'Moscow', emoji: '❄️', description: 'Cold' },
        { name: 'Dubai', emoji: '☀️', description: 'Desert' },
        { name: 'London', emoji: '☁️', description: 'Cloudy' },
        { name: 'Singapore', emoji: '🌴', description: 'Humid' },
        { name: 'Reykjavik', emoji: '🌬️', description: 'Windy' }
    ];

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

    const handleCityClick = (cityName) => {
        fetchWeather(cityName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get cat mood based on weather and temperature
    const getCatMood = () => {
        if (!weather) return { mood: 'waiting', posture: 'sitting', message: 'Waiting for weather... 🐱', color: '#6B7280', textColor: 'text-gray-600' };

        const weatherMain = weather.weather[0].main.toLowerCase();
        const temp = weather.main.temp;

        // Temperature-based moods with priority
        if (temp < -10) {
            return {
                mood: 'scared',
                posture: 'freezing',
                message: "Brrrr! It's too cold! Need a warm blanket meow! 🥶",
                color: '#3B82F6',
                textColor: 'text-blue-600'
            };
        } else if (temp >= -10 && temp < 0) {
            return {
                mood: 'grumpy',
                posture: 'cold',
                message: "So chilly! My paws are freezing... ❄️",
                color: '#60A5FA',
                textColor: 'text-blue-400'
            };
        } else if (temp >= 0 && temp < 10 && weatherMain.includes('snow')) {
            return {
                mood: 'curious',
                posture: 'watching',
                message: 'Ooh, snowy! Can I catch the snowflakes? ⛄',
                color: '#60A5FA',
                textColor: 'text-blue-400'
            };
        } else if (temp >= 0 && temp < 10) {
            return {
                mood: 'content',
                posture: 'cozy',
                message: "Cool and comfy! Perfect for cuddling by the heater~ 🧣",
                color: '#8B7355',
                textColor: 'text-amber-700'
            };
        } else if (temp >= 10 && temp < 15) {
            return {
                mood: 'happy',
                posture: 'playful',
                message: "What a lovely day for playing! Let's go outside! 🌸",
                color: '#10B981',
                textColor: 'text-emerald-500'
            };
        } else if (temp >= 15 && temp < 20 && weatherMain.includes('rain')) {
            return {
                mood: 'grumpy',
                posture: 'annoyed',
                message: "Ugh, rain... My fur will get all wet and messy! 💧",
                color: '#4B5563',
                textColor: 'text-gray-600'
            };
        } else if (temp >= 15 && temp < 20) {
            return {
                mood: 'happy',
                posture: 'playful',
                message: "Perfect weather! Time for zoomies! 🌈",
                color: '#16A34A',
                textColor: 'text-green-600'
            };
        } else if (temp >= 20 && temp < 25 && weatherMain.includes('clear')) {
            return {
                mood: 'content',
                posture: 'sunbathing',
                message: "Ahh~ warm sunshine on my fur feels amazing! ☀️",
                color: '#F59E0B',
                textColor: 'text-amber-500'
            };
        } else if (temp >= 20 && temp < 25) {
            return {
                mood: 'content',
                posture: 'relaxed',
                message: "Nice and pleasant! Just purr-fect for lounging~ 😸",
                color: '#14B8A6',
                textColor: 'text-teal-500'
            };
        } else if (temp >= 25 && temp < 30) {
            return {
                mood: 'sleepy',
                posture: 'lazy',
                message: "Getting warm... Time for a catnap in the shade~ 😴",
                color: '#F97316',
                textColor: 'text-orange-500'
            };
        } else if (temp >= 30 && temp < 35) {
            return {
                mood: 'sleepy',
                posture: 'sprawled',
                message: "Too hot to move... Just gonna melt here... 🥵",
                color: '#EF4444',
                textColor: 'text-red-500'
            };
        } else if (temp >= 35) {
            return {
                mood: 'grumpy',
                posture: 'overheated',
                message: "WAY TOO HOT! Need AC and ice water NOW! 🔥",
                color: '#DC2626',
                textColor: 'text-red-600'
            };
        }

        // Weather condition-based moods (fallback)
        if (weatherMain.includes('thunder') || weatherMain.includes('storm')) {
            return {
                mood: 'scared',
                posture: 'hiding',
                message: 'Thunder! *hides under bed* Scary noises! ⚡',
                color: '#7C3AED',
                textColor: 'text-purple-600'
            };
        } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
            return {
                mood: 'curious',
                posture: 'exploring',
                message: 'Misty and mysterious... Perfect for hunting! 🌫️',
                color: '#9CA3AF',
                textColor: 'text-gray-400'
            };
        } else if (weatherMain.includes('cloud')) {
            return {
                mood: 'content',
                posture: 'window-watching',
                message: 'Cloudy day = perfect for bird watching by the window! 🪟',
                color: '#6B7280',
                textColor: 'text-gray-500'
            };
        } else {
            return {
                mood: 'happy',
                posture: 'cheerful',
                message: "Life is good! Time to chase my tail! 💕",
                color: '#16A34A',
                textColor: 'text-green-600'
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

                        </div>

                        {/* Cat Mood Display */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Cat's Mood: <span className={catMood.textColor}>{catMood.mood}</span>
                            </h3>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-4 flex justify-center">
                                <AnimatedCat mood={catMood.mood} color={catMood.color} />
                            </div>

                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                                <p className="text-lg text-gray-700 italic">
                                    "{catMood.message}"
                                </p>
                            </div>

                        </div>

                        {/* Suggested Cities */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                                🌍 Explore Different Weather & Cat Moods
                            </h3>
                            <p className="text-sm text-gray-600 text-center mb-6">
                                Click on a city to see how the cat reacts to different weather conditions!
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {suggestedCities.map((suggestedCity) => (
                                    <button
                                        key={suggestedCity.name}
                                        onClick={() => handleCityClick(suggestedCity.name)}
                                        className={`p-4 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg ${
                                            city === suggestedCity.name
                                                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                                                : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50'
                                        }`}
                                    >
                                        <div className="text-3xl mb-2">{suggestedCity.emoji}</div>
                                        <div className={`font-semibold ${city === suggestedCity.name ? 'text-white' : 'text-gray-800'}`}>
                                            {suggestedCity.name}
                                        </div>
                                        <div className={`text-xs mt-1 ${city === suggestedCity.name ? 'text-white/80' : 'text-gray-500'}`}>
                                            {suggestedCity.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;