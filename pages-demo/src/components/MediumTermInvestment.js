import React from 'react';
// import Config from '../config/MediumTermInvestment.json';
// import ConfigData from '../config/MediumTermData.json';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function MediumTermInvestment() {

  const [pageData, setPageData] = React.useState(null);
  let [loading, setLoading] = React.useState(false);
  const [screnSize, setScreenSize] = React.useState('');


  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', setDimension);
    return (() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

  React.useEffect(() => {
    if (screenSize.dynamicWidth > 1024) {
      setScreenSize('desktop')
    }

    if (screenSize.dynamicWidth < 1023 && screenSize.dynamicWidth > 620) {
      setScreenSize('tab')
    }

    if (screenSize.dynamicWidth < 620) {
      setScreenSize('mobile')
    }
  }, [screenSize.dynamicWidth])



  React.useEffect(() => {
    // Make a request for a user with a given ID
    setLoading(true)
    if (screnSize === 'desktop') {
      // setChangeCall('Desktop');
      console.log('Desktop Mode')
      axios.get('http://127.0.0.1:8000/api/MediumTerm_data/Desktop')
        .then(function (response) {
          // handle success
          console.log('Desktop medium term data - ', response);
          setPageData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }

    if (screnSize === 'tab') {
      console.log('Tab Mode');
      // setChangeCall('Tab');
      axios.get('http://127.0.0.1:8000/api/MediumTerm_data/Tab')
        .then(function (response) {
          // handle success
          console.log('Tablet medium term data - ', response);
          setPageData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }

    if (screnSize === 'mobile') {
      // setChangeCall('Mobile');
      console.log('Mobile Mode')
      axios.get('http://127.0.0.1:8000/api/MediumTerm_data/Mobile')
        .then(function (response) {
          // handle success
          console.log('Mobile medium term data - ', response);
          setPageData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }

  }, [screnSize]);


  return (
    <div className='p-3 h-screen bg-gray-100'>
      <h2 className='text-center text-lg font-semibold pb-2'>MEDIUM TERM INVESTMENT</h2>
      {pageData !== null ? (

        <div className='overflow-auto rounded-lg shadow-md'>
          <table className="w-full ">
            <thead className='bg-gray-50 border-b-2 border-gray-200'>

              {
                <tr className="rounded-lg text-sm  font-medium text-gray-700 text-center" >
                  {pageData.children.map((item, index) => (
                    <>
                      {item.visibility === true && <th style={item.style}>{item.name}</th>}
                    </>
                  ))}
                </tr>
              }
            </thead>

            <tbody className="text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-normal text-gray-700">
              {/* DATA POPULATION */}

              {
                pageData.data.map((data, indexH) => (
                  <tr key={indexH} className="hover:bg-gray-100 border-b border-gray-200 bg-white text-center py-4">
                    {
                      data.map((item) => (
                        <td key={item} className="tbl-cell-pt max-w-lg" style={{ maxWidth : '200px'}}>{item}</td>
                      ))
                    }

                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      ) : (
        <ClipLoader color={'green'} loading={loading} size={100} />
      )

      }
    </div>
  )
}

export default MediumTermInvestment;