import { useState } from 'react';
import './App.css'
import Button from './components/Button';
import Input from './components/Input';
import axios from 'axios'

function App() {
  const [isRegistration,setIsRegistration]=useState(false)
  const [inputs,setInputs]=useState({})
  const [error,setError]=useState()
  // const set
  function handleChange(e){
     setError('')
     setInputs((prev) => ({
       ...prev,
       [e.target.name]: e.target.value,
     }));

  }

  function authenticate(){
    const {email,password}=inputs;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !password){
      setError('Pleasae provide the necessary credentials!')
      return
    }
    
    if(email && password && password.length <8){
      setError('Password must be atleast 8 characters!')
      return
    }
    if (email && password && password.length <8 && !emailRegex.test(email)) {
      setError("Invalid email!");
      return
    }



  }
  console.log(inputs)
  return (
    <div className="dark:bg-black min-h-svh dark:text-white bg-white text-black flex flex-col sm:w-[633px] mx-auto p-4 justify-center gap-5">
      <div className="flex flex-col ">
        <h1 className="font-grenze font-bold text-2xl leading-8 sm:text-3xl">
          {isRegistration ? "Sign Up" : "Login"}
        </h1>
        <p className="font-eczar leading-6">Create an account!</p>
        <p className="error font-eczar h-2 text-red-500 text-sm">{error||''}</p>
      </div>

      <div className=" flex flex-col items-start gap-5 font-eczar ">
        <Input
          name="email"        
          placeholder="Email"
          onChange={handleChange}
          value={inputs.email}
          type="email"
        />
        <Input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={inputs.password}
          type="password"
        />
        <Button text="Submit" btnFunction={()=>{authenticate()}}/>
      </div>
      <hr className="text-light-cyan dark:text-[#626368]" />
      <div className=" flex items-center font-eczar gap-4">
        <p className="text-sm sm:text-base">
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <Button
          text={isRegistration ? "Login" : "Sign Up"}
          btnFunction={() => {
            setIsRegistration((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}

export default App;
