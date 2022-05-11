import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate= useNavigate()
  return (
    <div className='flex items-center justify-center space-x-5 m-3'>
          <button 
            className='p-3 text-white bg-blue-500 rounded-md'
            onClick={() => navigate('/c1')}
          >CLIENT 1</button>
          <button 
            className='p-3 text-white bg-blue-500 rounded-md'
            onClick={() => navigate('/c2')}
          >CLIENT 2</button>

       
          <a 
            href="/dynmedium" 
            target="_blank" 
            className='p-3 text-white bg-green-500 rounded-md'
          >Dynamic Medium Term</a>

<a 
            href="/dynshort" 
            target="_blank" 
            className='p-3 text-white bg-green-500 rounded-md'
          >Dynamic Short Term</a>
    </div>
  )
}

export default Home