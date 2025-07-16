import './App.css'
function App() {
  return (
    <div className="dark:bg-black min-h-svh dark:text-white bg-white text-black flex flex-col sm:w-[633px] mx-auto p-4 justify-center gap-5">
      <div className="flex flex-col ">
        <h1 className="font-grenze font-bold text-2xl leading-8">Login</h1>
        <p className="font-eczar leading-6">Create an account!</p>
      </div>

      <div className=" flex flex-col items-start gap-5 font-eczar ">
        <label htmlFor="" className="w-full ">
          <input
            type="text"
            className="border-1 rounded-lg p-3 bg-[#F8FAFC] focus:outline-none text-sm w-full border-light-cyan hover:border-dark-cyan focus:border-dark-cyan"
            placeholder="Email "
          />
        </label>
        <label
          htmlFor="
        "
          className="w-full"
        >
          <input type="text" className="border-2 w-full" />
        </label>
        <button type="" className="border-[1.5px] px-4.5 py-1.5 rounded-lg text-sm font-[500] border-light-cyan cursor-pointer hover:translate-0.5 transition-all  
      
        hover:border-[]
        custom-shadow
        ">
         <span className="bg-red-400"></span> Submit
          </button>
      </div>
      <div className="bg-blue-50 flex">
        <p>Don't have an account?</p>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default App;
