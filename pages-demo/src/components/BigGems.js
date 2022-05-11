import React from 'react';
// import Config from '../config/BigGems.json';
// import ConfigData from '../config/BigGemsData.json';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function BigGems() {

  const [pageData, setPageData] = React.useState(null);
  let [loading, setLoading] = React.useState(null);


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
    // Make a request for a user with a given ID
    setLoading(true)
    if (screenSize.dynamicWidth > 1024) {
      // setChangeCall('Desktop');
      console.log('Desktop Mode')
      axios.get('http://127.0.0.1:8000/api/BigGems_data/Desktop')
        .then(function (response) {
          // handle success
          console.log('Desktop short term data - ', response);
          setPageData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }

    if (screenSize.dynamicWidth < 1023 && screenSize.dynamicWidth > 620) {
      console.log('Tab Mode');
      // setChangeCall('Tab');
      axios.get('http://127.0.0.1:8000/api/BigGems_data/Tab')
        .then(function (response) {
          // handle success
          console.log('Tablet short term data - ', response);
          setPageData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }

    if (screenSize.dynamicWidth < 620) {
      // setChangeCall('Mobile');
      console.log('Mobile Mode')
      axios.get('http://127.0.0.1:8000/api/BigGems_data/Mobile')
        .then(function (response) {
          // handle success
          console.log('Mobile short term data - ', response);
          setPageData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false)
        })
    }

  }, [screenSize.dynamicWidth]);



  return (
    <div className='p-5 h-screen bg-gray-100'>
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

                                                <td key={item} className="tbl-cell-pt">{item}</td>
                                               
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

export default BigGems;