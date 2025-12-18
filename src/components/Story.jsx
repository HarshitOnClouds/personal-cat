import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';

function Story({ onNavigateHome }) {
    const [currentPanel, setCurrentPanel] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const totalPanels = 8;
    const storyPanels = Array.from({ length: totalPanels }, (_, i) => `/story/${i + 1}.png`);

    const handleNext = () => {
        if (currentPanel < totalPanels - 1) {
            setCurrentPanel(currentPanel + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handlePlayAgain = () => {
        setCurrentPanel(0);
        setIsComplete(false);
    };

    const handleGoHome = () => {
        if (onNavigateHome) {
            onNavigateHome();
        }
    };

    // Zig-zag alternating positions
    const getZigZagPosition = (index) => {
        return index % 2 === 0 ? -100 : 100;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex flex-col from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Comic-style background effects */}
            <div className='mb-10'>
                How you found the cat
            </div>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-orange-400 blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-yellow-400 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            key={currentPanel}
                            className="relative cursor-pointer"
                            onClick={handleNext}
                            initial={{
                                opacity: 0,
                                y: currentPanel === 0 ? -200 : 0,
                                x: currentPanel === 0 ? 0 : getZigZagPosition(currentPanel),
                                scale: 0.8,
                                rotateZ: currentPanel === 0 ? -15 : getZigZagPosition(currentPanel) / 10
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                x: 0,
                                scale: 1,
                                rotateZ: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.1,
                                filter: 'blur(10px)',
                                transition: { duration: 0.3 }
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 20,
                                duration: 0.8
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Comic panel border */}
                            <div className="relative">
                                {/* Outer shadow border (manga effect) */}
                                <div className="absolute -inset-4 bg-black rounded-lg transform rotate-1" />
                                <div className="absolute -inset-3 bg-white rounded-lg" />
                                <div className="absolute -inset-2 bg-black rounded-lg" />

                                {/* Main panel */}
                                <div className="relative bg-white rounded-lg overflow-hidden border-8 border-black shadow-2xl">
                                    <img
                                        src={storyPanels[currentPanel]}
                                        alt={`Story panel ${currentPanel + 1}`}
                                        className="w-full h-auto"
                                    />

                                    {/* Panel counter */}
                                    <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-white shadow-lg">
                                        {currentPanel + 1} / {totalPanels}
                                    </div>

                                    {/* Click indicator */}
                                    <motion.div
                                        className="absolute bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold border-4 border-black shadow-lg"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [-2, 2, -2]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    >
                                        {currentPanel < totalPanels - 1 ? 'CLICK TO CONTINUE!' : 'CLICK TO FINISH!'}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Speed lines effect */}
                            {currentPanel > 0 && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                            className="text-center"
                        >
                            {/* End screen */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-black rounded-lg transform -rotate-2" />
                                <div className="absolute -inset-3 bg-white rounded-lg transform rotate-1" />
                                <div className="absolute -inset-2 bg-black rounded-lg" />

                                <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-12 border-8 border-black shadow-2xl">
                                    <motion.h2
                                        className="text-6xl font-bold mb-8 text-black"
                                        style={{ fontFamily: 'Impact, sans-serif', textShadow: '4px 4px 0px #fff, 8px 8px 0px #000' }}
                                        animate={{
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    >
                                        HAPPY EVER AFTER!
                                    </motion.h2>

                                    <div className="flex gap-6 justify-center flex-wrap">
                                        <motion.button
                                            onClick={handlePlayAgain}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg border-4 border-black shadow-lg flex items-center gap-3 text-xl"
                                            whileHover={{ scale: 1.05, rotate: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <RotateCcw size={28} />
                                            PLAY AGAIN
                                        </motion.button>

                                        <motion.button
                                            onClick={handleGoHome}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg border-4 border-black shadow-lg flex items-center gap-3 text-xl"
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Home size={28} />
                                            HOME
                                        </motion.button>
                                    </div>

                                    {/* Comic burst effect */}
                                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-red-200 rounded-full border-4 border-black flex items-center justify-center font-bold text-6xl transform rotate-12 shadow-lg">
                                        🩷
                                    </div>
                                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-pink-200 rounded-full border-4 border-black flex items-center justify-center font-bold text-6xl transform -rotate-12 shadow-lg">
                                        ❤️
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Previous panels in background (faded) */}
                {!isComplete && currentPanel > 0 && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ zIndex: -1 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                    >
                        <div className="relative transform -translate-x-8 -translate-y-8 rotate-3 scale-90">
                            <div className="bg-black rounded-lg border-4 border-gray-400 overflow-hidden opacity-50">
                                <img
                                    src={storyPanels[currentPanel - 1]}
                                    alt="Previous panel"
                                    className="w-full h-auto blur-sm"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Story;
