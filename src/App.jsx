import React, { useState } from 'react'
import Home from './components/Home'
import Weather from './components/Weather'
import Story from './components/Story'
import Chat from './components/chat/Chat'

function App() {
  
  const [activePage,setActivePage] = useState('home')
  const navhandler = (page)=>{
    setActivePage(page)
  }
  
  return (
    <div className='bg-pink-300 min-h-screen'>
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
      
      {activePage === 'home' && <Home />}
      {activePage === 'weather' && <Weather />}
      {activePage === 'story' && <Story />}
      {activePage === 'chat' && <Chat />}


    </div>
  )
}

export default App
