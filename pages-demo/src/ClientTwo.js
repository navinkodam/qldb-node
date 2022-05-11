import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import BigGems from './components/BigGems';
import MediumTermInvestment from './components/MediumTermInvestment'
import OptionCalls from './components/OptionCalls';


function ClientTwo() {
  const [page, setPage] = useState('oc');
  const navigate= useNavigate()

  return (
    <div>
      {/* <button className='p-2 bg-gray-400 text-black m-2 rounded-lg' onClick={() => navigate('/')}>Back</button> */}
      <h1 className='text-center text-xl'>CLIENT 2</h1>

        <div className='flex items-center space-x-5 p-2 bg-gray-100'>
        <button className={`bg-blue-500 text-white  p-2 md:p-3 rounded-md
          hover:bg-blue-600 ${ page === 'sti' && 'bg-blue-600'}`} 
          onClick={e => setPage('oc')}
        >Option Calls</button>

        <button className={`bg-blue-500 text-white p-2 md:p-3  rounded-md
          hover:bg-blue-600 ${ page === 'sti' && 'bg-blue-600'}`} 
          onClick={e => setPage('bg')}
        >Big Gems</button>
      </div>

      {/* <h1 className='text-[10vw]'>Hello Moto</h1> */}

      <div className=''>
        {
          page === 'oc' ? <OptionCalls /> : <BigGems />
        }
      </div>

    </div>
  )
}

export default ClientTwo