import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div className="font-eczar text-center pt-10 sm:text-lg flex flex-col justify-center items-center">
      <h1 className=" text-violet-600 dark:text-violet-300">Page Not Found</h1>
      <Link to={navigate(-1)}>
        <p className="text-sm text-center underline underline-offset-4 text-violet-400 ">Go back</p>
      </Link>
    </div>
  );
}

export default NotFound