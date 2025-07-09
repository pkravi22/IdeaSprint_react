import React, { useState, useEffect } from "react";
import { signin, signup } from "../../services/Authservices";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";
const AuthPage = () => {
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signUpDetails, setSignUpDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    identifier: "",
    password: "",
  });
  // ------------------------
  //
  //encrypt the payload before sending it to the server
  // const encryptPayload = (payload, secretKey) => {
  //   const ciphertext = CryptoJS.AES.encrypt(
  //     JSON.stringify(payload),
  //     secretKey
  //   ).toString();
  //   return ciphertext;
  // };
  //const secretKey = "your-256-bit-secret";

  // ----------------------------------

  const isSignin = mode === "signin";

  // Reset forms when switching modes
  useEffect(() => {
    setLoginDetails({ identifier: "", password: "" });
    setSignUpDetails({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    isSignin ? await handleSignin() : await handleSignup();
    setLoading(false);
  };

  const handleSignin = async () => {
    const { identifier, password } = loginDetails;
    if (!identifier || !password) {
      alert("Please fill in all fields");
      return;
    }
    //const payload = { ...loginDetails };
    //const encryptedPayload = encryptPayload(payload, secretKey);

    try {
      const res = await signin({ identifier, password });
      console.log(res);
      console.log(res.error?.error.message);
      if (res.success) {
        localStorage.setItem("token", res.user.jwt);
        localStorage.setItem("user", JSON.stringify(res.user.user.username));
        localStorage.setItem("email", res.user.user.email);

        navigate("/home");
      } else {
        throw new Error(res.error.error.message || "Signin failed");
      }
    } catch (error) {
      alert(error.message || "Signin failed");
    }
  };

  const handleSignup = async () => {
    const { username, email, password, confirmPassword } = signUpDetails;
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await signup({ username, email, password });

      if (res.success) {
        // localStorage.setItem("token", res.user.jwt);
        navigate("/authpage");
      }
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
          <div className="flex flex-col md:flex-row gap-12 w-screen md:w-[840px]">
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

              <form
                onSubmit={handleSubmit}
                className="flex flex-col py-8 shadow-md rounded-md px-4"
              >
                {!isSignin && (
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="fullname" className="font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={signUpDetails.username}
                      onChange={(e) =>
                        setSignUpDetails({
                          ...signUpDetails,
                          username: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={
                      isSignin ? loginDetails.identifier : signUpDetails.email
                    }
                    onChange={(e) =>
                      isSignin
                        ? setLoginDetails({
                            ...loginDetails,
                            identifier: e.target.value,
                          })
                        : setSignUpDetails({
                            ...signUpDetails,
                            email: e.target.value,
                          })
                    }
                    placeholder="john@gmail.com"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    value={
                      isSignin ? loginDetails.password : signUpDetails.password
                    }
                    onChange={(e) =>
                      isSignin
                        ? setLoginDetails({
                            ...loginDetails,
                            password: e.target.value,
                          })
                        : setSignUpDetails({
                            ...signUpDetails,
                            password: e.target.value,
                          })
                    }
                    placeholder="******"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>

                {!isSignin && (
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="confirmPassword" className="font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={signUpDetails.confirmPassword}
                      onChange={(e) =>
                        setSignUpDetails({
                          ...signUpDetails,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="******"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "bg-orange-300" : "bg-orange-500"
                  } font-medium mx-auto mt-6 w-[96%] flex justify-center text-white px-8 py-2 rounded-3xl`}
                >
                  {loading
                    ? "Processing..."
                    : isSignin
                    ? "Signin"
                    : "Create Account"}
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
