import React, { useState, useEffect } from "react";
import { signin, signup } from "../../services/Authservices";
import { useNavigate } from "react-router";

const AuthPage = () => {
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const isSignin = mode === "signin";

  useEffect(() => {
    setLoginDetails({ identifier: "", password: "" });
    setSignUpDetails({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  }, [mode]);

  const validateSignup = () => {
    const { username, email, password, confirmPassword } = signUpDetails;
    const newErrors = {};

    if (!username || !email || !password || !confirmPassword) {
      newErrors.general = "Please fill in all fields";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    isSignin ? await handleSignin() : await handleSignup();
    setLoading(false);
  };

  const handleSignin = async () => {
    const { identifier, password } = loginDetails;

    if (!identifier || !password) {
      setErrors({ general: "Please fill in all fields" });
      return;
    }

    try {
      const res = await signin({ identifier, password });
      if (res.success) {
        localStorage.setItem("token", res.user.jwt);
        localStorage.setItem("user", JSON.stringify(res.user.user.username));
        localStorage.setItem("email", res.user.user.email);
        navigate("/home");
      } else {
        throw new Error(res.error.error.message || "Signin failed");
      }
    } catch (error) {
      setErrors({ general: error.message || "Signin failed" });
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;

    const { username, email, password } = signUpDetails;
    try {
      const res = await signup({ username, email, password });
      if (res.success) {
        alert("Account created successfully! Please sign in.");
        setMode("signin");
      } else {
        alert(res.error.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: error.message || "Signup failed" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="flex justify-center items-center py-12">
        <div className="flex flex-col gap-8 justify-center items-center w-full px-4">
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl md:text-6xl text-[#2F2F2F] font-inter font-medium tracking-tighter">
              Join IdeaSprint
            </h1>
            <p className="text-gray-600 text-xl">
              Create your account or sign in to start building your MVP
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 w-full max-w-[840px]">
            {/* FORM SECTION */}
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
                  className={`font-medium flex-1 px-6 p-2 rounded-md ${
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
                {errors.general && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {errors.general}
                  </p>
                )}

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
                      className="border border-gray-300 rounded-md p-2 outline-none"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    {!isSignin && (
                      <div className="relative group cursor-pointer">
                        <svg
                          className="w-4 h-4 text-orange-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-orange-500 text-white text-xs rounded py-1 px-2 w-max max-w-[180px]">
                          Before signing up, Ensure You are entering valid
                          email.
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="email"
                    title="Please enter a valid email"
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
                    className="border border-gray-300 rounded-md p-2 outline-none "
                  />
                  {!isSignin && errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
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
                    className="border border-gray-300 rounded-md p-2 outline-none"
                  />
                  {!isSignin && errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password}
                    </span>
                  )}
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
                      className="border border-gray-300 rounded-md p-2 outline-none"
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </span>
                    )}
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

            {/* RIGHT SECTION */}
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
                {[
                  ["48Hrs", "Average delivery time"],
                  ["98%", "Project Accuracy rate"],
                  ["500+", "Project delivered"],
                  ["$2M+", "Funding Raised By client"],
                ].map(([value, label], i) => (
                  <div
                    key={i}
                    className="flex flex-col p-2 shadow-md rounded-md"
                  >
                    <p className="font-medium text-xl text-[#EB6505]">
                      {value}
                    </p>
                    <p className="text-sm text-[#2F2F2F]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
