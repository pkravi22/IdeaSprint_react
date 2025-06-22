import React from "react";
import { useNavigate } from "react-router";

const AuthModal = ({ errorMessage, setIsModalOpen }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/authpage");
    setIsModalOpen(false);
  };
  return (
    <div className="w-[300px] h-[300px] bg-black z-100 rounded-2xl py-4 ">
      <div className=" p-4 justify-center items-center flex flex-col gap-6  ">
        <p className="text-xl text-orange-500 font-bold text-center ">
          {errorMessage}
        </p>
        <p className="text-md text-gray-400 text-center">
          To submit your Demo Request you have to login first
        </p>
        <button
          onClick={handleClick}
          className="px-6 py-2 cursor-pointer rounded-md bg-orange-400 text-white hover:scale-105"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
