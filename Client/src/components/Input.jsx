import React from 'react'

const Input = ({placeholder,onChange,value,type,name,btnFunction}) => {
  
  return (
   
    <label htmlFor="" className="w-full ">
      <input
        type={type}
        
        className="border-1 rounded-lg p-3 bg-[#F8FAFC] focus:outline-none text-sm w-full border-light-cyan 
        dark:border-light-dark-blue
        hover:border-dark-cyan focus:border-dark-cyan
        dark:hover:border-[#4649AF]
        dark:focus:border-[#4649AF]
        dark:bg-dark-blue"

        required
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e)=>{onChange(e)}}
        onKeyDown={(e)=>{
          if(e.key=='Enter'){
            btnFunction();
          }
        }}
      />
    </label>
  );
}

export default Input