import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import MediumTermInvestment from './components/MediumTermInvestment'
import ShortTermInvestment from './components/ShortTermInvestment'


function ClientOne() {
    const [page, setPage] = useState('sti');
    

  return (
    <div>
        {/* <button className='p-2 bg-gray-400 text-black m-2 rounded-lg' onClick={() => navigate('/')}>Back</button> */}
        <h1 className='text-center text-xl'>CLIENT 1</h1>
        <div className='flex items-center space-x-5 p-2 bg-gray-100'>
        <button className={`bg-blue-500 text-white  p-2 md:p-3 rounded-md
          hover:bg-blue-600 ${ page === 'sti' && 'bg-blue-600'}`} 
          onClick={e => setPage('sti')}
        >Short Term Investment</button>

        {/* <p>
          {screenSize.dynamicWidth}
        </p> */}

        <button className={`bg-blue-500 text-white p-2 md:p-3  rounded-md
          hover:bg-blue-600 ${ page === 'sti' && 'bg-blue-600'}`} 
          onClick={e => setPage('bg')}
        >Medium Term Investment</button>
      </div>

      {/* <h1 className='text-[10vw]'>Hello Moto</h1> */}

      <div className=''>
        {
          page === 'sti' ? <ShortTermInvestment /> : <MediumTermInvestment />
        }
      </div>

    </div>
  )
}

export default ClientOne