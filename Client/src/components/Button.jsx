import React from "react";

const Button = ({ text, btnFunction }) => {
  return (
    <button
    
      className="border-[1.5px] px-4.5 py-1.5 rounded-lg text-sm sm:text-base font-[500] border-light-cyan 
      dark:border-[#323C71]
      cursor-pointer hover:translate-0.5 transition-all  
        duration-200
        custom-shadow
        shadow-[2px_2px_0px_0px_#BED1E7]
        dark:shadow-[2px_2px_0px_0px_#323C71]
        hover:shadow-[0]
        "
      onClick={btnFunction}
    >
      {text}
      
    </button>
  );
};

export default Button;
