import React, { useEffect, useState } from 'react'
import axios from 'axios';
import parse from 'html-react-parser';

function CustomMediumTerm() {
        const [htmlData, setHtmlData] = useState(null)
    
    useEffect(() => {
           
                
                // const response = await fetch('http://127.0.0.1:8000/api/ShortTerm');
                // const data = await response.json();
                // console.log('the main response -', data)
                axios.get('http://127.0.0.1:8000/api/MediumTerm',{
   
  })
    .then((res) => {
      console.log('my data - ', res);
      setHtmlData(res.data)
      document.getElementById('myTable').appendChild(res.data)
    })
          
    }, [])
  return (
    <div className='flex h-full justify-center items-center'>
        <div>
            {  htmlData == null ? <p>Loading...</p> 
            :  parse(htmlData)
            }
        </div>
    </div>
  )
}

export default CustomMediumTerm;
