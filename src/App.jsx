import React, { useState } from 'react'
import Home from './components/Home'
import Weather from './components/Weather'
import Story from './components/Story'
import Chat from './components/chat/Chat'
import Horoscope from './components/Horoscope'

function App() {
  
  const [activePage,setActivePage] = useState('home')
  const navhandler = (page)=>{
    setActivePage(page)
  }
  
  return (
    <div className='bg-pink-300 min-h-screen'>
      {activePage === 'home' && (
        <div>
          <div className=' flex  justify-around'>
            <div className='px-3 py-2 cursor-pointer hover:bg-pink-400 transition-colors' onClick={() => navhandler('home')}>HOME</div>
            <div className='px-3 py-2 cursor-pointer hover:bg-pink-400 transition-colors' onClick={() => navhandler('weather')}>WEATHER</div>
            <div className='px-3 py-2 cursor-pointer hover:bg-pink-400 transition-colors' onClick={() =>navhandler('story')}>STORY</div>
          </div>
          <div className='flex justify-around'>
            <div className='px-3 py-2 cursor-pointer hover:bg-pink-400 transition-colors' onClick={() =>navhandler('chat')}>CHAT</div>
            <div className='px-3 py-2 cursor-pointer hover:bg-pink-400 transition-colors' onClick={() =>navhandler('horoscope')}>HOROSCOPE</div>
          </div>
        </div>
      )}
      
      {activePage === 'home' && <Home />}
      {activePage === 'weather' && <Weather onNavigateHome={() => navhandler('home')} />}
      {activePage === 'story' && <Story onNavigateHome={() => navhandler('home')} />}
      {activePage === 'chat' && <Chat onNavigateHome={() => navhandler('home')} />}
      {activePage === 'horoscope' && <Horoscope onNavigateHome={() => navhandler('home')} />}


    </div>
  )
}

export default App
