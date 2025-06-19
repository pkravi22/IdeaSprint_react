import React, { useState } from "react";

const AuthPage = () => {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const isSignin = mode === "signin";

  return (
    <div className="min-h-screen bg-white">
      {/* Header (optional) */}
      {/* <Header /> */}

      <main className="flex justify-center items-center py-12">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="text-center flex flex-col gap-2 px-2">
            <h1 className=" text-3xl md:text-6xl text-[#2F2F2F] font-inter font-medium tracking-tighter">
              Join IdeaSprint
            </h1>
            <p className="text-gray-600 text-xl">
              Create your account or sign in to start building your MVP
            </p>
          </div>

          <div className="flex flex-col-reverse md:flex-row  gap-12  w-screen md:w-[840px]">
            {/* Auth Form Section */}
            <div className="flex-1 p-4">
              <header className="flex justify-around shadow-md rounded-md px-2 py-2 gap-4">
                <button
                  onClick={() => setMode("signin")}
                  className={`font-medium flex-1 px-6 p-2 rounded-md ${
                    isSignin ? "bg-orange-300" : ""
                  }`}
                >
                  Signin
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`font-medium  flex-1 px-6 p-2 rounded-md ${
                    !isSignin ? "bg-orange-300" : ""
                  }`}
                >
                  Signup
                </button>
              </header>

              <form className="flex flex-col py-8 shadow-md rounded-md px-4">
                {!isSignin && (
                  <>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="fullname" className="font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="border border-gray-300 rounded-md text-[#B6B8C0] p-2"
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    className="border border-gray-300 rounded-md text-[#B6B8C0] p-2"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    className="border border-gray-300 rounded-md text-[#B6B8C0] p-2"
                  />
                </div>

                {!isSignin && (
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="confirmPassword" className="font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="******"
                      className="border border-gray-300 rounded-md text-[#B6B8C0] p-2"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-orange-500 font-medium mx-auto mt-6 w-[96%] flex justify-center text-white px-8 py-2 rounded-3xl"
                >
                  {isSignin ? "Signin" : "Create Account"}
                </button>
              </form>
            </div>

            <div className="flex-1 flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl text-[#2F2F2F] font-inter font-medium tracking-tight">
                  Turn Your Ideas Into Reality
                </h1>
                <p className="text-gray-400 text-md">
                  Get professional clickable demos and MVPs built for your
                  startup. From concept to prototype in days, not months.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">48Hrs</p>
                  <p className="text-sm text-[#2F2F2F]">
                    Average delivery time
                  </p>
                </div>
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">98%</p>
                  <p className="text-sm text-[#2F2F2F]">
                    Project Accuracy rate
                  </p>
                </div>
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">500+</p>
                  <p className="text-sm text-[#2F2F2F]">Project delivered</p>
                </div>
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">$2M+</p>
                  <p className="text-sm text-[#2F2F2F]">
                    Funding Raised By client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
