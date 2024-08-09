import React from 'react';
import {  Route, Routes } from "react-router-dom";

import HomePage from '../pages/home_page';
import LoginForm from '../pages/login';
import SignupForm from '../pages/signup';
import { PrivateRoutes } from './privateroute';


export default function UserRouter(){
    
   
    return (
        <div>
     
        <Routes>
        <Route path='/'element={<LoginForm />}/>
        <Route path='/signup'element={<SignupForm />}/>
        
       


        <Route element={<PrivateRoutes />}>
        <Route path='/homepage' element={<HomePage />}/>
        </Route>
        </Routes>
        </div>
    )
}