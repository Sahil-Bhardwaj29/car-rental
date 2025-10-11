import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider = ({children})=>{
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || "$"

  const [token,setToken] = useState(null)
  const [user,setUser] = useState(null)
  const [isOwner,setIsOwner] = useState(false)
  const [showLogin,setShowLogin] = useState(false)
  const [pickupDate,setPickupDate] = useState('')
  const [returnDate,setReturnDate] = useState('')

  const [cars,setCars] = useState([])

  // Function to check user is logged in or not
  const fetchUser = async ()=>{
    try{
      const {data} = await axios.get('/api/user/data')
      if(data?.success){
        setUser(data.user)
        setIsOwner(data.user.role === 'owner')
      }else{
        logout()
        navigate('/')
      }
    }catch(error){
      logout()
      toast.error(error.message)
    }
  }

  // function to fetch all cars
  const fetchCars = async()=>{
    try{
      const {data} = await axios.get('/api/user/cars')
      data.success? setCars(data.cars): toast.error(data.message)
    }catch(error){
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // function to logout user

  const logout = ()=>{
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsOwner(false)
    axios.defaults.headers.common['Authorization']=''
    toast.success('You have been logged out')
  }

  //useEffect to retrieve token from localStorage
  useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token)
    fetchCars()
  },[])

  // useEffect to fetch userdata when token is available
  useEffect(()=>{
    if(token){
      axios.defaults.headers.common['Authorization']=`${token}`
      fetchUser()
    }
  },[token])

  const value = {
    currency,
    navigate,
    token,
    setToken,
    user,
    setUser,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    cars,
    setCars,
    fetchCars,
    fetchUser,
    axios,
    logout
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
  return useContext(AppContext)
}