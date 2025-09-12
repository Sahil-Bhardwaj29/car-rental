import React from 'react'
import { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [image,setImage] = useState(null);
  const [carData,setCarData] = useState({
    brand:"",
    model:"", 
    year:0,
    pricePerDay:0,
    description:"", 
    fuel_type:"",
    category:"",
    transmission:"",
    seating_capacity:0,
    location:"",
  })

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
  }
  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availablity, and car specification."/>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img src={image ? URL.createObjectURL(image):assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
            <input type='file' id='car-image' accept='image/*' hidden onChange={e=>setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label htmlFor='brand' className='mb-1'>Brand</label>
            <input type='text' placeholder='e.g. BMW, Mercedes, Audi...' id='brand' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' value={carData.brand} onChange={e=>setCarData({...carData,brand:e.target.value})} required/>
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='model' className='mb-1'>Model</label>
            <input type='text' placeholder='e.g. X5, E-Class, M4...' id='model' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' value={carData.model} onChange={e=>setCarData({...carData,model:e.target.value})} required/>
          </div>
          
        </div>
        {/* Price, Category and Year */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label htmlFor='year' className='mb-1'>Year</label>
            <input type='number' placeholder='2025' id='year' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' value={carData.year} onChange={e=>setCarData({...carData,year:e.target.value})} required/>
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='pricePerDay' className='mb-1'>Daily Price({currency})</label>
            <input type='number' placeholder='100' id='pricePerDay' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' value={carData.pricePerDay} onChange={e=>setCarData({...carData,pricePerDay:e.target.value})} required/>
          </div>

          <div className='flex flex-col w-full'>
            <label className='mb-1'>Category</label>
            <select onChange={e=>setCarData({...carData,category:e.target.value})} value={carData.category} id='category' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' required>
              <option value="" className='hidden'>Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>
        {/* Fuel Type, Transmission and Seating Capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label className='mb-1'>Transmission</label>
            <select onChange={e=>setCarData({...carData,transmission:e.target.value})} value={carData.transmission} id='transmission' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' required>
              <option value="" className='hidden'>Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label className='mb-1'>Fuel Type</label>
            <select onChange={e=>setCarData({...carData,fuel_type:e.target.value})} value={carData.fuel_type} id='fuel_type' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' required>
              <option value="" className='hidden'>Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesal">Diesal</option>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label className='mb-1'>Seating Capacity</label>
            <input type='number' placeholder='4' id='seating' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' value={carData.seating_capacity} onChange={e=>setCarData({...carData,seating_capacity:e.target.value})} required/>
          </div>
        </div>
        {/* Car Location */}
        <div className='flex flex-col w-full'>
          <label className='mb-1'>Location</label>
          <select onChange={e=>setCarData({...carData,location:e.target.value})} value={carData.location} id='location' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition' required>
            <option value="" className='hidden'>Select location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houstan">Houstan</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
        {/* Description */}
        <div className='flex flex-col w-full'>
          <label htmlFor='description' className='mb-1'>Description</label>
          <textarea rows={4} placeholder='e.g A luxurious SUV with a spacious interior and a powerful engine.' id='description' className='border border-borderColor rounded-md mt-1 px-3 py-2 outline-none focus:border-primary transition resize-none' value={carData.description} onChange={e=>setCarData({...carData,description:e.target.value})} required/>
        </div>
        <button className='bg-primary text-white px-4 py-2 rounded-md w-max mt-4 font-medium cursor-pointer hover:bg-primaryDark transition flex items-center gap-2' type='submit'>
          <img src={assets.tick_icon} alt="" />
          List Your Car
        </button>
      </form>
    </div>
  )
}

export default AddCar