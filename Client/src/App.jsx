import './App.css'
import Button from './components/Button';
import Input from './components/Input';
function App() {
  return (
    <div className="dark:bg-black min-h-svh dark:text-white bg-white text-black flex flex-col sm:w-[633px] mx-auto p-4 justify-center gap-5">
      <div className="flex flex-col ">
        <h1 className="font-grenze font-bold text-2xl leading-8 sm:text-3xl">
          Login
        </h1>
        <p className="font-eczar leading-6">Create an account!</p>
      </div>

      <div className=" flex flex-col items-start gap-5 font-eczar ">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button text="Submit" />
      </div>
      <hr className="text-light-cyan dark:text-[#626368]" />
      <div className=" flex items-center font-eczar gap-4">
        <p className="text-sm sm:text-base">Don't have an account?</p>
        <Button text="Sign Up" />
      </div>
    </div>
  );
}

export default App;
