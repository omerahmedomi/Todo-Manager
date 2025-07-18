import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [isRegistration, setIsRegistration] = useState(false);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todos");
    } else {
      setIsCheckingAuth(false); // Only allow render if no token
    }
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg dark:text-white font-eczar">
        Loading...
      </div>
    );
  }

  const apiBase = "http://localhost:2000";

  // const set
  function handleChange(e) {
    setError("");
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function authenticate() {
    const { email, password } = inputs;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setError("Pleasae provide the necessary credentials!");
      return;
    }

    if (email && emailRegex.test(email) && password && password.length < 8) {
      setError("Password must be atleast 8 characters!");
      return;
    }
    if (email && password && !emailRegex.test(email)) {
      setError("Invalid email!");
      return;
    }

    try {
      //  navigate('/todos')
      setIsAuthenticating(true);
      setError("");

      let data;
      if (isRegistration) {
        const response = await axios.post(apiBase + "/auth/register", {
          username: email,
          password: password,
        });

        data = response.data;
        console.log("incoming responser", data);
      } else {
        const response = await axios.post(apiBase + "/auth/login", {
          username: email,
          password: password,
        });
        data = response.data;
        console.log("incoming responser", data);
      }

      // if (data.token) {
      //   token = data.token;
      //   localStorage.setItem("token", token);

      //   // authenicating into loading
      //   // authBtn.innerText = "Loading...";

      //   // // fetch todos
      //   // await fetchTodos();

      //   // // show dashboard
      //   // showDashboard();
      //   navigate('/todos')
      // } else {
      //   throw Error("❌ Failed to authenticate...");
      // }
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/todos");
      } else {
        throw new Error("❌ Failed to authenticate...");
      }

      navigate("/todos");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }
  console.log(inputs);
  return (
    <div className="dark:bg-black min-h-svh dark:text-white bg-white text-black flex flex-col sm:w-[633px] mx-auto p-4 justify-center gap-5">
      <div className="flex flex-col ">
        <h1 className="font-grenze font-bold text-2xl leading-8 sm:text-3xl">
          {isRegistration ? "Sign Up" : "Login"}
        </h1>
        <p className="font-eczar leading-6">Create an account!</p>
        <p className="error font-eczar h-2 text-red-500 text-sm">
          {error || ""}
        </p>
      </div>

      <div className=" flex flex-col items-start gap-5 font-eczar ">
        <Input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={inputs.email}
          type="email"
          btnFunction={authenticate}
        />
        <Input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={inputs.password}
          type="password"
          btnFunction={authenticate}
        />
        <Button
          text={isAuthenticating ? "Authenticating" : "Submit"}
          btnFunction={() => {
            authenticate();
          }}
        />
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
