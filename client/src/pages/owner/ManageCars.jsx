import React, { useEffect } from 'react'
import { useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';
import Title from '../../components/owner/Title';

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [cars,setCars] = useState([]);
  const fetchOwnerCars = async () =>{
   setCars(dummyCarData) 
  }
  useEffect(()=>{
    fetchOwnerCars();
  },[])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title='Manage Cars' subtitle='View all listed cars, update their details, or remove them from the booking platform.' />

      <div className='max-w-3xl w-full mt-6 overflow-hidden border border-borderColor rounded-md'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr className='text-left text-sm text-gray-500 border-b border-borderColor'>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car,index)=>(
              <tr key={index} className='border-t border-borderColor hover:bg-gray-50 transition'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={car.image} alt={car.model} className='h-12 w-12 object-cover aspect-square rounded-md'/>
                  <div className='max:md:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} • {car.transmission}</p>
                  </div>
                </td>
                <td className='p-3 max-md:hidden'>{car.category}</td>
                <td className='p-3 font-medium'>{currency}{car.pricePerDay}/day</td>
                <td className='p-3 max-md:hidden'>
                  {car.isAvailable ? 
                  <span className='py-3 px-2 rounded-full text-green-600 font-medium bg-green-100'>Available</span> :<span className='py-3 px-2 rounded-full text-red-600 font-medium bg-red-100'>Not Available</span>}
                </td>

                <td className='p-3 flex items-center'>
                  <img src={car.isAvailable?assets.eye_close_icon:assets.eye_icon} alt='' className='cursor-pointer' />
                  <img src={assets.delete_icon} alt='' className='cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars