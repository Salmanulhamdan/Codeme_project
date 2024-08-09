
import axios from 'axios'
import { baseUrl,register } from "../utilities/constants"
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import {  useState } from 'react';

function SignupForm(){

    const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

 

  const showErrorAlert = (error)=>{
    Swal.fire({
      title:"Error",
      text:error,
      icon:'error',
      confirmButtonText:"ok"
    })
  }

  const handleSubmit = async (e) => {
 
    e.preventDefault();

  

    // Create a new user account
    var name=fullName
    var email=emailAddress
   
     axios.post(baseUrl + register , {
      name,
      email,
      password,
    }).then((response)=>{
      console.log('response' , response);
      navigate('/');
     
    })
    .catch((e)=>{
      console.log('errr',e.response);
      showErrorAlert( e.response.data.error)
    })
  }
    return (
        <div className="bg-[#0e387a] h-screen mx-auto'">
            <h1 className='text-center text-3xl text-[#9fafca] hover:text-[#b8df10] font-extrabold pt-10 pb-10'>Sign Up Form</h1>
            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-10">
                <label htmlFor="username" className="text-white">Fullname</label>
                <input type="text" name="fullName" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)}className="border-none mb-3 rounded-md" required />
                    <label htmlFor="email" className="text-white">Email</label>
                    <input type="text"  className="border-none mb-3 rounded-md" onChange={e => setEmailAddress(e.target.value)} value={emailAddress}/>
                    <label htmlFor="password" className="text-white">Password</label>
                    <div className="relative">
                        <input type="password" className="rounded-md border-none pr-48" onChange={e => setPassword(e.target.value)} value={password}/>
                        
                    </div>
                    <button type="submit" className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white" onClick={handleSubmit}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
export default SignupForm