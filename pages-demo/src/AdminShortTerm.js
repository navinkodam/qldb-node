import React, { useEffect, useState } from 'react';
import { PencilIcon, XIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';


function AdminShortTerm() {


    const [showEdit, setShowEdit] = useState(false)
    const [showCreate, setShowCreate] = useState(false)

    const [pageData, setPageData] = React.useState(null);
    let [loading, setLoading] = React.useState(null);


    React.useEffect(() => {

        // Make a request for a user with a given ID
        setLoading(true)
        console.log('Admin Mode Data')
        axios.get('http://127.0.0.1:8000/api/admin/ShortTerm_data')
            .then(function (response) {
                // handle success
                console.log('QLDB Admin short term data - ', response);
                setPageData(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            })


    }, [showCreate, showEdit]);


    const [stock, setStock] = useState('');
    const [stockCat, setStockCat] = useState('');
    const [bs, setBs] = useState('');
    const [price, setPrice] = useState('');
    const [target, setTarget] = useState('');
    const [disclosure, setDisclosure] = useState('');
    const [Id, setId] = useState('');

    useEffect(() => {
        document.title = 'Admin - Client1'
    }, [])


    const handleEdit = (item) => {
        console.log('editable data -  ', item);
        console.log('hello');
        setShowEdit(true)
        setStock(item.stock)
        setStockCat(item.stockCat)
        setBs(item.bs)
        setPrice(item.price)
        setTarget(item.target)
        setDisclosure(item.disclosure)
        setId(item.id)
    }

    const handleSave = (e) => {
        e.preventDefault();

        const updateData = {
            id: Id,
            stock: stock,
            stockCat: stockCat,
            bs: bs,
            price: price,
            target: target,
            disclosure: disclosure
        }

        console.log('Data to be updated - ', updateData);

        axios.put(`/api/admin/ShortTerm_data`, updateData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        })
            .then(function (response) {
                console.log('Short term record updated...', response);
                alert('Short term record updated...');
            })
            .catch(function (error) {
                console.log('updated record error', error);
                alert('updated record error', error);
            });



        setStock('')
        setStockCat('')
        setBs('')
        setPrice('')
        setTarget('')
        setDisclosure('')
        setId('')

        setShowEdit(false)
        // window.location.reload();
    }


    const handleCreate = async (e) => {
        e.preventDefault();

        const createData = {
            stock: stock,
            stockCat: stockCat,
            cmp: '-',
            bs: bs,
            price: price,
            target: target,
            disclosure: disclosure
        }

        console.log('Data to be created frontend - ', createData);

        axios.post(`/api/admin/ShortTerm_data`, createData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        })
            .then(function (response) {
                console.log('Short term record created...', response);
                alert('Short term record created...');
            })
            .catch(function (error) {
                console.log('created record error', error);
                alert('created record error', error);
            });


        setStock('')
        setStockCat('')
        setBs('')
        setPrice('')
        setTarget('')
        setDisclosure('')
        setId('')

        setShowCreate(false)
        // window.location.reload();
    }



    const handleDelete = (item) => {

        if (window.confirm('Are you deleting ShortTerm items?') === true) {
            console.log('deletion decision YES ');

            axios.delete(`/api/admin/ShortTerm_data/${item.id}`,  {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
    
            })
                .then(function (response) {
                    console.log('Short term record deleted...', response);
                    alert('Short term record deleted...');
                })
                .catch(function (error) {
                    console.log('deleted record error', error);
                    alert('deleted record error', error);
                });

            // window.location.reload();
        } else {
            console.log('deletion decision NO');
        }

    }



    return (
        <div className='p-3 h-screen bg-gray-100 relative'>

            <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => setShowCreate(true)}
            >

                Add Record
            </button>

            {showCreate && (
                <div className='bg-blue-300 text-white m-2 p-3'>
                    <p className='text-2xl text-black mb-2'>Create Record</p>
                    <div className='max-w-xl'>

                        <form className='grid grid-cols-2 gap-2'>
                            <input
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Stock'
                                type="text"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />

                            <input
                                type="text"
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Stock Category'
                                value={stockCat}
                                onChange={(e) => setStockCat(e.target.value)}
                            />

                            <input
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Buy/Sell'
                                type="text"
                                value={bs}
                                onChange={(e) => setBs(e.target.value)}
                            />

                            <input
                                type="text"
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Target'
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            />

                            <input
                                type="text"
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Disclosure'
                                value={disclosure}
                                onChange={(e) => setDisclosure(e.target.value)}
                            />


                        </form>
                        <button
                            className='text-white bg-purple-500 py-1.5 px-3 rounded-md cursor-pointer
                            hover:bg-purple-600 focus:ring-2 focus:outline-none'
                            onClick={handleCreate}
                            type="submit"
                            disabled={!stock && !stockCat && !bs && !price && !target && !disclosure}
                        >
                            CREATE
                        </button>

                        <button
                            className='text-white bg-red-500 py-1.5 px-3 rounded-md mt-3 ml-2'
                            onClick={e => setShowCreate(false)}
                            type="submit"
                        >
                            CANCEL
                        </button>

                    </div>
                </div>

            )}

            {/* UPDATE TABLE DETAILS */}
            {showEdit && (
                <div className='bg-yellow-400 text-white m-2 p-3 '>
                    <p className='text-2xl text-black mb-2'>Edit Record</p>
                    <div className='max-w-xl'>

                        <form className='grid grid-cols-2 gap-2'>
                            <input
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Stock'
                                type="text"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />

                            <input
                                type="text"
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Stock Category'
                                value={stockCat}
                                onChange={(e) => setStockCat(e.target.value)}
                            />

                            <input
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Buy/Sell'
                                type="text"
                                value={bs}
                                onChange={(e) => setBs(e.target.value)}
                            />

                            <input
                                type="text"
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Target'
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            />

                            <input
                                type="text"
                                className='p-1.5 rounded-md border text-black outline-0'
                                placeholder='Disclosure'
                                value={disclosure}
                                onChange={(e) => setDisclosure(e.target.value)}
                            />


                        </form>
                        <button
                            className='text-white bg-blue-500 py-1.5 px-3 rounded-md'
                            onClick={handleSave}
                            type="submit"
                        >
                            UPDATE
                        </button>

                        <button
                            className='text-white bg-red-500 py-1.5 px-3 rounded-md mt-3 ml-2'
                            onClick={e =>{
                                 setShowEdit(false)
                                 setStock('')
                                 setStockCat('')
                                 setBs('')
                                 setPrice('')
                                 setTarget('')
                                 setDisclosure('')
                                 setId('')
                                }
                                }
                            type="submit"
                        >
                            CANCEL
                        </button>


                    </div>
                </div>

            )}


            {/* TABLE CONTENT */}
            <div className='p-3 h-full bg-gray-100 relative'>
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
                                        <th style={
                                            {
                                                backgroundColor: "lightgreen",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                letterSpacing: "0.025em",
                                                lineHeight: "20px",
                                                padding: "12px",
                                                textAlign: "center",
                                                width: "10%"
                                            }
                                        }>Edit</th>
                                    </tr>
                                }

                            </thead>
                            <tbody className="text-[12px]  lg:text-[14px] font-normal text-gray- divide-y divide-gray-100">
                                {
                                    pageData.data.map((data, indexH) => (
                                        <tr key={indexH} className="hover:bg-gray-100 border-b border-gray-200 bg-white text-center py-4">

                                            {
                                                Object.keys(data).map(function (key, index) {
                                                    return (
                                                        // <td key={index} className="tbl-cell-pt">{data[key]}</td>
                                                        (key !== 'cmp' && key !== 'id') && <td key={index} className="tbl-cell-pt">{data[key]}</td>

                                                    )
                                                })
                                            }

                                            <td className="tbl-cell-pt flex justify-center">
                                                <PencilIcon
                                                    onClick={() => handleEdit(data)}
                                                    className='text-black h-7 cursor-pointer mt-2 hover:bg-gray-200 rounded-full p-2' />

                                                <TrashIcon
                                                    onClick={() => handleDelete(data)}
                                                    className='text-black h-7 cursor-pointer mt-2 hover:bg-gray-200 rounded-full p-2' />
                                            </td>


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

      
        </div>
    )
}

export default AdminShortTerm


