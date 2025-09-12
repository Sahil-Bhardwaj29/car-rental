import React from 'react'
import { useState } from 'react'
import {assets, cityList} from '../assets/assets.js'
const Hero = () => {
  const [pickupLocation, setPickupLocation] =useState('');
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-light text-center gap-14'>
      <h1 className='text-4xl font-semibold md:text-5xl'>
        Luxuray cars on Rent
      </h1>
      <form className='flex flex-col md:flex-row  items-start justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] gap-4 md:gap-6'>
        <div className='flex flex-col gap-10 md:flex-row items-start md:items-center min-md:ml-8'>
          <div className='flex flex-col gap-2 items-start'>
            <select required 
              value={pickupLocation}
              onChange={(e)=>setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city)=><option key={city} value={city}>{city}</option>)}
            </select>
            <p className='px-1 text-sm text-gray-500'>{pickupLocation?pickupLocation:'Please select the location'}</p>
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input type="date" id='pickup-date' className='text-sm text-gray-500' required min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <label htmlFor="return-date">Return Date</label>
            <input type="date" id='return-date' className='text-sm text-gray-500' required min={new Date().toISOString().split('T')[0]} />
          </div>
        </div>

        <button className='flex items-center gap-1 bg-primary text-white px-9 py-3 rounded-full hover:bg-primary-dull transition-colors duration-300 cursor-pointer'>
            <img src={assets.search_icon} alt="search" className='brightness-300' />
            Search
        </button>
      </form>

      <img src={assets.main_car} alt="car" className='max-h-74'/>
    </div>
  )
}

export default Hero