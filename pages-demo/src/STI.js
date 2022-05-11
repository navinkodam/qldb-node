import React from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';



function STI() {


    const [screnSize, setScreenSize] = React.useState('');

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

            console.log('Desktop Mode')
            axios.get('http://127.0.0.1:8000/api/shortterm/Desktop')
                .then(function (response) {
                    // handle success
                    console.log('QLDB Desktop short term data - ', response);
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

            axios.get('http://127.0.0.1:8000/api/shortterm/Tab')
                .then(function (response) {
                    // handle success
                    console.log('QLDB Tablet short term data - ', response);
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

            console.log('Mobile Mode')
            axios.get('http://127.0.0.1:8000/api/shortterm/Mobile')
                .then(function (response) {
                    // handle success
                    console.log('QLDB Mobile short term data - ', response);
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
        <div className='p-3 h-full bg-gray-100 relative'>
            <h2 className='text-center text-lg font-semibold pb-2'>SHORT TERM INVESTMENT TEST</h2>
            {pageData !== null ? (
                <div className='overflow-auto rounded-lg shadow-md'>
                    <table className='w-full' style={pageData.style}>

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

                        <tbody className="text-[12px]  lg:text-[14px] font-normal text-gray- divide-y divide-gray-100">
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
                <>
                    <ClipLoader color={'green'} loading={loading} size={100} />
                </>

            )
            }
        </div>
    )
}

export default STI;