
import axios from 'axios'
import { baseUrl,login } from "../utilities/constants"
import { useNavigate} from 'react-router-dom';

import { useEffect, useState } from 'react';

function LoginForm(){
    

    const navigate = useNavigate()
    const handleSignupClick = () => {
        navigate('/signup');
    };
    
    useEffect(()=>{
    const isLoggedIn = localStorage.getItem('JwtToken');
    if (isLoggedIn) {
        navigate('/homepage');  // Redirect to the homepage
    }
    },[])
    const loginUser = async (credentials) => {
        try {
          const response = await axios.post(baseUrl+login, credentials);
          console.log(response.data);
          localStorage.setItem('JwtToken', response.data.access);
          localStorage.setItem('RefreshjwtToken', response.data.refresh);
          navigate('/homepage', { state: response.data  });
          
        } catch (error) {
          console.error(error);
        }
      };
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email,password,"state")
     
        const formData = {
         email,password
        };
      
        // Call your login function
        await loginUser(formData);

        

    
       
       
      };
    return (
        <div className="bg-[#0e387a] h-screen mx-auto'">
            <h1 className='text-center text-3xl text-[#9fafca] hover:text-[#b8df10] font-extrabold pt-10 pb-10'>Sign In Form</h1>
            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-10">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input type="text"  className="border-none mb-3 rounded-md" onChange={e => setEmail(e.target.value)} value={email}/>
                    <label htmlFor="password" className="text-white">Password</label>
                    <div className="relative">
                        <input type="password" className="rounded-md border-none pr-48" onChange={e => setPassword(e.target.value)} value={password}/>
                        {/* <button type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center" onClick={toggleShowPassword}> {showPassword ? <i className="fas fa-eye-slash fa-2x"></i> : <i className="fas fa-eye fa-2x"></i>} </button> */}
                    </div>
                    <button type="submit" className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white" onClick={handleSubmit}>Sign In</button>
                    <button type="submit" className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white" onClick={handleSignupClick}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
export default LoginForm