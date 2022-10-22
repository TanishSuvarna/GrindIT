import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
  return (
     isLoggedIn ? <Outlet/>: <Navigate to ="/auth"/>
  )
}

export default PrivateRoutes